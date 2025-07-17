"use client";

import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OnboardingSuccess() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen bg-[#F9BC01] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 p-8 bg-white/90 rounded-2xl shadow-lg border-2 border-black">
        <div className="text-6xl mb-2">🎉</div>
        <div className="text-2xl font-bold text-black text-center">
          Welcome, Mr Thanirmalai!
        </div>
        <h1 className="text-3xl font-bold text-black text-center">
          Onboarding Complete!
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-md">
          Congratulations! Your business onboarding is successful. You can now
          start using FacePay MSME.
        </p>
        <Button
          onClick={() => router.push("/dashboard")}
          className="mt-4 px-6 py-3 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-900 transition-all cursor-pointer"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
