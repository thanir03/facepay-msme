"use client";
import { useRouter } from "next/navigation";
import FaceScan from "@/components/onboarding/FaceScan";
import { useState } from "react";

const timeoutPromise = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function Login() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFaceScanConfirm = async (image: string) => {
    setShowSuccess(true);
    await timeoutPromise(1500);
    router.push("/dashboard");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">FacePay MSME Login</h1>
      <FaceScan onConfirm={handleFaceScanConfirm} showInstructions={true} />
      {showSuccess && (
        <>
          <div className="absolute top-0 bottom-0 left-0 right-0 z-1 bg-black/20 bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center z-50 w-full h-full">
            <div className="bg-white rounded-2xl shadow-2xl p-16 flex flex-col items-center justify-center w-[600px] h-[400px]">
              <div className="text-green-600 text-8xl mb-8">✓</div>
              <h2 className="text-3xl font-bold mb-4">
                Welcome Mr.Thanirmalai !
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
