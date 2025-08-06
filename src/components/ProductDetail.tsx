import { useState } from "react";
import { Minus, Plus, Volume2, ArrowLeft, Heart, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  image: string;
  inStock: boolean;
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onPlayDescription: () => void;
}

const ProductDetail = ({ product, onBack, onAddToCart, onPlayDescription }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="touch-target p-3 rounded-xl bg-secondary text-secondary-foreground focus-senior"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <h1 className="text-senior-xl text-foreground font-semibold flex-1 text-center px-4">
            Product Details
          </h1>
          
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`touch-target p-3 rounded-xl focus-senior ${
              isFavorite 
                ? 'bg-accent text-accent-foreground' 
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product image */}
      <div className="p-6">
        <div className="rounded-2xl overflow-hidden shadow-lg mb-6 bg-white">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-senior-2xl text-foreground font-bold mb-2">
              {product.name}
            </h2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-senior-xl text-primary font-semibold">
                ₹{product.price} per {product.unit}
              </p>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                product.inStock 
                  ? 'bg-success/20 text-success' 
                  : 'bg-destructive/20 text-destructive'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Description with voice */}
          <div className="card-senior">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-senior-xl text-foreground font-semibold">
                Description
              </h3>
              <button
                onClick={onPlayDescription}
                className="touch-target p-3 rounded-xl bg-accent text-accent-foreground focus-senior"
                title="Listen to description"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
            <p className="text-senior-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity selector */}
          <div className="card-senior">
            <h3 className="text-senior-xl text-foreground font-semibold mb-4">
              Quantity
            </h3>
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="touch-target w-16 h-16 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl focus-senior disabled:opacity-50"
              >
                <Minus className="w-6 h-6 mx-auto" />
              </button>
              
              <span className="text-senior-2xl text-foreground font-bold min-w-[3rem] text-center">
                {quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(1)}
                className="touch-target w-16 h-16 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl focus-senior"
              >
                <Plus className="w-6 h-6 mx-auto" />
              </button>
            </div>
          </div>

          {/* Total and add to cart */}
          <div className="card-senior bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <span className="text-senior-xl text-foreground">Total:</span>
              <span className="text-senior-2xl text-primary font-bold">
                ₹{(product.price * quantity).toFixed(2)}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="button-primary w-full flex items-center justify-center space-x-3 focus-senior disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;