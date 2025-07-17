"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
}

function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
}: AlertDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 animate-fadein">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-black p-12 max-w-2xl w-full flex flex-col items-center scale-95 opacity-0 animate-popin">
        <div className="text-4xl font-extrabold text-red-600 mb-4 text-center">
          {title}
        </div>
        <div className="text-2xl text-black mb-10 text-center">
          {description}
        </div>
        <button
          className="px-10 py-4 bg-black text-white rounded-xl font-bold text-2xl border-2 border-black hover:bg-gray-900 transition-all"
          onClick={() => onOpenChange(false)}
        >
          OK
        </button>
      </div>
      <style jsx global>{`
        @keyframes popin {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-popin {
          animation: popin 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes fadein {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-fadein {
          animation: fadein 0.2s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default function AcceptPayment() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, []);

  const handleUpdateAmount = () => {
    if (inputRef.current?.value && Number(inputRef.current?.value) > 0) {
      router.push(`/process-payment?amount=${inputRef.current?.value}`);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#F9BC01]">
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#F9BC01]/90 text-black shadow-md mb-8 cursor-pointer">
        <div
          className="flex items-center gap-3"
          onClick={() => router.push("/")}
        >
          <img
            src="/facepay_logo.jpeg"
            alt="FacePay Logo"
            className="w-12 h-12 rounded-[40%] object-cover"
          />
          <span className="text-2xl font-bold tracking-wide">FacePay MSME</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black bg-white hover:bg-[#F9BC01]/90 shadow font-semibold text-black hover:text-black focus:outline-none transition-colors">
              <span className="font-bold">Mr Thanirmalai</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[220px] bg-white border-2 border-black shadow-lg rounded-xl text-black"
          >
            <DropdownMenuLabel className="font-bold text-black">
              Mr Thanirmalai
            </DropdownMenuLabel>
            <div className="px-4 py-1 text-xs text-gray-500">
              thanir@1utar.my
            </div>
            <DropdownMenuSeparator className="bg-black/10" />
            <DropdownMenuItem
              className="text-red-600 font-semibold cursor-pointer hover:bg-red-50 focus:bg-red-100"
              onClick={() => router.push("/")}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="flex flex-col items-center justify-center flex-1 min-h-[70vh] w-full">
        <label
          htmlFor="payment-amount"
          className="text-4xl font-extrabold text-black text-center mb-8"
        >
          Enter Payment Amount
        </label>
        <div className="flex items-center gap-4 w-full justify-center mb-8">
          <span className="text-4xl font-bold text-black">RM</span>
          <input
            id="payment-amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-[220px] md:w-[320px] px-6 py-6 border-b-4 border-black rounded-none text-5xl font-bold focus:outline-none focus:ring-0 text-black bg-transparent text-left placeholder-black-400"
            style={{
              background: "transparent",
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdateAmount();
              }
            }}
          />
        </div>
      </div>
      <button
        className="fixed bottom-6 left-1/2 -translate-x-1/2 px-8 py-4 bg-black text-white text-xl font-bold rounded-full shadow-lg border-2 border-black transition-all z-50 hover:bg-white hover:text-black hover:scale-105 hover:shadow-2xl hover:border-yellow-400 duration-200"
        onClick={() => handleUpdateAmount()}
      >
        Scan Face
      </button>
      <AlertDialog
        open={showError}
        onOpenChange={(open) => {
          setShowError(open);
          if (!open) {
            inputRef.current?.focus();
          }
        }}
        title="Missing Amount"
        description="Please enter an amount before scanning your face."
      />
    </div>
  );
}
