import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { VerificationInput } from "@/components/VerificationInput";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function Verification() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const phoneNumber = localStorage.getItem("pendingPhone");

  useEffect(() => {
    if (!phoneNumber) {
      navigate("/login");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phoneNumber, navigate]);

  const handleVerify = () => {
    if (code.length !== 6) {
      toast.error("Please enter the complete verification code");
      return;
    }

    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      const isSignup = localStorage.getItem("isSignup") === "true";
      if (isSignup) {
        navigate("/email-link");
      } else {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/home");
      }
    }, 1000);
  };

  const handleResend = () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(60);
    toast.success("Verification code sent!");

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold">Verification Code</h2>
          <p className="text-muted-foreground text-sm">
            We sent a code to{" "}
            <span className="font-medium text-foreground">{phoneNumber}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <VerificationInput value={code} onChange={setCode} />
          </div>

          <Button
            onClick={handleVerify}
            disabled={isLoading || code.length !== 6}
            className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-all shadow-soft font-medium"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>

          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`text-sm font-medium transition-all ${
                canResend
                  ? "text-primary hover:underline"
                  : "text-muted-foreground cursor-not-allowed"
              }`}
            >
              {canResend ? "Resend Code" : `Resend in ${countdown}s`}
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
