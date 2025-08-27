// app/components/SalesOverview.tsx
"use client";

import styles from "./SalesOverviewMap.module.css";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import PakistanMap from "./PakistanMap";

export default function SalesOverview() {
  return (
    <Card className={styles.card}>
  <CardContent className={styles.cardContent}>
    {/* Dropdown in top right */}
    <button className={styles.dropdown}>
      Seeds
      <ChevronDown className="w-4 h-4" />
    </button>
    {/* Left Section */}
    <div className="flex-1">
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.titleBar} />
          Sales Overview
        </h3>
      </div>

          {/* Sales Value */}
          <div>
            <h2 className={styles.salesValue}>Rs. 7,600,000 PKR</h2>
            <div className={styles.comparison}>
              <span className={styles.comparisonText}>
                Compared to last month
              </span>
              <span className={styles.comparisonBadge}>▲ 12.00%</span>
            </div>
          </div>

          {/* Legend */}
          <div className={styles.legend + " space-y-3"}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendBar} bg-green-900`}></span>
              <span className={styles.legendText}>
                10,000+ orders (Very High)
              </span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendBar} bg-green-700`}></span>
              <span className={styles.legendText}>
                5,000–9,999 orders (High)
              </span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendBar} bg-green-500`}></span>
              <span className={styles.legendText}>
                1,000–4,999 orders (Medium)
              </span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendBar} bg-green-300`}></span>
              <span className={styles.legendText}>1–999 orders (Low)</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendBar} bg-gray-200`}></span>
              <span className={styles.legendText}>0 orders (No Activity)</span>
            </div>
          </div>
        </div>

        {/* Right Section - Map */}
        <div className={styles.mapWrapper}>
          <div className={styles.mapContainer}>
            <PakistanMap />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
