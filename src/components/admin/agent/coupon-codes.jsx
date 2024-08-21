'use client'
import { db } from '@/app/firebase';
import CouponGenerator from '@/components/services/coupon-generator';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function CouponAssignment({ agent }) {
  const [coupons, setCoupons] = useState(agent?.coupons);
  const [inputValue, setInputValue] = useState('');

  // Function to parse the coupon code
  const parseCoupon = (code) => {
    const discountValue = parseInt(code.match(/\d+$/)[0], 10); // Extract the number at the end
    const discountType = code.charAt(code.search(/\d/) - 1); // Get the character before the numbers
    const isPercentage = discountType.toUpperCase() === 'P';

    return {
      code,
      discountValue,
      isPercentage: isPercentage
    };
  };

  // Function to add a coupon to the state
  const addCoupon = (code) => {
    const newCoupon = parseCoupon(code);
    setCoupons([...coupons, newCoupon]);
    setInputValue("")
  };

  // Function to remove a coupon from the state
  const removeCoupon = (code) => {
    setCoupons(coupons.filter((coupon) => coupon.code !== code));
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

  const updateAgent = async () => {
    const user = {
      ...agent,
      coupons: coupons
    }
    await setDoc(doc(db, "users", agent?.uid), user);
  }

  useEffect(() => {
    updateAgent()
  }, [coupons])

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className='flex gap-10 items-center'>
        <CouponGenerator />
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            placeholder="Coupon Code"
          />
          <p className='mt-2 text-red-500 text-[10px] text-center'>Coupon code should end with<br /> a number following alphabet V or P </p>
          <div className='flex gap-2'>
            <button
              onClick={handlePasteFromClipboard}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Paste
            </button>
            <button
              onClick={() => addCoupon(inputValue)}
              className="mt-4 p-2 bg-green-500 text-white rounded"
            >Add Coupon</button>
          </div>
        </div>
      </div>
      <table className="table-auto w-full text-left mt-5">
        <thead>
          <tr>
            <th className="px-4 py-2">Code</th>
            <th className="px-4 py-2">Discount Type</th>
            <th className="px-4 py-2">Discount Value</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons?.map((coupon, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="px-4 py-2">{coupon.code}</td>
              <td className="px-4 py-2">
                {coupon.isPercentage ? "Percentage" : "Cash"}
              </td>
              <td className="px-4 py-2">{coupon.discountValue}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => removeCoupon(coupon.code)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
