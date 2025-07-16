import Link from "next/link";

export default function OnboardingSuccess() {
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
        <Link
          href="/"
          className="mt-4 px-6 py-3 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-900 transition-all"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
