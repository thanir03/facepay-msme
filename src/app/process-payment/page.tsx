"use client";

import FaceScan from "@/components/onboarding/FaceScan";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

interface ConfirmDialogProps {
  open: boolean;
  userName: string;
  accounts: string[];
  selectedAccount: string;
  onAccountChange: (account: string) => void;
  onComplete: () => void;
  amount: number;
}

const accounts = ["TNG +60****8675", "CIMB *8094", "VISA *1234"];

const timeoutPromise = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function ConfirmDialog({
  open,
  userName,
  accounts,
  selectedAccount,
  onAccountChange,
  amount,
  onComplete,
}: ConfirmDialogProps) {
  if (!open) return null;

  const [paymentStatus, setPaymentStatus] = React.useState<
    "init" | "processing" | "success" | "error"
  >("init");

  const processPayment = async () => {
    setPaymentStatus("processing");
    await timeoutPromise(2000);
    setPaymentStatus("success");
    await timeoutPromise(2000);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/40 animate-fadein">
      {paymentStatus === "init" && (
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-black p-12 max-w-2xl w-full flex flex-col items-center scale-95 opacity-0 animate-popin">
          <div className="text-3xl font-extrabold text-black mb-4 text-center">
            Confirm Account
          </div>
          <div className="text-xl text-black mb-6 text-center">
            Welcome <span className="font-bold">{userName}</span>
          </div>
          <div className="text-xl text-black mb-6 text-center">
            You are about to pay RM {amount} to
          </div>
          <div className="w-full flex flex-col items-center mb-10">
            <label
              htmlFor="account-select"
              className="text-lg font-semibold mb-2"
            >
              Select Account
            </label>
            <select
              id="account-select"
              className="w-64 px-4 py-3 border-2 border-black rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#F9BC01] text-black bg-white"
              value={selectedAccount}
              onChange={(e) => onAccountChange(e.target.value)}
            >
              {accounts.map((acc) => (
                <option key={acc} value={acc}>
                  {acc}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-6 w-full justify-center">
            <button
              className="px-8 py-3 cursor-pointer bg-black text-white rounded-xl font-bold text-xl border-2 border-black hover:bg-gray-900 transition-all"
              onClick={() => {
                processPayment();
              }}
            >
              Confirm
            </button>
            <button
              className="px-8 py-3 bg-white text-black rounded-xl font-bold text-xl border-2 border-black hover:bg-gray-200 transition-all"
              onClick={() => {
                setPaymentStatus("error");
                setTimeout(() => {
                  onComplete();
                }, 2000);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {paymentStatus === "processing" && (
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-black p-12 max-w-2xl w-full flex flex-col items-center scale-95 opacity-0 animate-popin">
          <div className="text-3xl font-extrabold text-black mb-4 text-center">
            Processing Payment
          </div>
          <div className="flex items-center justify-center mt-6">
            <svg
              className="animate-spin h-16 w-16 text-[#F9BC01]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      {paymentStatus === "success" && (
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-black p-12 max-w-2xl w-full flex flex-col items-center scale-95 opacity-0 animate-popin">
          <div className="flex flex-col items-center">
            <svg
              className="h-20 w-20 text-green-500 mb-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="currentColor"
                strokeWidth="4"
                fill="#e6f9ea"
              />
              <path
                d="M15 25l7 7 11-13"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <div className="text-3xl font-extrabold text-black mb-4 text-center">
              Payment Successful. Received RM {amount} from {selectedAccount}
            </div>
          </div>
        </div>
      )}
      {paymentStatus === "error" && (
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-black p-12 max-w-2xl w-full flex flex-col items-center scale-95 opacity-0 animate-popin">
          <div className="flex flex-col items-center">
            <svg
              className="h-20 w-20 text-red-500 mb-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="currentColor"
                strokeWidth="4"
                fill="#fdeaea"
              />
              <line
                x1="16"
                y1="16"
                x2="32"
                y2="32"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="32"
                y1="16"
                x2="16"
                y2="32"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-3xl font-extrabold text-black mb-4 text-center">
              Payment Failed
            </div>
          </div>
        </div>
      )}
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

// Process Payment Page
// Show Amount and Show Face
// Scan Face
// Showcase the account associated with the face
// Show popup with list of accounts associated with the account
// user select the account
// Process payment
// Show success page or error page

export default function ProcessPayment() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState(accounts[0]);
  const params = useSearchParams();
  const amount = Number(params.get("amount"));
  const userName = "Mr Thanirmalai";

  const handleConfirm = (image: string) => {
    setShowConfirm(true);
  };

  const handleAccountConfirm = () => {
    setShowConfirm(false);
    router.push("/dashboard");
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
      </nav>
      <div className="flex flex-col items-center justify-center flex-1 min-h-[70vh] w-full">
        <h1 className="text-3xl font-bold mb-8">FacePay Consumer Login</h1>
        <FaceScan showInstructions={false} onConfirm={handleConfirm} />
      </div>
      <ConfirmDialog
        open={showConfirm}
        userName={userName}
        accounts={accounts}
        selectedAccount={selectedAccount}
        onAccountChange={setSelectedAccount}
        onComplete={handleAccountConfirm}
        amount={amount}
      />
    </div>
  );
}
