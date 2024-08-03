'use client'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '@/components/store/cartSlice';
import PackageCard from '@/components/cards/cart/package-card';

const CheckoutMenu = () => {
  return (
    <div className='sticky top-[100px] w-full max-w-[423px] bg-[#ABABAB] h-screen '>

    </div>
  )
}

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className=''>
      <div className=' w-full flex flex-col container mx-auto px-[5%] lg:px-0 '>
        <p className='font-bold text-[26px] md:text-[32px] leading-[42px]'>My Cart</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='flex pl-[5%]'>
        <div className='lg:w-[70%] w-full mt-[20px]'>
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {items.map((item, id) => (
                <li key={id}>
                  <PackageCard data={item} />
                  <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <CheckoutMenu />
      </div>
    </div>
  );
};

export default Cart;
