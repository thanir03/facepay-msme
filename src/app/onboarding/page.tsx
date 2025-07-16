"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import FaceScan from "@/components/onboarding/FaceScan";
import IDScan from "@/components/onboarding/IdScan";
import { useRouter } from "next/navigation";

const steps = [
  "Scan ID Card",
  "Scan Face",
  "Business Name",
  "Business Type",
  "Phone Number",
  "Email Address",
  "Kit Selection",
];

const businessTypes = [
  "Retail",
  "Restaurant",
  "Salon",
  "Grocery",
  "Pharmacy",
  "Other",
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [idImage, setIdImage] = useState<string | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [scannedName, setScannedName] = useState("Thanirmalai Nagappan");
  const [scannedId, setScannedId] = useState("031110141309");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [kit, setKit] = useState("");
  const [errors, setErrors] = useState<any>({});

  function handleNext() {
    setStep((s) => s + 1);
  }
  function handlePrev() {
    setStep((s) => Math.max(0, s - 1));
  }

  const completeOnboarding = () => {
    console.log("complete onboarding");
    router.push("/onboarding/success");
  };

  // Input style
  const inputClass =
    "w-full px-4 py-3 rounded-lg border-2 border-black bg-black text-white focus:bg-white focus:text-black focus:outline-none focus:border-4 focus:border-white transition-all duration-200 text-lg placeholder:text-gray-400";

  return (
    <div className="w-screen h-screen bg-[#F9BC01] flex flex-col items-center justify-start relative overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full px-8 pt-8 z-10 mb-10">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-black text-lg">
            Step {step + 1} of 7
          </span>
          <span className="text-black text-md font-medium">{steps[step]}</span>
        </div>
        <div className="w-full h-3 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${((step + 1) / 7) * 100}%` }}
          />
        </div>
      </div>
      {/* Step Content */}
      <div className="flex-1 w-full flex items-center justify-center relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center relative"
          >
            {/* Step 1: Scan ID Card */}
            {step === 0 && (
              <IDScan
                idImage={idImage}
                onConfirm={(image) => {
                  setIdImage(image);
                  handleNext();
                }}
              />
            )}
            {/* Step 2: Scan Face */}
            {step === 1 && (
              <FaceScan
                onConfirm={(image) => {
                  setFaceImage(image);
                  handleNext();
                }}
              />
            )}
            {/* Step 3: Business Name */}
            {step === 2 && (
              <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center">
                <div className="w-full text-left mb-2">
                  <span className="text-xl font-bold text-black">
                    What is your business name?
                  </span>
                </div>
                <input
                  className="w-full border-0 border-b-2 border-black bg-[#F9BC01] text-black text-2xl font-bold px-0 py-3 focus:outline-none focus:border-b-4 focus:border-black placeholder:text-gray-700 placeholder:font-normal rounded-none transition-all duration-200"
                  placeholder="Enter Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  style={{ boxShadow: "none" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNext();
                  }}
                />
                {errors.businessName && (
                  <span className="text-red-600 text-sm">
                    {errors.businessName}
                  </span>
                )}
              </div>
            )}
            {/* Step 4: Business Type */}
            {step === 3 && (
              <div className="w-full max-w-md mx-auto flex flex-col gap-4 items-center justify-center">
                <div className="w-full text-left mb-2">
                  <span className="text-xl font-bold text-black">
                    What type of business do you have?
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                  {businessTypes.map((type) => (
                    <button
                      key={type}
                      className={`px-4 py-3 rounded-lg border-2 border-black font-semibold text-lg transition-all duration-150 ${
                        businessType === type
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-black hover:text-white"
                      }`}
                      onClick={() => {
                        setBusinessType(type);
                        setTimeout(() => {
                          setStep((s) => s + 1);
                        }, 100);
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.businessType && (
                  <span className="text-red-600 text-sm">
                    {errors.businessType}
                  </span>
                )}
              </div>
            )}
            {/* Step 5: Phone Number */}
            {step === 4 && (
              <div className="w-full max-w-md mx-auto flex flex-col gap-4 items-center justify-center">
                <div className="w-full text-left mb-2">
                  <span className="text-xl font-bold text-black">
                    What is your phone number?
                  </span>
                </div>
                <input
                  className="w-full border-0 border-b-2 border-black bg-[#F9BC01] text-black text-2xl font-bold px-0 py-3 focus:outline-none focus:border-b-4 focus:border-black placeholder:text-gray-700 placeholder:font-normal rounded-none transition-all duration-200"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  maxLength={15}
                  style={{ boxShadow: "none" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNext();
                  }}
                />
                {errors.phone && (
                  <span className="text-red-600 text-sm">{errors.phone}</span>
                )}
              </div>
            )}
            {/* Step 6: Email Address */}
            {step === 5 && (
              <div className="w-full max-w-md mx-auto flex flex-col gap-4 items-center justify-center">
                <div className="w-full text-left mb-2">
                  <span className="text-xl font-bold text-black">
                    What is your email address?
                  </span>
                </div>
                <input
                  className="w-full border-0 border-b-2 border-black bg-[#F9BC01] text-black text-2xl font-bold px-0 py-3 focus:outline-none focus:border-b-4 focus:border-black placeholder:text-gray-700 placeholder:font-normal rounded-none transition-all duration-200"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ boxShadow: "none" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNext();
                  }}
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">{errors.email}</span>
                )}
              </div>
            )}
            {/* Step 7: Kit Selection */}
            {step === 6 && (
              <div className="w-full max-w-md mx-auto flex flex-col gap-4 items-center justify-center">
                <div className="w-full text-center mb-2">
                  <span className="text-xl font-bold text-center text-black">
                    And lastly, which kit would you like to select?
                  </span>
                </div>
                <div className="flex flex-row justify-center items-center gap-4">
                  <button
                    className={`w-64 flex flex-col items-center px-4 py-3 rounded-lg border-2 border-black font-semibold text-lg transition-all duration-150 ${
                      kit === "ipad"
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-black hover:text-white"
                    }`}
                    onClick={() => {
                      setKit("ipad");
                      setTimeout(() => {
                        completeOnboarding();
                      }, 100);
                    }}
                  >
                    <img
                      src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-finish-select-202503-silver-wifi_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=80&.v=aHYyeWZ6TVBzTWw5WlZ2bFJCZno2aG1NVnhJaVErcFhXcDJFUzZhbVJBcUs1Y3FhVmdUUHEzOFNOVmNXd2trNmwrYlNkK0J5ZDZzOExOSm1DaDV3L3pBSHlqQStCOGVBOUJkSkVqU0hLTkFyaVJuRXFRckpaTUtDUkZ1YloyemdmbW94YnYxc1YvNXZ4emJGL0IxNFp3&traceId=1"
                      alt="iPad Trial Kit"
                      className="w-40 h-28 object-contain mx-auto mb-2"
                    />
                    IPAD Trial Kit
                  </button>
                  <button
                    className={`w-64 flex flex-col items-center px-4 py-3 rounded-lg border-2 border-black font-semibold text-lg transition-all duration-150 ${
                      kit === "no-ipad"
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-black hover:text-white"
                    }`}
                    onClick={() => {
                      setKit("noipad");
                      setTimeout(() => {
                        completeOnboarding();
                      }, 100);
                    }}
                  >
                    <img
                      src="https://media.istockphoto.com/id/938396020/photo/no-sign-on-isolated-white-background.jpg?s=612x612&w=0&k=20&c=KrkO01NGnhca4AzCe65dSLb-b_aCjCcbaxQxhn7RA2I="
                      alt="No iPad Kit"
                      className="w-40 h-28 object-contain mx-auto mb-2"
                    />
                    Without IPAD Trial Kit
                  </button>
                </div>

                {errors.kit && (
                  <span className="text-red-600 text-sm">{errors.kit}</span>
                )}
              </div>
            )}
            {/* Navigation Buttons */}
            <div className="flex w-full justify-between gap-4 mt-8 px-8 absolute bottom-8 left-0 z-20">
              <Button
                onClick={handlePrev}
                disabled={step === 0}
                variant="outline"
                className="flex items-center gap-2 border-gray-400 text-gray-700 bg-gray-100"
                style={{
                  borderColor: "#9ca3af",
                  color: "#374151",
                  backgroundColor: step === 0 ? "#f3f4f6" : undefined,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </Button>
              {step >= 2 && step < 6 && (
                <Button className="text-xl p-2" onClick={handleNext}>
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              )}
              {step > 6 && (
                <Button onClick={() => alert("Onboarding Complete!")}>
                  Finish
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
