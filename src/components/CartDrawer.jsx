import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, X } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
          onClick={onClose}
        ></div>
      )}
      
      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-[110] transform transition-transform duration-300 ease-in-out flex flex-col font-heading ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-nest-border">
          <h2 className="text-xl font-bold text-nest-dark">Shopping Cart ({cartItems.length})</h2>
          <button onClick={onClose} className="p-2 text-nest-text hover:text-nest-primary hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
              <p className="text-nest-text font-medium text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="bg-nest-primary text-white px-8 py-3 rounded-[4px] font-bold hover:bg-nest-primary/90 transition-all active:scale-95"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-nest-border pb-5">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded-[8px] bg-[#f8f9fa] border border-nest-border p-1"
                  />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.id}`} onClick={onClose}>
                        <h4 className="font-bold text-sm text-nest-dark hover:text-nest-primary transition-colors line-clamp-2">{item.title}</h4>
                      </Link>
                      <p className="text-nest-primary font-bold text-sm mt-1">${item.price}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 border rounded-[4px] border-nest-border/80 p-1">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="p-1 text-nest-text hover:text-nest-primary transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-[13px] font-bold text-nest-dark">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="p-1 text-nest-text hover:text-nest-primary transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="text-nest-text hover:text-nest-red transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area */}
        {cartItems.length > 0 && (
          <div className="border-t border-nest-border p-5 space-y-4 bg-white sticky bottom-0">
            <div className="flex justify-between items-center text-[16px] font-bold">
              <span className="text-nest-dark">Total:</span>
              <span className="text-nest-primary text-xl">${total.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="w-full text-center border-2 border-nest-primary text-nest-primary py-3 rounded-[4px] font-bold hover:bg-nest-primary hover:text-white transition-all text-[13px] uppercase tracking-wide"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="w-full text-center bg-nest-primary text-white py-3 rounded-[4px] font-bold hover:bg-nest-primary/90 transition-all active:scale-95 text-[13px] uppercase tracking-wide"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
