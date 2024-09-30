import CouponGenerator from '@/components/services/coupon-generator'
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db, readFirebaseCollection, readFirebaseDocument } from '../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditCoupons({ setShowSection }) {
  const [coupons, setCoupons] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputOffer, setOfferValue] = useState({
    active: null,
    offerName: '',
    code: '',
    type: 'offer'
  });
  const [loading, setLoading] = useState(true);

  // Function to parse the coupon code
  const parseCoupon = (code) => {
    const discountValue = parseInt(code.match(/\d+$/)[0], 10); // Extract the number at the end
    const discountType = code.charAt(code.search(/\d/) - 1); // Get the character before the numbers
    const isPercentage = discountType.toUpperCase() === 'P';

    return {
      code,
      discountValue,
      isPercentage: isPercentage,
    };
  };

  // Function to add a coupon to the state
  const addCoupon = (code) => {
    let offerCoupon = coupons.find((coupon) => coupon.code === code)
    if (offerCoupon) {
      toast("Coupon already exist")
    } else {
      const newCoupon = parseCoupon(code);
      setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
      setInputValue('');
    }
  };

  // Function to add a coupon to the state
  const addOffer = (data) => {
    const newCoupon = parseCoupon(data.code);
    let offer = { ...newCoupon, offerName: data.offerName, active: data.active, type: 'offer' };

    setCoupons((prevCoupons) => {
      // Check if there's already an object with type 'offer'
      const offerExists = prevCoupons.some(coupon => coupon.type === 'offer');

      // If the offer exists, replace it; if not, add the new one
      if (offerExists) {
        return prevCoupons.map(coupon =>
          coupon.type === 'offer' ? offer : coupon // Replace if type is 'offer'
        );
      } else {
        return [...prevCoupons, offer]; // Add new offer if it doesn't exist
      }
    });

    if (!loading) {
      updateAgent(coupons);
    }
  };

  const toggleOffer = () => {
    let offerCoupon = coupons.find((coupon) => coupon.type === 'offer')
    console.log(offerCoupon);

    if (offerCoupon?.active) {
      // removeCoupon(offerCoupon.code)
      offerCoupon = { ...offerCoupon, code: '', active: false }
    } else {
      offerCoupon = { ...offerCoupon, type: 'offer', active: true }
    }
    setOfferValue(offerCoupon);

    setCoupons((prevCoupons) => {
      // Check if there's already an object with type 'offer'
      const offerExists = prevCoupons.some(coupon => coupon.type === 'offer');

      // If the offer exists, replace it; if not, add the new one
      if (offerExists) {
        return prevCoupons.map(coupon =>
          coupon.type === 'offer' ? offerCoupon : coupon// Replace if type is 'offer'
        );
      } else {
        return [...prevCoupons, offerCoupon]; // Add new offer if it doesn't exist
      }
    });
    if (!loading) {
      updateAgent(coupons);
    }
  }

  // Function to remove a coupon from the state
  const removeCoupon = (code) => {
    console.log(code);
    setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.code !== code));
  };

  // Function to handle pasting from the clipboard
  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText(); // Read text from clipboard
      setInputValue(text); // Set the text into the input field
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };
  // Function to handle pasting from the clipboard
  const handlePasteOfferFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText(); // Read text from clipboard
      setOfferValue({ ...inputOffer, code: text }); // Set the text into the input field
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const updateAgent = async (coupons) => {
    const coupon = {
      coupons: coupons,
    };
    await setDoc(doc(db, 'coupons', 'coupon'), coupon);
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const result = await readFirebaseDocument('coupons/coupon');
        setCoupons(result.coupons);
        const extractedOffers = result?.coupons.find(coupon => (
          coupon.type == 'offer'
        ));
        const offerObject = extractedOffers[0] || extractedOffers; // Set it to an empty object if no items exist
        
        setOfferValue({
          active: offerObject.active,
          offerName: offerObject.offerName,
          code: offerObject.code,
          type: offerObject.type
        })
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coupons:', error);
        setLoading(false); // Ensure loading state is false even if there's an error
      }
    };

    fetchCoupons();
  }, []);

  useEffect(() => {
    if (!inputValue.active) {
      // removeCoupon(inputValue.coupon)
      if (!loading) {
        updateAgent(coupons);
      }
    }
  }, [inputOffer])

  // Only update the Firestore document if not loading (initial fetch) and coupons change
  useEffect(() => {
    if (!loading) {
      updateAgent(coupons);
    }
  }, [coupons, loading]);

  return (
    <div className='pb-[150px] mt-[100px] flex h-full'>
      <div className='container mx-auto px-[5%] lg:px-0 pt-[20px]'>
        <div onClick={() => setShowSection('home')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6 hover:cursor-pointer'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3' />
          </svg>
        </div>
        <p className='font-[700] text-[28px] mt-[25px]'>Offer Banner</p>
        <div>
          <div className='flex flex-col items-center gap-1'>
            <button
              onClick={() => toggleOffer()} // setOfferValue({ ...inputOffer, active: !inputOffer.active })
              className={`ml-4 p-2 rounded ${inputOffer.active ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
            >
              {inputOffer.active ? 'Deactivate Offer' : 'Activate Offer'}
            </button>
            <input
              type='text'
              value={inputOffer.offerName}
              onChange={(e) => setOfferValue({ ...inputOffer, offerName: e.target.value })}
              className='p-2 border border-gray-300 rounded'
              placeholder='Offer Name'
              disabled={!inputOffer.active}
            />
            <input
              type='text'
              value={inputOffer.code}
              onChange={(e) => setOfferValue({ ...inputOffer, code: e.target.value })}
              className='p-2 border border-gray-300 rounded'
              placeholder='Coupon Code'
              disabled={!inputOffer.active}
            />
            <p className='mt-2 text-red-500 text-[10px] text-center'>
              Coupon code should end with
              <br /> a number following alphabet V or P{' '}
            </p>
            <div className='flex gap-2'>
              <button onClick={handlePasteOfferFromClipboard} className='mt-4 p-2 bg-blue-500 text-white rounded'>
                Paste
              </button>
              <button onClick={() => addOffer(inputOffer)} className='mt-4 p-2 bg-green-500 text-white rounded'>
                Add Offer
              </button>
            </div>
          </div>
        </div>
        <p className='font-[700] text-[28px] mt-[25px]'>Manage Coupons</p>
        <div className='w-full flex justify-between'>
          <div>
            <div className='flex flex-col items-center'>
              <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className='p-2 border border-gray-300 rounded'
                placeholder='Coupon Code'
              />
              <p className='mt-2 text-red-500 text-[10px] text-center'>
                Coupon code should end with
                <br /> a number following alphabet V or P{' '}
              </p>
              <div className='flex gap-2'>
                <button onClick={handlePasteFromClipboard} className='mt-4 p-2 bg-blue-500 text-white rounded'>
                  Paste
                </button>
                <button onClick={() => addCoupon(inputValue)} className='mt-4 p-2 bg-green-500 text-white rounded'>
                  Add Coupon
                </button>
              </div>
            </div>

            {/* Table */}
            <table className='table-auto w-full text-left mt-5'>
              <thead>
                <tr>
                  <th className='px-4 py-2'>Code</th>
                  <th className='px-4 py-2'>Discount Type</th>
                  <th className='px-4 py-2'>Discount Value</th>
                  <th className='px-4 py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(coupons) &&
                  coupons
                    .filter(coupon => coupon.code) // Filter coupons with non-empty code
                    .map((coupon, index) => (
                      <tr key={index} className={`border-t border-gray-200`}>
                        <td className='px-4 py-2'>{coupon.code}</td>
                        <td className='px-4 py-2'>{coupon.isPercentage ? 'Percentage' : 'Cash'}</td>
                        <td className='px-4 py-2'>{coupon.discountValue}</td>
                        <td className='px-4 py-2'>
                          <button
                            onClick={() => removeCoupon(coupon.code)}
                            className='text-red-600 hover:text-red-800'
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <CouponGenerator />
        </div>
      </div>
    </div>
  );
}
