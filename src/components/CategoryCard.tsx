import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  onClick: () => void;
  color?: string;
}

const CategoryCard = ({ 
  title, 
  icon: Icon, 
  description, 
  onClick,
  color = "primary"
}: CategoryCardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 border-primary/20 hover:bg-primary/20",
    accent: "bg-accent/10 border-accent/20 hover:bg-accent/20",
    success: "bg-success/10 border-success/20 hover:bg-success/20",
    warning: "bg-warning/10 border-warning/20 hover:bg-warning/20"
  };

  const iconColors = {
    primary: "text-primary",
    accent: "text-accent", 
    success: "text-success",
    warning: "text-warning"
  };

  return (
    <button
      onClick={onClick}
      className={`card-senior w-full ${colorClasses[color as keyof typeof colorClasses]} 
        hover:shadow-xl transition-all duration-200 active:scale-95 focus-senior text-left`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Icon className={`w-12 h-12 ${iconColors[color as keyof typeof iconColors]}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-senior-xl text-foreground font-semibold mb-2">
            {title}
          </h3>
          <p className="text-senior-lg text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;