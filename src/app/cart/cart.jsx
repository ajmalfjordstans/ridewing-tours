'use client'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '@/components/store/cartSlice';
import PackageCard from '@/components/cards/cart/package-card';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className='pb-[150px]'>
      <p className='text-[28px] leading-[42px]'>Cart</p>
      <div className='lg:w-[70%] w-full mt-[20px]'>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {items.map((item, id) => (
              <li key={id}>
                <PackageCard data={item} />
                {item.name} - {item.price}
                <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
