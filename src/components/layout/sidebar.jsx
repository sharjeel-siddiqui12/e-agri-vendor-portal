"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/providers/navigation-provider";
import styles from "./sidebar.module.css";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  PackageOpen,
  ShoppingCart,
  Truck,
  Users,
  MessageSquare,
  Brain,
  BarChart2,
  Megaphone,
  FileText,
  UserCog,
  Briefcase,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Products / Inventory", icon: PackageOpen, href: "/products" },
  { name: "Orders", icon: ShoppingCart, href: "/orders" },
  { name: "Shipments", icon: Truck, href: "/shipments" },
 
  { name: "Feedback & Reviews", icon: MessageSquare, href: "/feedback" },
  { name: "Demand Intelligence", icon: Brain, href: "/demand" },
  { name: "Market Insights", icon: BarChart2, href: "/insights" },
  { name: "Promotions / Campaigns", icon: Megaphone, href: "/promotions" },
  { name: "Compliance", icon: FileText, href: "/compliance" },
  { name: "User & Role Management", icon: UserCog, href: "/user-management" },
  { name: "Resource Management", icon: Briefcase, href: "/resource" },
  { name: "Store Settings", icon: Settings, href: "/settings" },
  { name: "Help & Support", icon: HelpCircle, href: "/support" },
];

export function Sidebar({ className, collapsed, setCollapsed }) {
  const { activePage, setActivePage } = useNavigation();

  const asideClassName = `${styles.sidebar} ${
    collapsed ? styles.collapsed : ""
  } ${className || ""}`;

  return (
    <aside className={asideClassName}>
      {/* Toggle button - moved outside the logo section */}
      <Button
        variant="ghost"
        size="icon"
        className={styles.collapseButton}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className={styles.collapseIcon}/>
        ) : (
          <ChevronLeft className={styles.collapseIcon} />
        )}
      </Button>

      {/* Logo section */}
      <div className={styles.logoSection}>
        <Link href="/dashboard" className={styles.logoLink}>
          <Image
            src="/logo.svg"
            width={collapsed ? 50 : 120}
            height={collapsed ? 50 : 40}
            alt="e-Agri Logo"
            className={styles.logo}
            priority
          />
        </Link>
      </div>

      {/* Menu label */}
      {!collapsed && <div className={styles.menuLabel}>Menu</div>}

      {/* Navigation items */}
      <nav className={styles.navigation}>
        {sidebarItems.map((item) => {
          const isActive = activePage === item.name;
          const itemClassName = `${styles.navItem} ${
            isActive ? styles.active : ""
          } ${collapsed ? styles.collapsedItem : ""}`;
          const iconClassName = `${styles.icon} ${
            isActive ? styles.activeIcon : ""
          } ${collapsed ? styles.collapsedIcon : ""}`;

          return (
            <Link
              key={item.name}
              href={item.href}
              // Remove onClick handler that changes page title
              // We'll let the Navigation Provider handle this automatically
              className={itemClassName}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={iconClassName} />
              {!collapsed && (
                <span className={styles.navText}>{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        {!collapsed && <span>© e-Agri 2023, All Rights Reserved.</span>}
      </div>
    </aside>
  );
}
