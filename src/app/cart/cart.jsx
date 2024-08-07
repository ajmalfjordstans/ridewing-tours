'use client'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, setCart } from '@/components/store/cartSlice';
import PackageCard from '@/components/cards/cart/package-card';
import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import Link from 'next/link';
import { db, updateFirebaseDocument } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { setUser } from '@/components/store/userSlice';

const CheckoutMenu = ({ items }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  // console.log("Cart items", items);
  const subtotal = items.reduce((acc, item) => {
    const noOfPassengers = Number(item.noOfPassengers); // Ensure noOfPassengers is a number
    const price = Number(item.price); // Ensure price is a number
    if (item?.type === 'package') {
      const itemPrice = noOfPassengers < 4 ? price * 4 : price * noOfPassengers;
      return acc + itemPrice;
    } else if (item?.type === 'guide') {
      return acc + price;
    } else if (item.transfer === 'airport' || item.transfer === 'station') {
      const itemPrice = price * noOfPassengers;
      return acc + itemPrice;
    } else {
      return acc
    }
  }, 0)

  const calculateAdditionalTicketsTotal = (items) => {
    return items.reduce((total, item) => {
      if (item.additionalTickets && item.additionalTickets.length > 0) {
        const ticketsTotal = item.additionalTickets.reduce((ticketTotal, ticket) => {
          return ticketTotal + (ticket.price * item.noOfPassengers);
        }, 0);
        return total + ticketsTotal;
      }
      return total;
    }, 0);
  }

  const handleFirebaseUserUpdate = async () => {
    const data = {
      ...user.userInfo,
      booking: [
        ...(user.userInfo?.booking || []),
        ...items
      ]
    }
    try {
      console.log(data);
      updateFirebaseDocument(data, `users/${user.userInfo.uid}`)
    } catch (err) {
      console.error("Error setting document: ", err);
    }
  }

  const additionalTicketsTotal = calculateAdditionalTicketsTotal(items);
  return (
    <div className='sticky top-[100px] w-full max-w-[423px] bg-[#F8F8F8] h-full '>
      <div className='w-full p-[30px]'>
        <p className='text-[24px] font-semibold'>Summary</p>
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
          <div className='w-full flex justify-between'>
            <p>Total</p>
            <p>{(subtotal + additionalTicketsTotal).toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center'>
        {/* <Button className='bg-secondary text-white mx-auto'
          onClick={handleFirebaseUserUpdate}
        >
          Log
        </Button> */}
        <Button className='bg-secondary text-white mx-auto'
          onClick={() => {
            handleFirebaseUserUpdate()
            dispatch(setCart([]))
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
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  // console.log(items);
  return (
    <div className='pb-[100px]'>
      <div className=' w-full flex flex-col container mx-auto px-[5%] lg:px-0 '>
        <p className='font-bold text-[26px] md:text-[32px] leading-[42px]'>My Cart</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <p className='text-center mt-[30px]'>Cart Development is not completed</p>
      <div className='flex pl-[5%] gap-[30px]'>
        <div className='lg:w-[70%] w-full mt-[20px]'>
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {items.map((item, id) => (
                <li key={id} className='flex items-center gap-5'>
                  <PackageCard data={item} setSubtotal={setSubtotal} subtotal={subtotal} />
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
        <div className='h-screen w-[30%]'>
          <CheckoutMenu items={items} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
