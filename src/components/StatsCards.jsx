'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Package, TrendingUp, ShoppingCart, Droplets, User } from 'lucide-react';

const stats = [
  { title: "Total Order Received", value: "430", icon: Package },
  { title: "Total Sales (This Month)", value: "PKR 1.45M", icon: TrendingUp },
  { title: "Pending Orders", value: "25", icon: ShoppingCart },
  { title: "Out of Stock Products", value: "20", icon: Package, color: "text-red-400" },
  { title: "Return Rate", value: "0.25%", icon: Droplets },
  { title: "New Buyer (This Month)", value: "3", icon: User },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardContent className="flex items-center justify-between ">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <stat.icon className={`w-8 h-8 text-gray-400 ${stat.color || ""}`} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
