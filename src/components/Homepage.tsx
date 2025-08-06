import { Mic, Bell, ShoppingBasket, RotateCcw, Heart, Package } from "lucide-react";
import CategoryCard from "./CategoryCard";
import freshProduce from "@/assets/fresh-produce.jpg";

interface HomepageProps {
  onCategorySelect: (category: string) => void;
  onVoiceSearch: () => void;
}

const Homepage = ({ onCategorySelect, onVoiceSearch }: HomepageProps) => {
  const categories = [
    {
      id: "essentials",
      title: "Daily Essentials",
      description: "Milk, bread, eggs, and everyday needs",
      icon: ShoppingBasket,
      color: "primary"
    },
    {
      id: "reorder",
      title: "Reorder Previous",
      description: "Quick access to your last order",
      icon: RotateCcw,
      color: "accent"
    },
    {
      id: "favorites",
      title: "My Favorites",
      description: "Items you buy most often",
      icon: Heart,
      color: "success"
    },
    {
      id: "fresh",
      title: "Fresh Produce",
      description: "Fruits, vegetables, and organic items",
      icon: Package,
      color: "warning"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-senior-2xl text-foreground">
                Good morning, Margaret!
              </h1>
              <p className="text-senior-lg text-muted-foreground mt-2">
                Ready for your weekly grocery shopping?
              </p>
            </div>
            <button className="touch-target p-3 rounded-xl bg-accent text-accent-foreground focus-senior">
              <Bell className="w-6 h-6" />
            </button>
          </div>

          {/* Voice search button */}
          <button
            onClick={onVoiceSearch}
            className="button-accent w-full flex items-center justify-center space-x-3 mb-6 focus-senior"
          >
            <Mic className="w-6 h-6" />
            <span>Tell me what you need</span>
          </button>

          {/* Featured image */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
            <img 
              src={freshProduce} 
              alt="Fresh groceries available for delivery"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-gradient-to-r from-primary to-success">
              <p className="text-white text-senior-lg font-semibold">
                Fresh delivery in 2 hours or less
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="p-6 space-y-4">
        <h2 className="text-senior-xl text-foreground font-semibold mb-4">
          Shop by Category
        </h2>
        
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            color={category.color}
            onClick={() => onCategorySelect(category.id)}
          />
        ))}
      </div>

      {/* Quick actions */}
      <div className="px-6 pb-6">
        <div className="card-senior bg-muted">
          <h3 className="text-senior-xl text-foreground font-semibold mb-4">
            Need Help?
          </h3>
          <div className="space-y-3">
            <button className="button-secondary w-full text-left focus-senior">
              📞 Call customer support
            </button>
            <button className="button-secondary w-full text-left focus-senior">
              💬 Chat with us
            </button>
            <button className="button-secondary w-full text-left focus-senior">
              📋 View order history
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;