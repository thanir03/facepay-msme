"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdFullscreen } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9BC01] px-6 relative cursor-pointer">
      {!isFullscreen && (
        <MdFullscreen
          className="absolute top-4 right-4 text-2xl text-black z-50"
          onClick={() => {
            if (isFullscreen) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
            setIsFullscreen(!isFullscreen);
          }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center w-full gap-8"
      >
        {/* GIF */}
        <div className="w-64 h-64 flex items-center justify-center rounded-xl">
          <img
            src="https://i.pinimg.com/originals/ba/9a/b4/ba9ab42593e487b4e349973e1d43b11d.gif"
            alt="Welcome GIF"
            className="w-full h-full object-cover rounded-2xl border-2 border-black shadow-lg"
          />
        </div>
        {/* Logo */}
        <h1 className="text-6xl font-extrabold tracking-tight text-black select-none drop-shadow-lg mb-2 mt-4">
          FacePay
        </h1>
        {/* Animated Welcome Text */}
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-2xl text-black text-center font-bold mb-2"
        >
          Welcome!
          <br />
          Experience seamless, secure payments.
          <br />
          Just with your face.
        </motion.p>
      </motion.div>
      {/* MSME Login Button - fixed bottom left */}
      <div className="fixed bottom-8 left-8">
        <Button
          size="lg"
          className="px-8 py-4 bg-black text-white text-xl font-bold rounded-full shadow-lg border-2 border-black transition-all z-50 hover:bg-white hover:text-black hover:scale-105 hover:shadow-2xl hover:border-yellow-400 duration-200 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          MSME Login
        </Button>
      </div>
      {/* Continue Button - fixed bottom right */}
      <div className="fixed bottom-8 right-8">
        <Button
          size="lg"
          className="px-8 py-4 bg-black text-white text-xl font-bold rounded-full shadow-lg border-2 border-black transition-all z-50 hover:bg-white hover:text-black hover:scale-105 hover:shadow-2xl hover:border-yellow-400 duration-200 cursor-pointer"
          onClick={() => router.push("/onboarding")}
        >
          Get Started <span className="ml-2">→</span>
        </Button>
      </div>
    </div>
  );
}
