// app/components/SalesOverview.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import PakistanMap from "./PakistanMap";

export default function SalesOverview() {
  return (
    <Card className="w-full max-w-3xl shadow-sm rounded-2xl border p-6 mx-auto">
      <CardContent className="flex flex-col lg:flex-row justify-between gap-6">
        {/* Left Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-600 rounded-full" />
              Sales Overview
            </h3>

            {/* Dropdown */}
            <button className="flex items-center gap-1 border rounded-md px-3 py-1 text-sm">
              Seeds
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Sales Value */}
          <div>
            <h2 className="text-2xl font-bold">Rs. 7,600,000 PKR</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">Compared to last month</span>
              <span className="flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                ▲ 12.00%
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-2 rounded bg-green-900"></span>
              <span className="text-sm text-gray-600">10,000+ orders (Very High)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-2 rounded bg-green-700"></span>
              <span className="text-sm text-gray-600">5,000–9,999 orders (High)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-2 rounded bg-green-500"></span>
              <span className="text-sm text-gray-600">1,000–4,999 orders (Medium)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-2 rounded bg-green-300"></span>
              <span className="text-sm text-gray-600">1–999 orders (Low)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-2 rounded bg-gray-200"></span>
              <span className="text-sm text-gray-600">0 orders (No Activity)</span>
            </div>
          </div>
        </div>

        {/* Right Section - Map */}
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-gray-50 rounded-xl p-4 w-[320px] h-[320px]">
            <PakistanMap />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
