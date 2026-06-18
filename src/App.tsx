import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Trash2, ShoppingBag, CheckCircle, Ticket, 
  HelpCircle, Sparkles, Heart, CreditCard, ChevronRight, Copy, Check 
} from 'lucide-react';

import Navbar from './components/Navbar';
import ConsumerSite from './components/ConsumerSite';
import BrandHQ from './components/BrandHQ';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'website' | 'strategy'>('website');
  
  // Shopping Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');
  const [couponSuccess, setCouponSuccess] = useState<string>('');
  
  // Checkout Simulator States
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [mockReceipt, setMockReceipt] = useState<{
    orderNumber: string;
    subtotal: number;
    discountAmount: number;
    tax: number;
    finalTotal: number;
    prepTime: string;
  } | null>(null);

  // Quick navigation helper
  const [scrollToSection, setScrollToSection] = useState<string>('');

  // Add customized item to bag
  const handleAddToBag = (item: MenuItem, customization: { size: 'Regular' | 'Grande', milkOption: string, sweetnessOption: string }) => {
    setCart(prevCart => {
      // Check if item with same configuration already exists
      const existingIdx = prevCart.findIndex(cartItem => 
        cartItem.menuItem.id === item.id &&
        cartItem.size === customization.size &&
        cartItem.milkOption === customization.milkOption &&
        cartItem.sweetnessOption === customization.sweetnessOption
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      }

      return [...prevCart, {
        menuItem: item,
        quantity: 1,
        ...customization
      }];
    });

    // Auto trigger cart preview slide-out to show action response
    setIsCartOpen(true);
  };

  // Modify quantities
  const handleUpdateQuantity = (idx: number, delta: number) => {
    setCart(prevCart => {
      const updated = [...prevCart];
      const newQty = updated[idx].quantity + delta;
      if (newQty <= 0) {
        updated.splice(idx, 1);
      } else {
        updated[idx].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveItem = (idx: number) => {
    setCart(prevCart => {
      const updated = [...prevCart];
      updated.splice(idx, 1);
      return updated;
    });
  };

  // Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      let itemPrice = item.menuItem.price;
      if (item.size === 'Grande') itemPrice += 40;
      if (item.milkOption?.includes('+₹30')) itemPrice += 30;
      return acc + (itemPrice * item.quantity);
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((cartSubtotal * discountPercent) / 100);
  }, [cartSubtotal, discountPercent]);

  const sgstCgstTax = useMemo(() => {
    return Math.round((cartSubtotal - discountAmount) * 0.05); // 5% standard local cafe tax in India
  }, [cartSubtotal, discountAmount]);

  const cartTotal = useMemo(() => {
    return (cartSubtotal - discountAmount) + sgstCgstTax;
  }, [cartSubtotal, discountAmount, sgstCgstTax]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Apply discount coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (couponCode.toUpperCase() === 'BREWNEW') {
      setDiscountPercent(15);
      setCouponSuccess('15% off discount applied successfully!');
    } else if (couponCode.trim() === '') {
      setCouponError('Please enter a valid coupon code.');
    } else {
      setCouponError('Unknown coupon code. Try entering "BREWNEW".');
    }
  };

  // Trigger simulated payment & order receipt
  const handlePlaceOrder = () => {
    setIsCheckingOut(true);
    
    // Simulate slight loading delay for card authorization
    setTimeout(() => {
      const mockNo = `BI-${Math.floor(1000 + Math.random() * 9000)}`;
      setMockReceipt({
        orderNumber: mockNo,
        subtotal: cartSubtotal,
        discountAmount: discountAmount,
        tax: sgstCgstTax,
        finalTotal: cartTotal,
        prepTime: `${Math.floor(8 + Math.random() * 8)} mins`
      });
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      // clear cart
      setCart([]);
    }, 1500);
  };

  const handleCloseReceiptAndReset = () => {
    setCheckoutComplete(false);
    setMockReceipt(null);
    setIsCartOpen(false);
    setCouponCode('');
    setDiscountPercent(0);
    setCouponSuccess('');
  };

  const copyCouponCodeShortcut = () => {
    setCouponCode('BREWNEW');
  };

  return (
    <div className="min-h-screen flex flex-col bg-coffee-50 transition-colors selection:bg-accent-amber selection:text-white">
      
      {/* PERSISTENT HEADER NAVBAR */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* CORE VIEWPORT LAYOUT WRAPPER */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentTab === 'website' ? (
            <motion.div
              key="website"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ConsumerSite 
                onAddToBag={handleAddToBag} 
                openCart={() => setIsCartOpen(true)}
                scrollToSection={scrollToSection}
              />
            </motion.div>
          ) : (
            <motion.div
              key="strategy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <BrandHQ />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FLOATING ACTION STRATEGY TAB PROMPT AT BOTTOM EDGE FOR INVESTORS */}
      {currentTab === 'website' && (
        <div className="fixed bottom-4 left-4 z-40 max-w-sm hidden sm:block">
          <div className="bg-coffee-950/95 border border-coffee-800 text-white rounded-2xl p-4 shadow-2xl backdrop-blur-md flex items-start space-x-3">
            <div className="h-8 w-8 rounded-full bg-accent-amber/15 border border-accent-amber flex items-center justify-center shrink-0">
              <Sparkles className="h-4 w-4 text-accent-amber animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold font-display">Founder Strategy Deck Linked!</h4>
              <p className="text-[10.5px] text-coffee-300 mt-0.5">
                Switch views in the navigation header to browse customer personas, SWOT boards, and play with our interactive financial KPI sliders.
              </p>
              <button
                onClick={() => setCurrentTab('strategy')}
                className="mt-2 text-[11px] text-accent-amber font-bold flex items-center space-x-1 hover:underline"
              >
                <span>Open Strategy Panel</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPREHENSIVE SHOPPING INNER BAG DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            
            {/* Dark glass backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!checkoutComplete) setIsCartOpen(false);
              }}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            ></motion.div>

            {/* Sliding Drawer Container */}
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="pointer-events-auto w-screen max-w-md bg-white border-l border-coffee-200 flex flex-col justify-between shadow-2xl"
              >
                
                {/* Header aspect */}
                <div className="px-6 py-5 border-b border-coffee-100 flex items-center justify-between bg-coffee-100/40">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-accent-amber fill-current" />
                    <h3 className="font-display text-base font-extrabold text-coffee-950">
                      Your Daily Selection ({cartCount})
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 rounded-full hover:bg-coffee-250/20 text-coffee-400 hover:text-coffee-900 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Main Content Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar space-y-4">
                  
                  {checkoutComplete ? (
                    /* RECEIPT COMPLETION SCREEN from PRD metrics */
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="py-6 text-center space-y-6"
                    >
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 border border-emerald-300 text-accent-green mb-1 animate-pulse">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      
                      <div>
                        <h4 className="font-display text-lg font-extrabold text-coffee-950">
                          Order Ticket Generated!
                        </h4>
                        <p className="text-xs text-coffee-600 mt-1">
                          Simulated order successfully dispatched to the Brew Inn Churchgate physical counter.
                        </p>
                      </div>

                      {/* Mock Receipt Card print layout */}
                      <div className="bg-coffee-50 border-2 border-dashed border-coffee-200 rounded-2xl p-5 text-left font-mono text-xs text-coffee-800 space-y-3 relative overflow-hidden">
                        
                        {/* Cut corner visual circles */}
                        <div className="absolute top-1/2 -left-3 h-6 w-6 rounded-full bg-white border border-coffee-200"></div>
                        <div className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-white border border-coffee-200"></div>

                        <div className="border-b border-coffee-200/50 pb-3 text-center">
                          <h5 className="font-display font-extrabold text-sm text-coffee-900">BREW INN CAFE</h5>
                          <p className="text-[10px] text-coffee-400 font-sans mt-0.5">Plot 12, Churchgate, South Mumbai</p>
                          <span className="inline-block mt-2 bg-coffee-800 text-coffee-100 text-[10px] px-2.5 py-0.5 rounded font-bold">
                            Ticket: {mockReceipt?.orderNumber}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-[11px] border-b border-coffee-200/50 pb-3">
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="font-bold text-accent-green text-[10px] uppercase">Paid (Simulated)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pickup Time:</span>
                            <span className="font-bold text-coffee-900">{mockReceipt?.prepTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pickup Desk:</span>
                            <span className="font-bold">Lounge Counter 2</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex justify-between">
                            <span>Calculated Subtotal:</span>
                            <span>₹{mockReceipt?.subtotal}</span>
                          </div>
                          {mockReceipt && mockReceipt.discountAmount > 0 && (
                            <div className="flex justify-between text-amber-700">
                              <span>Promo Saving (15%):</span>
                              <span>-₹{mockReceipt.discountAmount}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-coffee-400">
                            <span>S/CGST Central Tax (5%):</span>
                            <span>+₹{mockReceipt?.tax}</span>
                          </div>
                          <div className="flex justify-between font-bold text-sm text-coffee-900 pt-2 border-t border-coffee-200/40">
                            <span>Invoice Net Amount:</span>
                            <span>₹{mockReceipt?.finalTotal}</span>
                          </div>
                        </div>

                        {/* Barcode line mock code */}
                        <div className="pt-4 flex flex-col items-center justify-center space-y-1">
                          <div className="flex space-x-0.5 h-6 opacity-60">
                            {[1,3,1,2,4,1,3,2,1,2,4,1,2,3,1].map((w, idx) => (
                              <div key={idx} className="bg-black" style={{ width: `${w}px` }}></div>
                            ))}
                          </div>
                          <p className="text-[9px] tracking-widest text-coffee-400 font-sans">400020_CHURCHGATE_SECTOR</p>
                        </div>
                      </div>

                      <button
                        onClick={handleCloseReceiptAndReset}
                        className="w-full bg-coffee-800 hover:bg-accent-amber text-white font-bold py-3 text-xs rounded-xl shadow transition"
                      >
                        Reset and Continue Exploring
                      </button>
                    </motion.div>
                  ) : cart.length > 0 ? (
                    <div className="space-y-4">
                      
                      {/* CART ITEMS ROW */}
                      {cart.map((item, idx) => {
                        let finalItemPrice = item.menuItem.price;
                        if (item.size === 'Grande') finalItemPrice += 40;
                        if (item.milkOption?.includes('+₹30')) finalItemPrice += 30;

                        return (
                          <div 
                            key={idx} 
                            className="bg-coffee-50 p-3 rounded-xl border border-coffee-200/60 flex gap-3 h-28 items-center"
                          >
                            <img 
                              src={item.menuItem.imageUrl} 
                              alt={item.menuItem.name} 
                              className="h-20 w-20 rounded-lg object-cover border border-coffee-200 shrink-0" 
                              referrerPolicy="no-referrer"
                            />
                            
                            <div className="flex-1 flex flex-col justify-between h-full py-1">
                              <div>
                                <div className="flex justify-between">
                                  <h4 className="text-xs font-bold text-coffee-950 truncate max-w-[170px]">
                                    {item.menuItem.name}
                                  </h4>
                                  <span className="font-mono text-xs font-bold text-coffee-800 leading-none">
                                    ₹{finalItemPrice * item.quantity}
                                  </span>
                                </div>
                                <p className="text-[10px] text-coffee-500 font-medium leading-tight mt-0.5">
                                  {item.size} • {item.milkOption} • {item.sweetnessOption}
                                </p>
                              </div>

                              <div className="flex items-center justify-between">
                                {/* Quantity swapper */}
                                <div className="flex items-center space-x-1 border border-coffee-200 bg-white rounded-lg p-0.5">
                                  <button
                                    onClick={() => handleUpdateQuantity(idx, -1)}
                                    className="px-1.5 py-0.5 text-xs text-coffee-600 hover:bg-coffee-100 rounded"
                                  >
                                    -
                                  </button>
                                  <span className="text-xs px-2 font-bold font-mono">{item.quantity}</span>
                                  <button
                                    onClick={() => handleUpdateQuantity(idx, 1)}
                                    className="px-1.5 py-0.5 text-xs text-coffee-600 hover:bg-coffee-100 rounded"
                                  >
                                    +
                                  </button>
                                </div>

                                <button
                                  onClick={() => handleRemoveItem(idx)}
                                  className="text-coffee-400 hover:text-red-600"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>

                            </div>
                          </div>
                        );
                      })}

                    </div>
                  ) : (
                    /* EMPTY CART VIEW */
                    <div className="py-20 text-center space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-coffee-100 text-coffee-400 mb-2">
                        <ShoppingBag className="h-6 w-6" />
                      </div>
                      <h4 className="font-display font-bold text-coffee-900 text-sm">Your Coffee Bag is Empty</h4>
                      <p className="text-xs text-coffee-500 max-w-[220px] mx-auto leading-normal">
                        Browse the Signature food & beverage catalog and add your customized espresso cups.
                      </p>
                      
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="bg-coffee-800 hover:bg-accent-amber text-white font-bold py-2 px-5 text-xs rounded-xl"
                      >
                        Keep exploring
                      </button>
                    </div>
                  )}

                </div>

                {/* Footer Totals (Only if cart has elements and checkout is NOT finished) */}
                {!checkoutComplete && cart.length > 0 && (
                  <div className="border-t border-coffee-200 bg-coffee-50 p-6 space-y-4">
                    
                    {/* Discount Input Form */}
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Coupon Code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full bg-white border border-coffee-200 rounded-xl px-3 py-2 text-xs text-coffee-950 uppercase focus:outline-none focus:border-accent-amber"
                        />
                        <Ticket className="absolute right-3 top-2.5 h-3.5 w-3.5 text-coffee-400" />
                      </div>
                      <button
                        type="submit"
                        className="bg-coffee-800 hover:bg-coffee-900 border text-white rounded-xl text-xs font-semibold px-4 py-2 transition"
                      >
                        Apply
                      </button>
                    </form>

                    {/* Copy snippet helper */}
                    {discountPercent === 0 && (
                      <div className="flex justify-between items-center bg-amber-500/5 p-2 rounded-lg border border-amber-500/10 text-[10.5px]">
                        <span className="text-coffee-600">Have a promo code? Click to copy:</span>
                        <button 
                          type="button"
                          onClick={copyCouponCodeShortcut}
                          className="font-mono text-accent-amber font-bold hover:underline"
                        >
                          BREWNEW (15% off)
                        </button>
                      </div>
                    )}

                    {couponSuccess && <p className="text-xs text-accent-green font-semibold leading-none">{couponSuccess}</p>}
                    {couponError && <p className="text-xs text-red-600 font-semibold leading-none">{couponError}</p>}

                    {/* Cost ledger */}
                    <div className="space-y-1.5 text-xs text-coffee-600">
                      <div className="flex justify-between">
                        <span>Items Subtotal:</span>
                        <span className="font-mono font-medium">₹{cartSubtotal}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-amber-700">
                          <span>Promo Saving (15%):</span>
                          <span className="font-mono font-medium">-₹{discountAmount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>S/CGST Taxes (5%):</span>
                        <span className="font-mono font-medium">+₹{sgstCgstTax}</span>
                      </div>
                      <div className="flex justify-between border-t border-coffee-200/55 pt-3 font-bold text-sm text-coffee-900">
                        <span>Unified Balance Due:</span>
                        <span className="font-mono text-base font-extrabold text-coffee-950">₹{cartTotal}</span>
                      </div>
                    </div>

                    {/* Place Order Simulator button */}
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isCheckingOut}
                      id="place-order-simulator"
                      className="w-full bg-accent-amber hover:bg-accent-amber/90 font-bold py-3.5 text-xs text-white uppercase tracking-widest rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
                    >
                      {isCheckingOut ? (
                        <span>Validating payment Gateway...</span>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4" />
                          <span>Simulate Checkout Order</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-coffee-400 text-center italic">
                      "Clicking triggers a mock payment authorization and prints your counter pickup receipt."
                    </p>

                  </div>
                )}

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
