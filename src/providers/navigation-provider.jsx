"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const NavigationContext = createContext({});

// Map routes to page titles - update this based on your actual routes
const routeTitleMap = {
  "/": "Login",
  "/login": "Login",
  "/products": "Products / Inventory",
  "/orders": "Orders",
  "/shipments": "Shipments",
  "/feedback": "Feedback & Reviews",
  "/demand": "Demand Intelligence",
  "/insights": "Market Insights",
  "/promotions": "Promotions / Campaigns",
  "/compliance": "Compliance",
  "/user-management": "User & Role Management",
  "/resource": "Resource Management",
  "/settings": "Store Settings",
  "/support": "Help & Support",
};

export function NavigationProvider({ children }) {
  const pathname = usePathname();
  
  // Initialize with the current path's title
  const initialTitle = routeTitleMap[pathname] || "Dashboard";
  const [activePage, setActivePage] = useState(initialTitle);
  const previousPathRef = useRef(pathname);

  // Update title when path changes
  useEffect(() => {
    // Only update if the path actually changed
    if (previousPathRef.current !== pathname) {
      const pageTitle = routeTitleMap[pathname] || "Dashboard";
      setActivePage(pageTitle);
      previousPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);   