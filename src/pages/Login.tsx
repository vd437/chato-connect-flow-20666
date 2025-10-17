import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { CountrySelector } from "@/components/CountrySelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Country } from "@/data/countries";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    if (!selectedCountry) {
      toast.error("Please select a country");
      return;
    }
    if (!phoneNumber || phoneNumber.length < 6) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const fullNumber = `${selectedCountry.dialCode}${phoneNumber}`;
      localStorage.setItem("pendingPhone", fullNumber);
      navigate("/verification");
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">
            Enter your phone number to sign in
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <CountrySelector
              value={selectedCountry}
              onChange={setSelectedCountry}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 py-2 bg-secondary rounded-lg border border-input min-w-[80px]">
                <span className="text-sm font-medium">
                  {selectedCountry?.dialCode || "+1"}
                </span>
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="123 456 7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                className="flex-1 h-12 bg-card border-input"
              />
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-all shadow-soft font-medium"
          >
            {isLoading ? "Loading..." : "Continue"}
          </Button>

          <div className="text-center">
            <button
              onClick={() => navigate("/signup")}
              className="text-sm text-primary hover:underline font-medium"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
