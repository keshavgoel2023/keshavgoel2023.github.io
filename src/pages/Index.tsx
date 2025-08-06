import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import OnboardingScreen from "@/components/OnboardingScreen";
import Homepage from "@/components/Homepage";
import ProductDetail from "@/components/ProductDetail";
import Cart from "@/components/Cart";
import OrderSuccess from "@/components/OrderSuccess";
import Navigation from "@/components/Navigation";
import VoiceInterface from "@/components/VoiceInterface";
import freshProduce from "@/assets/fresh-produce.jpg";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  image: string;
  inStock: boolean;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>("onboarding");
  const [activeTab, setActiveTab] = useState<string>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showVoiceInterface, setShowVoiceInterface] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastOrderId] = useState("FG" + Math.random().toString(36).substr(2, 6).toUpperCase());
  const { toast } = useToast();

  // Mock product data
  const sampleProducts: Product[] = [
    {
      id: "1",
      name: "Fresh Milk",
      price: 65,
      unit: "1L",
      description: "Farm-fresh whole milk, rich in calcium and protein. Perfect for your daily nutrition needs.",
      image: freshProduce,
      inStock: true
    },
    {
      id: "2", 
      name: "Brown Bread",
      price: 35,
      unit: "loaf",
      description: "Healthy whole wheat bread, soft and nutritious. Great for breakfast and sandwiches.",
      image: freshProduce,
      inStock: true
    }
  ];

  const handleOnboardingComplete = () => {
    setCurrentScreen("home");
    toast({
      title: "Welcome to FreshCare! 🎉",
      description: "Your groceries are just a tap away."
    });
  };

  const handleCategorySelect = (category: string) => {
    // Simulate selecting a product for demo
    setSelectedProduct(sampleProducts[0]);
    setCurrentScreen("product");
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = sampleProducts.find(p => p.id === productId);
    if (product) {
      const existingItem = cartItems.find(item => item.id === productId);
      
      if (existingItem) {
        setCartItems(items => 
          items.map(item => 
            item.id === productId 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          unit: product.unit,
          image: product.image
        };
        setCartItems(items => [...items, newItem]);
      }
      
      toast({
        title: "Added to Cart! 🛒",
        description: `${quantity}x ${product.name} added to your cart.`
      });
      
      setCurrentScreen("home");
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart."
    });
  };

  const handleCheckout = (paymentMethod: string) => {
    setCurrentScreen("success");
    setCartItems([]);
    toast({
      title: "Order Placed! 🎉",
      description: `Your order will be delivered in 2 hours via ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI payment'}.`
    });
  };

  const handleVoiceSearch = () => {
    setShowVoiceInterface(true);
  };

  const handleStartListening = () => {
    setIsListening(true);
    // Simulate speech recognition
    setTimeout(() => {
      setTranscript("I need milk and bread");
      setIsListening(false);
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setShowVoiceInterface(false);
    setTranscript("");
  };

  const handleVoiceCommand = (command: string) => {
    toast({
      title: "Voice Command Received! 🎤",
      description: `Processing: "${command}"`
    });
    setShowVoiceInterface(false);
    
    // Simple command processing
    if (command.toLowerCase().includes("milk")) {
      setSelectedProduct(sampleProducts[0]);
      setCurrentScreen("product");
    }
  };

  const handleSetReminder = () => {
    toast({
      title: "Reminder Set! 📅",
      description: "We'll remind you to order next week."
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") {
      setCurrentScreen("home");
    } else if (tab === "cart") {
      setCurrentScreen("cart");
    } else if (tab === "reorder") {
      // Handle reorder tab - could show recent orders or navigate to a reorder screen
      setCurrentScreen("home"); // For now, go to home
      toast({
        title: "Reorder Feature",
        description: "Showing your recent orders"
      });
    } else if (tab === "favorites") {
      // Handle favorites tab - could show favorite products
      setCurrentScreen("home"); // For now, go to home
      toast({
        title: "Favorites",
        description: "Showing your favorite items"
      });
    } else if (tab === "profile") {
      // Handle profile tab - could show user profile
      setCurrentScreen("home"); // For now, go to home
      toast({
        title: "Profile",
        description: "User profile section"
      });
    }
  };

  const handlePlayDescription = () => {
    if (selectedProduct && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(selectedProduct.description);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
      
      toast({
        title: "Playing Description 🔊",
        description: "Listen to the product details"
      });
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      
      case "home":
        return (
          <Homepage 
            onCategorySelect={handleCategorySelect}
            onVoiceSearch={handleVoiceSearch}
          />
        );
      
      case "product":
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setCurrentScreen("home")}
            onAddToCart={handleAddToCart}
            onPlayDescription={handlePlayDescription}
          />
        ) : null;
      
      case "cart":
        return (
          <Cart 
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            onBack={() => setCurrentScreen("home")}
          />
        );
      
      case "success":
        return (
          <OrderSuccess 
            orderId={lastOrderId}
            estimatedDelivery="Today, 2:00 PM - 4:00 PM"
            onSetReminder={handleSetReminder}
            onGoHome={() => setCurrentScreen("home")}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentScreen()}
      
      {currentScreen !== "onboarding" && (
        <Navigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        />
      )}
      
      {showVoiceInterface && (
        <VoiceInterface 
          isListening={isListening}
          onStartListening={handleStartListening}
          onStopListening={handleStopListening}
          transcript={transcript}
          onVoiceCommand={handleVoiceCommand}
        />
      )}
    </div>
  );
};

export default Index;
