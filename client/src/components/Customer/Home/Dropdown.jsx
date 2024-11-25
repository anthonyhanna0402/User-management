import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {subtractFromCart, updateQuantity} from '../../../redux/product/cartSlice';
import { Link } from 'react-router-dom';

const Dropdown =() => {
  const currentCart = useSelector(state=>state.cart.currentCart);
  const dispatch = useDispatch();

  const totalAmount = currentCart.reduce((total, item) => total + item.price * item.quantity, 0);
  const handleSubtract = (id) => {
    dispatch(subtractFromCart(id));
};

const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
};
  return(
    <>
    <div className="p-4 text-black">
      <h2 className='text-lg font-bold'>Cart</h2>
      {currentCart.length === 0 ? (
                <div className="mt-4">
                    <p>Your cart is empty.</p>
                </div>
            ) : (
                <div className="mt-4">
                    {currentCart.map((item, idx) => idx < 3 && (
                        <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
                            <img src={item.img} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                            <div className="flex-1">
                                <h2 className="text-lg font-medium">{item.name}</h2>
                                <p className="text-gray-600">${item.price}</p>
                                <div className="flex items-center">
                                    <p>quantity: </p>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        className="ml-2 border border-gray-300 rounded p-1 w-12 text-center"
                                    />
                                </div>
                            </div>
                            <button onClick={() => handleSubtract(item.id)}
                                className="bg-red-500/30 text-white py-1 px-3 rounded">
                                Remove
                            </button>
                        </div>
                    ))}
                    {currentCart.length > 3 && (
                        <div className="flex justify-end mt-6">
                            <Link to="./cart" className="bg-blue-500 text-white py-2 px-4 rounded">
                                View More
                            </Link>
                        </div>
                    )}

                    <div className="text-right mt-4">
                        <h3 className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
                    </div>
                </div>
            )}    
    </div>
    </>
  )
}

export default Dropdown;