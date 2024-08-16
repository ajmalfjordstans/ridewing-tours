import { useState } from 'react';

export default function CouponGenerator() {
  const [couponCode, setCouponCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [discountType, setDiscountType] = useState('percentage'); // 'percentage' or 'fixed'
  const [discountValue, setDiscountValue] = useState(10); // Default discount value

  const generateCoupon = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const finalCouponCode = `${result}${discountType == "percentage" ? "P" : "V"}${discountValue}`;
    setCouponCode(finalCouponCode);
    setCopied(false); // Reset the copied state
  };

  const copyToClipboard = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
    }
  };

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
    setDiscountValue(10); // Reset discount value when type changes
  };

  const handleDiscountChange = (e) => {
    setDiscountValue(e.target.value);
    if (couponCode) {
      generateCoupon(); // Update the coupon code with the new discount value
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-[10px] shadow-xl md:w-[50%] w-full">
      <h1 className="text-2xl font-bold mb-4">Coupon Code Generator</h1>

      <div className="flex items-center mb-4 w-full max-w-md">
        <label className="mr-2">Discount Type:</label>
        <select
          value={discountType}
          onChange={handleDiscountTypeChange}
          className="p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Value</option>
        </select>
      </div>

      {discountType === 'percentage' ? (
        <div className="mb-4 w-full max-w-md">
          <label className="block mb-2">Percentage Discount: {discountValue}%</label>
          <input
            type="range"
            min="1"
            max="100"
            value={discountValue}
            onChange={handleDiscountChange}
            className="w-full"
          />
        </div>
      ) : (
        <div className="mb-4 w-full max-w-md">
          <label className="block mb-2">Fixed Discount Price: {discountValue}</label>
          <input
            type="number"
            value={discountValue}
            onChange={handleDiscountChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      )}

      <div className="mt-4 p-2 w-full max-w-md">
        <input
          className="text-xl font-mono p-[5px] border border-gray-300 rounded-md w-full"
          disabled
          value={couponCode || 'Generate Code'}
        />
        <div className="flex gap-4 mt-2">
          <button
            onClick={generateCoupon}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
          >
            Generate Code
          </button>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
