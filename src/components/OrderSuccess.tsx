import { CheckCircle, Calendar, Phone, Home } from "lucide-react";

interface OrderSuccessProps {
  orderId: string;
  estimatedDelivery: string;
  onSetReminder: () => void;
  onGoHome: () => void;
}

const OrderSuccess = ({ orderId, estimatedDelivery, onSetReminder, onGoHome }: OrderSuccessProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center p-6">
      <div className="text-center space-y-8">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-success/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-20 h-20 text-success" />
          </div>
        </div>

        {/* Success message */}
        <div className="space-y-4">
          <h1 className="text-senior-2xl text-foreground">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-senior-lg text-muted-foreground leading-relaxed">
            Thank you for your order, Rekha. Your groceries are being prepared with care.
          </p>
        </div>

        {/* Order details */}
        <div className="card-senior text-left">
          <h3 className="text-senior-xl text-foreground font-semibold mb-4">
            Order Details
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-senior-lg text-muted-foreground">Order ID:</span>
              <span className="text-senior-lg text-foreground font-semibold">
                {orderId}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-senior-lg text-muted-foreground">Estimated Delivery:</span>
              <span className="text-senior-lg text-primary font-semibold">
                {estimatedDelivery}
              </span>
            </div>
            
            <div className="pt-4 border-t border-border">
              <p className="text-senior-lg text-foreground">
                📱 We'll send you updates via SMS
              </p>
              <p className="text-senior-lg text-foreground mt-2">
                🚚 Our delivery team will call before arriving
              </p>
            </div>
          </div>
        </div>

        {/* Delivery assistance note */}
        <div className="card-senior bg-accent/10 border-accent/20">
          <h3 className="text-senior-xl text-foreground font-semibold mb-3">
            🤝 Delivery Assistance
          </h3>
          <p className="text-senior-lg text-muted-foreground">
            Our delivery team is happy to help place groceries safely in your kitchen and carry heavy items.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <button
            onClick={onSetReminder}
            className="button-accent w-full flex items-center justify-center space-x-3 focus-senior"
          >
            <Calendar className="w-6 h-6" />
            <span>Remind Me Next Week</span>
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="button-secondary flex items-center justify-center space-x-2 focus-senior">
              <Phone className="w-5 h-5" />
              <span>Call Support</span>
            </button>
            
            <button
              onClick={onGoHome}
              className="button-secondary flex items-center justify-center space-x-2 focus-senior"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </button>
          </div>
        </div>

        {/* Emergency contact reminder */}
        <div className="card-senior bg-warning/10 border-warning/20">
          <p className="text-senior-lg text-foreground text-center">
            💚 For any urgent help, your emergency contact (Sarah) has been notified about your order.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;