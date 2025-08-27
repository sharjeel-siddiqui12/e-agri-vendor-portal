'use client';

import styles from './StatsCards.module.css';

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
    <div className={styles.container}>
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardContent className={styles.cardContent}>
            <div>
              <p className={styles.title}>{stat.title}</p>
              <p className={styles.value}>{stat.value}</p>
            </div>
            <stat.icon
              className={`${styles.icon} ${stat.color || ""}`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
