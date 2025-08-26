"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const inputsData = [
  { name: "Wheat (s)", actual: 100, forecast: 230 },
  { name: "DAP", actual: 50, forecast: 80 },
  { name: "Urea", actual: 80, forecast: 120 },
  { name: "Conditioner", actual: 120, forecast: 240 },
  { name: "Maize (s)", actual: 500, forecast: 150 },
  { name: "Fertilizer", actual: 150, forecast: 70 },
];

// chart config
const chartConfig = {
  actual: {
    label: "Actual",
    color: "#4a5d23", // dark green
  },
  forecast: {
    label: "Forecast",
    color: "#5a6d33", // lighter green
  },
} 

export default function AIForecastInputsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 ">
          <div className="w-1 h-6 bg-green-600 rounded"></div>
          AI Forecasted Inputs Requirement
        </CardTitle>
      
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={inputsData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="actual" fill="#4a5d23" radius={4} />
            <Bar dataKey="forecast" fill="#5a6d33" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  );
}
