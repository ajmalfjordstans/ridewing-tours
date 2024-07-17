'use client'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '@/components/store/cartSlice';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className='pb-[150px]'>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} - {item.price}
              <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
