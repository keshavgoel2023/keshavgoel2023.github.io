import { Home, ShoppingCart, User, Clock, Heart } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount?: number;
}

const Navigation = ({ activeTab, onTabChange, cartCount = 0 }: NavigationProps) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'reorder', label: 'Reorder', icon: Clock },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartCount },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-2xl z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`touch-target flex flex-col items-center justify-center space-y-1 px-2 py-3 rounded-xl transition-all duration-200 focus-senior relative ${
              activeTab === id
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95'
            }`}
          >
            <div className="relative">
              <Icon className="w-7 h-7" />
              {badge && badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;