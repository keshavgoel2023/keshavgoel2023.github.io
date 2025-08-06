import { useState } from "react";
import { Minus, Plus, Trash2, ArrowLeft, CreditCard, Banknote } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (paymentMethod: string) => void;
  onBack: () => void;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout, onBack }: CartProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = total > 500 ? 0 : 30;
  const finalTotal = total + deliveryFee;

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + delta);
      if (newQuantity === 0) {
        onRemoveItem(id);
      } else {
        onUpdateQuantity(id, newQuantity);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto">
            <span className="text-6xl">🛒</span>
          </div>
          <h2 className="text-senior-2xl text-foreground">Your cart is empty</h2>
          <p className="text-senior-lg text-muted-foreground">
            Add some groceries to get started
          </p>
          <button
            onClick={onBack}
            className="button-primary focus-senior"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={onBack}
            className="touch-target p-3 rounded-xl bg-secondary text-secondary-foreground focus-senior"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-senior-xl text-foreground font-semibold">
            My Cart ({items.length} items)
          </h1>
        </div>
      </div>

      {/* Cart items */}
      <div className="p-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="card-senior">
            <div className="flex items-center space-x-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="text-senior-lg text-foreground font-semibold mb-1">
                  {item.name}
                </h3>
                <p className="text-senior-lg text-primary font-semibold">
                  ₹{item.price} per {item.unit}
                </p>
              </div>

              <div className="flex flex-col items-end space-y-3">
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg focus-senior"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="w-10 h-10 rounded-lg bg-secondary text-secondary-foreground font-bold focus-senior"
                  >
                    <Minus className="w-4 h-4 mx-auto" />
                  </button>
                  
                  <span className="text-senior-lg font-semibold min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="w-10 h-10 rounded-lg bg-secondary text-secondary-foreground font-bold focus-senior"
                  >
                    <Plus className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
              <span className="text-senior-lg text-muted-foreground">Subtotal:</span>
              <span className="text-senior-lg text-foreground font-semibold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="px-6 pb-6">
        <div className="card-senior bg-primary/5 border-primary/20">
          <h3 className="text-senior-xl text-foreground font-semibold mb-4">
            Order Summary
          </h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-senior-lg text-muted-foreground">Subtotal:</span>
              <span className="text-senior-lg text-foreground">₹{total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-senior-lg text-muted-foreground">
                Delivery: {total > 500 ? "(Free over ₹500)" : ""}
              </span>
              <span className="text-senior-lg text-foreground">
                {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
              </span>
            </div>
            
            <div className="border-t border-border pt-3">
              <div className="flex justify-between items-center">
                <span className="text-senior-xl text-foreground font-semibold">Total:</span>
                <span className="text-senior-xl text-primary font-bold">
                  ₹{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment method selection */}
          <div className="mb-6">
            <h4 className="text-senior-lg text-foreground font-semibold mb-3">
              Payment Method
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`w-full p-4 rounded-xl border-2 flex items-center space-x-3 focus-senior ${
                  paymentMethod === "cod"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background"
                }`}
              >
                <Banknote className="w-6 h-6 text-success" />
                <span className="text-senior-lg">Cash on Delivery</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod("upi")}
                className={`w-full p-4 rounded-xl border-2 flex items-center space-x-3 focus-senior ${
                  paymentMethod === "upi"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background"
                }`}
              >
                <CreditCard className="w-6 h-6 text-accent" />
                <span className="text-senior-lg">UPI / Digital Payment</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onCheckout(paymentMethod)}
            className="button-primary w-full focus-senior"
          >
            Place Order - ₹{finalTotal.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;