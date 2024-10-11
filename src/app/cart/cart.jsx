'use client'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, setCart } from '@/components/store/cartSlice';
import PackageCard from '@/components/cards/cart/package-card';
import { Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { readFirebaseDocument, updateFirebaseDocument } from '../firebase';
import { sub } from 'date-fns';
import { generateInvoice, generateInvoiceObj } from '@/components/services/invoice-generator';
import { generatePayload, sendMail } from '@/components/services/send-mail';
import { transformDataForStripe } from '@/components/services/stripe-items-formatter';

const CheckoutMenu = ({ items, discountPrice, setDiscountPrice }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user)
  const [couponCode, setCouponCode] = useState("")
  const [availableCoupons, setAvailableCoupons] = useState(null)
  const [discount, setDiscount] = useState(null)
  // const [discountPrice, setDiscountPrice] = useState(null)
  const [discountOffer, setDiscountOffer] = useState(null)
  const [cartItems, setCartItems] = useState(items)
  const [total, setTotal] = useState(0)
  const [couponNotFound, setCouponNotFound] = useState(false)
  const dispatch = useDispatch()
  // console.log("Cart items", items);
  const subtotal = items.reduce((acc, item) => {
    const noOfPassengers = Number(item.noOfPassengers); // Ensure noOfPassengers is a number
    const price = Number(item.price); // Ensure price is a number
    const bulkPrice = Number(item.bulkPrice); // Ensure price is a number
    if (item?.type === 'package') {
      const itemPrice = noOfPassengers < 5 ? price * 4 : bulkPrice ? bulkPrice * noOfPassengers : price * noOfPassengers;
      return acc + itemPrice;
    } else if (item?.type === 'guide') {
      return acc + (price * item?.travelDetails?.hours);
    } else if (item.transfer === 'airport' || item.transfer === 'station') {
      const itemPrice = noOfPassengers < 4 ? price * 4 : price * noOfPassengers;
      return acc + itemPrice;
    } else {
      return acc
    }
  }, 0)

  const calculateAdditionalTicketsTotal = (items) => {
    return items.reduce((total, item) => {
      if (item.additionalTickets && item.additionalTickets.length > 0) {
        const ticketsTotal = item.additionalTickets.reduce((ticketTotal, ticket) => {
          return ticketTotal + (ticket.price * ticket.ticketCount);
        }, 0);
        return total + ticketsTotal;
      }
      return total;
    }, 0);
  }

  const handleFirebaseUserCartUpdate = async (bookings = cartItems) => {
    let booking = Array.isArray(bookings) ? bookings : bookings.items
    console.log(booking);

    if (user?.userInfo?.uid) {
      const data = {
        ...user.userInfo,
        waitingPayment: {
          booking: [
            // ...(user.userInfo?.booking || []),
            ...booking,
          ],
          coupons: {
            appliedCoupon: couponCode,
          }
        }
      }
      try {
        // console.log(data);
        updateFirebaseDocument(data, `users/${user.userInfo.uid}`)
      } catch (err) {
        console.error("Error setting document: ", err);
      }
    }
  }

  const checkAgentCoupon = () => {
    const result = user?.userInfo?.coupons?.find(coupon => coupon.code === couponCode);

    const discountedItems = items.map((item) => {
      let discountedTotal = item.total;
      let discountedPrice = item?.price;

      // Check if the discount is a percentage
      if (result.isPercentage) {
        // Calculate the discounted total for the item
        discountedTotal = item.total - (item.total * (result.discountValue / 100));
        discountedPrice = item.price - (item.price * (result.discountValue / 100));
        setDiscountOffer(result.discountValue + "% OFF");
      } else {
        // Apply a fixed discount to the item
        discountedTotal = item.total - result.discountValue;
        discountedPrice = item.price - result.discountValue;
        setDiscountOffer(result.discountValue + " OFF");
      }

      // Apply discount to additionalTickets, if they exist
      const discountedAdditionalTickets = item.additionalTickets?.map((ticket) => {
        let discountedTicketPrice = ticket.price;

        if (result.isPercentage) {
          // Apply percentage discount to the ticket
          discountedTicketPrice = ticket.price - (ticket.price * (result.discountValue / 100));
        } else {
          // Apply fixed discount to the ticket
          discountedTicketPrice = ticket.price - result.discountValue;
        }

        return {
          ...ticket,
          price: discountedTicketPrice // Ensure the ticket price is updated
        };
      }) || item.additionalTickets; // Use original array if no tickets present

      // Return a new object with updated item and additionalTickets
      return {
        ...item, // Keep other properties of the item unchanged
        total: Math.max(0, discountedTotal),  // Ensure total doesn't go below 0
        price: Math.max(0, discountedPrice),  // Ensure price doesn't go below 0
        additionalTickets: discountedAdditionalTickets // Updated additionalTickets
      };
    });

    // Set cart items with updated discounts
    setCartItems(discountedItems)

    if (result) {
      setCouponNotFound(false)
      setDiscount(result);
      const total = subtotal + additionalTicketsTotal;

      if (total) {
        let discountAmount = 0;

        if (result.isPercentage) {
          discountAmount = total * (result.discountValue / 100);
        } else {
          discountAmount = result.discountValue;
        }

        setDiscountPrice(total - discountAmount);
        // console.log(total - discountAmount);
      }
    } else {
      // console.log('Coupon not found');
      setDiscount(null)
      setDiscountPrice(null)
      setCouponNotFound(true)
    }
  }

  const checkCouponCode = () => {
    if (user?.userInfo?.userRole === 'agent') {
      checkAgentCoupon()
    } else {
      const result = availableCoupons?.find(coupon => coupon.code === couponCode)

      const discountedItems = items.map((item) => {
        console.log(item.total);

        let discountedTotal = item.total;
        let discountedPrice = item?.price;

        // Check if the discount is a percentage
        if (result.isPercentage) {
          // Calculate the discounted total for the item
          discountedTotal = item.total - (item.total * (result.discountValue / 100));
          discountedPrice = item.price - (item.price * (result.discountValue / 100));
          setDiscountOffer(result.discountValue + "% OFF");
        } else {
          // Apply a fixed discount to the item
          discountedTotal = item.total - result.discountValue;
          discountedPrice = item.price - result.discountValue;
          setDiscountOffer(result.discountValue + " OFF");
        }

        // Apply discount to additionalTickets, if they exist
        const discountedAdditionalTickets = item.additionalTickets?.map((ticket) => {
          let discountedTicketPrice = ticket.price;

          if (result.isPercentage) {
            // Apply percentage discount to the ticket
            discountedTicketPrice = ticket.price - (ticket.price * (result.discountValue / 100));
          } else {
            // Apply fixed discount to the ticket
            discountedTicketPrice = ticket.price - result.discountValue;
          }

          return {
            ...ticket,
            price: discountedTicketPrice // Ensure the ticket price is updated
          };
        }) || item.additionalTickets; // Use original array if no tickets present
        console.log(discountedTotal);

        // Return a new object with updated item and additionalTickets
        return {
          ...item, // Keep other properties of the item unchanged
          total: Math.max(0, discountedTotal),  // Ensure total doesn't go below 0
          price: Math.max(0, discountedPrice),  // Ensure price doesn't go below 0
          additionalTickets: discountedAdditionalTickets // Updated additionalTickets
        };
      });

      // Set cart items with updated discounts
      setCartItems(discountedItems)
      console.log(discountedItems);


      if (result) {
        setCouponNotFound(false)
        setDiscount(result);
        const total = subtotal + additionalTicketsTotal;

        if (total) {
          let discountAmount = 0;

          if (result.isPercentage) {
            discountAmount = total * (result.discountValue / 100);
          } else {
            discountAmount = result.discountValue;
          }

          setDiscountPrice(total - discountAmount);
          // console.log(total - discountAmount);
        }
      } else {
        // console.log('Coupon not found');
        setCouponNotFound(true)
        setDiscount(null)
        setDiscountPrice(null)
      }
    }

  };

  const additionalTicketsTotal = calculateAdditionalTicketsTotal(items);

  const handleCheckout = async () => {
    // console.log(user.userInfo);
    
    if (user.userInfo.userRole == 'agent' && user.userInfo.active == false) {
      alert('Your account is inactive')
      return
    }
    if(cartItems.length == 0){
      alert('Cart is empty')
      return
    }
    let item = transformDataForStripe(cartItems)

    setLoading(true);

    await handleFirebaseUserCartUpdate(cartItems)
    console.log(cartItems);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item, currency: user.currency.code }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error('Checkout session creation failed:', data.error);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    handleFirebaseUserCartUpdate()
    console.log('update func called');
  }, [])

  useEffect(() => {
    setCartItems(items)
  }, [items])

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const result = await readFirebaseDocument('coupons/coupon');
        setAvailableCoupons(result.coupons);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div className='sticky top-[100px] w-full max-w-[423px] bg-[#F8F8F8] h-full pb-[10px]'>
      <div className='w-full p-[30px]'>
        <p className='text-[24px] font-semibold'>Summary</p>
        {/* <Button onClick={() => console.log(cartItems)}>Show Items</Button> */}
        <div className='w-full mt-[20px] flex flex-col gap-4'>
          <div className='w-full flex justify-between text-[#ABABAB]'>
            <p>Subtotal</p>
            <p>{subtotal?.toLocaleString()}</p>
          </div>
          <div className='w-full flex justify-between text-[#ABABAB]'>
            <p>Additional Tickets</p>
            <p>{additionalTicketsTotal.toLocaleString()}</p>
          </div>
          <div className='h-[1px] w-full bg-black'></div>
          <div className='flex gap-2'>
            <input type="text" value={couponCode} className='p-[10px] rounded-[5px]' placeholder='Enter Coupon Code' onChange={(e) => setCouponCode(e.target.value)} />
            <Button className='bg-secondary text-white mx-auto'
              onClick={() => {
                checkCouponCode()
              }}
            >
              Apply Code
            </Button>
          </div>
          {couponNotFound && <p className='text-red-500 text-[12px]'>Coupon Not Found</p>}
          <div className='w-full flex justify-between'>
            <p>Total</p>
            <div className='flex flex-col items-end'>
              <p>{discountPrice}</p>
              <div className='flex gap-2'>
                <p>{discountPrice && discountOffer}</p>
                <p className={`${discountPrice && 'line-through text-gray-600'}`}>{(subtotal + additionalTicketsTotal).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center'>
        {/* <Button className='bg-secondary text-white mx-auto'
          onClick={handleFirebaseUserCartUpdate}
        >
          Log
        </Button> */}
        <Button className='bg-secondary text-white mx-auto'
          onClick={() => {
            handleCheckout()
          }}
        >
          {/* <Link href={{ pathname: '/cart/checkout', query: { country: user.selectedCountry } }}> */}
          Checkout
          {/* </Link> */}
        </Button>
      </div>
    </div >
  )
}

const Cart = () => {
  const [subtotal, setSubtotal] = useState(0)
  const [discountPrice, setDiscountPrice] = useState(null)
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  // console.log(items);
  return (
    <div className=''>
      <div className=' w-full flex flex-col container mx-auto px-[5%] lg:px-0 '>
        <p className='font-bold text-[26px] md:text-[32px] leading-[42px]'>My Cart</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row px-[2%] md:pl-[5%] gap-[30px]'>
        <div className='lg:w-[70%] w-full mt-[20px] '>
          {items.length === 0 ? (
            <p className='text-center mt-10'>Your cart is empty</p>
          ) : (
            <ul>
              {items.map((item, id) => (
                <li key={id} className='flex items-start mt-[40px]'>
                  <PackageCard data={item} setSubtotal={setSubtotal} subtotal={subtotal} setDiscountPrice={setDiscountPrice} />
                  <button onClick={() => dispatch(removeItem(item.id))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='md:h-screen w-full md:w-[30%]'>
          <CheckoutMenu items={items} discountPrice={discountPrice} setDiscountPrice={setDiscountPrice} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
