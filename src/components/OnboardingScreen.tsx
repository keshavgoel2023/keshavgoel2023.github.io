import { useState } from "react";
import { ChevronRight, Heart, Shield, Truck } from "lucide-react";
import groceryLogo from "@/assets/grocery-logo.png";
import happyCustomer from "@/assets/happy-customer.jpg";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to FreshCare",
      subtitle: "Your trusted grocery delivery companion",
      description: "We make grocery shopping simple, safe, and convenient for you.",
      image: groceryLogo,
      icon: <Heart className="w-16 h-16 text-accent" />
    },
    {
      title: "Large, Clear Interface",
      subtitle: "Designed with you in mind",
      description: "Big buttons, clear text, and simple navigation make shopping a pleasure.",
      image: happyCustomer,
      icon: <Shield className="w-16 h-16 text-primary" />
    },
    {
      title: "Helpful Delivery",
      subtitle: "We care about your needs",
      description: "Our delivery team can help with heavy items and placing groceries safely.",
      image: happyCustomer,
      icon: <Truck className="w-16 h-16 text-success" />
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-6">
      {/* Skip button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSkip}
          className="text-muted-foreground text-senior-lg font-medium focus-senior"
        >
          Skip
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        {/* Icon */}
        <div className="mb-4">
          {step.icon}
        </div>

        {/* Image */}
        <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-xl">
          <img 
            src={step.image} 
            alt={step.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text content */}
        <div className="space-y-4 max-w-md">
          <h1 className="text-senior-2xl text-foreground">
            {step.title}
          </h1>
          <h2 className="text-senior-xl text-primary">
            {step.subtitle}
          </h2>
          <p className="text-senior-lg text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center space-x-3">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                index === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="button-primary w-full flex items-center justify-center space-x-3 focus-senior"
        >
          <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;