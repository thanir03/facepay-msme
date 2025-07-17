"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import LineChartTransactions from "@/components/dashboard/LineChartTransactions";

const stats = [
  {
    label: "Total Transactions",
    value: 1243,
    icon: "💳",
  },
  {
    label: "Total Revenue",
    value: "RM 98,500",
    icon: "💰",
  },
  {
    label: "Avg. Transaction Value",
    value: "RM 79.25",
    icon: "📊",
  },
  {
    label: "Total Unique Customers",
    value: 412,
    icon: "🧑‍🤝‍🧑",
  },
  {
    label: "Peak Hour",
    value: "6-7pm",
    icon: "⏰",
  },
  {
    label: "Transaction Success Rate",
    value: "99.7%",
    icon: "✅",
  },
  {
    label: "Avg. Daily Transactions",
    value: 87,
    icon: "📅",
  },
  {
    label: "Revenue Growth",
    value: "+12.5%",
    icon: "📈",
  },
];

const monthlyData = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 120 },
  { month: "Mar", value: 150 },
  { month: "Apr", value: 110 },
  { month: "May", value: 200 },
  { month: "Jun", value: 170 },
  { month: "Jul", value: 220 },
  { month: "Aug", value: 180 },
  { month: "Sep", value: 140 },
  { month: "Oct", value: 160 },
  { month: "Nov", value: 210 },
  { month: "Dec", value: 250 },
];

const uniqueCustomers = [
  { date: "10/07/2025", value: 80 },
  { date: "11/07/2025", value: 120 },
  { date: "12/07/2025", value: 150 },
  { date: "13/07/2025", value: 110 },
  { date: "14/07/2025", value: 200 },
  { date: "15/07/2025", value: 170 },
  { date: "16/07/2025", value: 220 },
  { date: "17/07/2025", value: 180 },
  { date: "18/07/2025", value: 140 },
  { date: "19/07/2025", value: 160 },
];

function MiniBarChart() {
  const max = Math.max(...monthlyData.map((d) => d.value));
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-end gap-1 h-20 w-11/12 mx-auto justify-center">
        {monthlyData.map((d) => (
          <div key={d.month} className="flex flex-col items-center w-4">
            <div
              className="bg-[#CA830A] rounded-t"
              style={{
                height: `${(d.value / max) * 60 + 20}px`,
                width: "100%",
              }}
              title={`${d.month}: ${d.value}`}
            ></div>
            <span className="text-[10px] text-gray-500 mt-1">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#F9BC01] pb-28 relative">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#F9BC01]/90 text-black shadow-md mb-8">
        <div className="flex items-center gap-3">
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
      <div className="px-6">
        <h1 className="text-3xl font-bold text-black mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/90 rounded-xl border-2 border-black shadow flex flex-col items-center justify-center p-6 gap-2"
            >
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-lg text-gray-600 font-medium">
                {stat.label}
              </div>
              <div className="text-2xl font-bold text-black">{stat.value}</div>
            </div>
          ))}
          <div className="bg-white/90 rounded-xl border-2 border-black shadow flex flex-col items-center justify-center p-6 gap-2">
            <div className="text-lg text-gray-600 font-medium mb-2">
              Transactions by Month
            </div>
            <MiniBarChart />
          </div>
          <div className="bg-white/90 rounded-xl border-2 border-black shadow items-center justify-center gap-2 col-span-3 p-1">
            <LineChartTransactions />
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-6 left-1/2 -translate-x-1/2 px-8 py-4 bg-black text-white text-xl font-bold rounded-full shadow-lg border-2 border-black hover:bg-[#CA830A] hover:text-black transition-all z-50"
        onClick={() => alert("Accepting new payment...")}
      >
        Accept New Payment
      </button>
    </div>
  );
}
