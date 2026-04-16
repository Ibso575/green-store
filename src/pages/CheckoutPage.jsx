import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import { Star } from 'lucide-react';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState("free");
  const [payment, setPayment] = useState("cod");
  const [newCustomerOpt, setNewCustomerOpt] = useState("register");
  const [addressOpt, setAddressOpt] = useState("new");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    navigate('/success');
  };

  return (
    <div className="container-custom py-12 md:py-16 font-heading">
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column */}
        <div className="w-full lg:w-[32%] flex flex-col gap-6">
          
          {/* Summary Box */}
          <div className="border border-gray-200 p-6 bg-white">
            <h2 className="text-xl font-bold text-nest-dark mb-4">Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500 font-bold">Sub Total</span>
                <span className="font-bold text-nest-dark">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500 font-bold">Delivery Charges</span>
                <span className="font-bold text-nest-dark">${delivery === "free" ? "0.00" : "5.00"}</span>
              </div>
            </div>
            
            <div className="flex justify-between text-[15px] font-bold text-nest-dark mb-6 pt-4 border-t border-gray-100">
              <span>Total Amount</span>
              <span>${(subtotal + (delivery === "free" ? 0 : 5)).toFixed(2)}</span>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 border border-gray-100 p-1 flex-shrink-0">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-nest-dark line-clamp-1">{item.title}</h4>
                    <div className="flex items-center my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'fill-nest-primary text-nest-primary' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[#3BB77E] font-bold text-[13px]">${item.price.toFixed(2)}</span>
                       {item.discountPercentage > 0 && (
                         <span className="text-gray-400 text-[11px] line-through font-bold">${(item.price * 1.2).toFixed(2)}</span>
                       )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Method Box */}
          <div className="border border-gray-200 p-6 bg-white">
            <h2 className="text-[17px] font-bold text-nest-dark mb-2">Delivery Method</h2>
            <p className="text-gray-500 text-[12px] mb-5">Please select the preferred shipping method to use on this order.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <label className="flex flex-col gap-1 cursor-pointer">
                <span className="font-bold text-[13px] text-nest-dark">Free Shipping</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <input type="radio" name="delivery" checked={delivery === "free"} onChange={() => setDelivery("free")} className="accent-[#FF324D] w-3 h-3" />
                  <span className="text-[12px] text-gray-500 font-medium">Rate - $0.00</span>
                </div>
              </label>
              <label className="flex flex-col gap-1 cursor-pointer">
                <span className="font-bold text-[13px] text-nest-dark">Flat Rate</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <input type="radio" name="delivery" checked={delivery === "flat"} onChange={() => setDelivery("flat")} className="accent-[#FF324D] w-3 h-3" />
                  <span className="text-[12px] text-gray-500 font-medium">Rate - $5.00</span>
                </div>
              </label>
            </div>
            
            <div className="space-y-2">
               <label className="text-[13px] font-bold text-nest-dark">Add Comments About Your Order</label>
               <textarea className="w-full border border-gray-200 p-3 outline-none focus:border-[#FF324D] transition-colors h-[100px] resize-none text-[13px]"></textarea>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border border-gray-200 p-6 bg-white">
            <h2 className="text-[17px] font-bold text-nest-dark mb-2">Payment Method</h2>
            <p className="text-gray-500 text-[12px] mb-5">Please select the preferred payment method to use on this order.</p>
            
            <div className="space-y-3.5">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="payment" checked={payment === "cod"} onChange={() => setPayment("cod")} className="accent-[#FF324D] w-3 h-3" />
                <span className="text-[13px] font-bold text-nest-dark">Cash On Delivery</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="payment" checked={payment === "upi"} onChange={() => setPayment("upi")} className="accent-[#FF324D] w-3 h-3" />
                <span className="text-[13px] font-bold text-nest-dark">UPI</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" name="payment" checked={payment === "bank"} onChange={() => setPayment("bank")} className="accent-[#FF324D] w-3 h-3" />
                <span className="text-[13px] font-bold text-nest-dark">Bank Transfer</span>
              </label>
            </div>
          </div>

          <div className="border border-gray-200 p-6 bg-white flex flex-col gap-4">
            <h2 className="text-[17px] font-bold text-nest-dark">Payment Method</h2>
            <div className="flex gap-2 items-center flex-wrap">
              <div className="w-11 h-7 border border-gray-200 flex items-center justify-center p-1"><img src="/visa.png" alt="Visa" className="object-contain w-full h-full" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerText='VISA' }} /></div>
              <div className="w-11 h-7 border border-gray-200 flex items-center justify-center p-1"><img src="/mastercard.png" alt="MasterCard" className="object-contain w-full h-full" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerText='MC' }} /></div>
              <div className="w-11 h-7 border border-gray-200 flex items-center justify-center p-1"><img src="/paypal.png" alt="PayPal" className="object-contain w-full h-full" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerText='PayPal' }} /></div>
              <div className="w-11 h-7 border border-gray-200 flex items-center justify-center p-1"><img src="/skrill.png" alt="Skrill" className="object-contain w-full h-full" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerText='Skrill' }} /></div>
              <div className="w-11 h-7 border border-gray-200 flex items-center justify-center p-1"><img src="/maestro.png" alt="Maestro" className="object-contain w-full h-full" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerText='M' }} /></div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[68%] flex flex-col gap-6">
           
           {/* Top Box: New & Returning Customer */}
           <div className="border border-gray-200 p-6 lg:p-8 bg-white">
              
              <div className="mb-10">
                 <h2 className="text-[17px] font-bold text-nest-dark mb-4">New Customer</h2>
                 <p className="text-[12px] text-gray-500 font-bold mb-3">Checkout Options</p>
                 <div className="flex items-center gap-6 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="new_cust" checked={newCustomerOpt === "register"} onChange={() => setNewCustomerOpt("register")} className="accent-[#FF324D] w-3 h-3" />
                      <span className="text-[13px] text-gray-500 font-medium">Register Account</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="new_cust" checked={newCustomerOpt === "guest"} onChange={() => setNewCustomerOpt("guest")} className="accent-[#FF324D] w-3 h-3" />
                      <span className="text-[13px] text-gray-500 font-medium">Guest Account</span>
                    </label>
                 </div>
                 <p className="text-[13px] text-gray-500 mb-5 leading-relaxed max-w-xl">
                   By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
                 </p>
                 <button className="bg-[#FF324D] text-white px-8 py-2.5 text-[13px] font-bold hover:bg-[#E0263C] transition-colors cursor-pointer rounded-[2px]">
                   Continue
                 </button>
              </div>

              <div>
                 <h2 className="text-[17px] font-bold text-nest-dark mb-4">Returning Customer</h2>
                 <div className="space-y-4 max-w-3xl">
                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-bold text-nest-dark mb-0.5">Email Address</label>
                      <input type="email" placeholder="Enter your email address" className="border border-gray-200 p-2.5 text-[13px] outline-none focus:border-[#FF324D] w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-bold text-nest-dark mb-0.5">Password</label>
                      <input type="password" placeholder="Enter your password" className="border border-gray-200 p-2.5 text-[13px] outline-none focus:border-[#FF324D] w-full" />
                    </div>
                    <div className="flex items-center gap-4 pt-1">
                       <button className="bg-[#FF324D] text-white px-8 py-2.5 text-[13px] font-bold hover:bg-[#E0263C] transition-colors cursor-pointer rounded-[2px]">
                         Login
                       </button>
                       <span className="text-[13px] font-bold text-nest-dark cursor-pointer hover:text-[#FF324D] underline underline-offset-4">Forgot Password?</span>
                    </div>
                 </div>
              </div>
           </div>


           {/* Bottom Box: Billing Details */}
           <div className="border border-gray-200 p-6 lg:p-8 bg-white">
              <h2 className="text-[17px] font-bold text-nest-dark mb-4">Billing Details</h2>
              <p className="text-[12px] text-gray-500 font-bold mb-3">Checkout Options</p>
              <div className="flex items-center gap-6 mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="billing_opt" checked={addressOpt === "existing"} onChange={() => setAddressOpt("existing")} className="accent-[#FF324D] w-3 h-3" />
                    <span className="text-[13px] text-gray-500 font-medium">I want to use existing address</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="billing_opt" checked={addressOpt === "new"} onChange={() => setAddressOpt("new")} className="accent-[#FF324D] w-3 h-3" />
                    <span className="text-[13px] text-gray-500 font-medium">I want to use new address</span>
                  </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                 <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-nest-dark mb-0.5">First Name *</label>
                    <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="Enter your first name" className="border border-gray-200 p-2.5 text-[13px] outline-none focus:border-[#FF324D] w-full" />
                 </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-nest-dark mb-0.5">Last Name *</label>
                    <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} placeholder="Enter your last name" className="border border-gray-200 p-2.5 text-[13px] outline-none focus:border-[#FF324D] w-full" />
                 </div>

                 <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[13px] font-bold text-nest-dark mb-0.5">Address</label>
                    <input type="text" placeholder="Address Line 1" className="border border-gray-200 p-2.5 text-[13px] outline-none focus:border-[#FF324D] w-full" />
                 </div>

                 <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-nest-dark mb-0.5">City *</label>
                    <input type="text" placeholder="Enter City" className="border border-gray-200 p-2.5 text-[13px] outline-none focus:border-[#FF324D] w-full" />
                 </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-nest-dark mb-0.5">Post Code</label>
                    <input type="text" placeholder="Post Code" className="border border-gray-200 p-2.5 text-[13px] outline-none focus:border-[#FF324D] w-full" />
                 </div>

                 <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-nest-dark mb-0.5">Country *</label>
                    <input type="text" placeholder="Enter Country" className="border border-gray-200 p-2.5 text-[13px] outline-none focus:border-[#FF324D] w-full" />
                 </div>
                 <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-nest-dark mb-0.5">Region / State *</label>
                    <input type="text" placeholder="Enter Region / State" className="border border-gray-200 p-2.5 text-[13px] outline-none focus:border-[#FF324D] w-full" />
                 </div>
              </div>

           </div>
           
           <div className="flex justify-end mt-2">
              <button 
                onClick={handlePlaceOrder}
                className="bg-[#FF324D] text-white px-10 py-3 text-[14px] font-bold hover:bg-[#E0263C] transition-colors cursor-pointer rounded-[2px] shadow-sm">
                Place Order
              </button>
           </div>
           
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
