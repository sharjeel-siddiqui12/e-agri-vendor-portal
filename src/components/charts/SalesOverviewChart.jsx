"use client";

import styles from "./SalesOverviewChart.module.css";

import { ChevronDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Data
const salesData = [
  { name: "Wheat", value: 300, color: "#4a5d23" },
  { name: "Cotton", value: 60, color: "#5a6d33" },
  { name: "Maize", value: 80, color: "#6a7d43" },
  { name: "Sunflower", value: 200, color: "#7a8d53" },
  { name: "Rice", value: 120, color: "#8a9d63" },
];

// Chart config
const chartConfig = {
  value: {
    label: "Sales",
    color: "#4a5d23",
  },
};

export default function SalesOverviewChart() {
  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>
          <div className={styles.titleBar}></div>
          Sales Overview
        </CardTitle>
        <Button variant="outline" size="sm">
          Seeds <ChevronDown className={styles.chevronIcon} />
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={salesData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={4}>
              {salesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
