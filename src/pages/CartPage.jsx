import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link to="/" className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg font-bold">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-8">Shopping Cart</h1>
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Total</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3 px-4 min-w-[250px]">
                  <div className="flex items-center gap-3">
                    <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded-lg border flex-shrink-0" />
                    <span className="font-bold line-clamp-2 leading-tight">{item.title}</span>
                  </div>
                </td>
                <td className="p-3">${item.price}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="p-3 font-bold">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="p-3">
                  <button onClick={() => dispatch(removeItem(item.id))} className="text-rose-500">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col-reverse sm:flex-row gap-8 justify-between items-center sm:items-start">
        <Link to="/" className="text-primary font-bold">Continue Shopping</Link>
        <div className="text-center sm:text-right w-full sm:w-auto">
          <p className="text-slate-500">Total Balance</p>
          <p className="text-2xl font-black">${total.toFixed(2)}</p>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold w-full sm:w-auto transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
