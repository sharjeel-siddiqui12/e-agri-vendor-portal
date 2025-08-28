"use client";

import { useState, useMemo } from "react";
import styles from "./page.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, X } from "lucide-react";

const ALL_ACCESS = [
  "User Management",
  "Employee Management",
  "KYC Review",
  "Loan Application Assessment",
  "Disbursed Funds Monitoring",
];

const initialRoles = [
  {
    name: "Loan Officer",
    access: ["KYC Review", "Loan Application Assessment", "Disbursed Funds Monitoring"],
  },
];

export default function RoleAccessPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [roleName, setRoleName] = useState("Agri Head");
  const [accessOptions, setAccessOptions] = useState(["User Management", "Employee Management"]);

  const remainingOptions = useMemo(
    () => ALL_ACCESS.filter((o) => !accessOptions.includes(o)),
    [accessOptions]
  );

  const dropdownLabel = accessOptions.length
    ? `${accessOptions.length} selected`
    : "Select Option";

  function toggleAccess(option, checked) {
    if (checked) {
      if (!accessOptions.includes(option)) setAccessOptions((s) => [...s, option]);
    } else {
      setAccessOptions((s) => s.filter((o) => o !== option));
    }
  }

  function removeAccess(option) {
    setAccessOptions((s) => s.filter((o) => o !== option));
  }

  function handleAddRole() {
    if (!roleName.trim() || accessOptions.length === 0) return;
    setRoles((r) => [...r, { name: roleName.trim(), access: [...accessOptions] }]);
    setRoleName("");
    setAccessOptions([]);
  }

  return (
    <div className={styles.pageBg}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>You can define role with access rights here</h2>
        <p className={styles.subheading}>Please define the roles for your employees</p>

        <div className={styles.definedBox}>
          <div className={styles.definedRolesLabel}>
            {"You've defined " + roles.length + " roles:"}
          </div>
          {roles.map((role, idx) => (
            <div key={idx} className={styles.roleRow}>
              <span className={styles.roleName}>{role.name}:</span>
              <span className={styles.roleAccessList}>
                {role.access.map((a) => (
                  <span key={a} className={styles.accessTag}>
                    {a}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.formRow}>
          {/* Role name */}
          <div className={styles.inputCol}>
            <label className={styles.label}>Name of the role</label>
            <Input
              className={styles.control}
              value={roleName}
              placeholder="Enter Role Name"
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>

          {/* Access multi-select */}
          <div className={styles.inputCol}>
            <label className={styles.label}>Access of the role</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  className={`${styles.control} ${styles.dropdownBtn}`}
                  aria-haspopup="listbox"
                >
                  {dropdownLabel}
                  <ChevronDown className={styles.chevronIcon} />
                </Button>
              </DropdownMenuTrigger>

              {/* Let Radix portal/position it; no manual absolute CSS */}
              <DropdownMenuContent
                className={styles.dropdownMenu}
                align="start"
                side="bottom"
                sideOffset={6}
              >
                <DropdownMenuLabel className={styles.dropdownSectionLabel}>
                  Select access
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {ALL_ACCESS.map((opt) => (
                  <DropdownMenuCheckboxItem
                    key={opt}
                    checked={accessOptions.includes(opt)}
                    onCheckedChange={(checked) => toggleAccess(opt, checked)}
                    className={styles.dropdownMenuItem}
                  >
                    {opt}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Selected chips */}
            <div className={styles.selectedAccessTags}>
              {accessOptions.map((opt) => (
                <span key={opt} className={styles.chip}>
                  {opt}
                  <button
                    type="button"
                    aria-label={`Remove ${opt}`}
                    className={styles.chipRemove}
                    onClick={() => removeAccess(opt)}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Add role button */}
          <div className={styles.plusCol}>
            <button
              className={styles.plusBtn}
              type="button"
              onClick={handleAddRole}
              disabled={!roleName.trim() || accessOptions.length === 0}
              aria-label="Add role"
            >
              <Plus className={styles.plusIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
