"use client";
import { useState } from "react";
import { Search, ChevronDown, Eye, ArrowUpDown } from "lucide-react";
import styles from "./customers.module.css";

// Demo avatars for Farmer Name
const avatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/men/14.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/men/54.jpg",
  "https://randomuser.me/api/portraits/men/76.jpg",
  "https://randomuser.me/api/portraits/men/65.jpg",
  "https://randomuser.me/api/portraits/men/77.jpg",
  "https://randomuser.me/api/portraits/men/13.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
];

const customerDemoData = Array.from({ length: 25 }).map((_, i) => ({
  name: "Ali Raza",
  avatar: avatars[i % avatars.length],
  region: i % 2 === 0 ? "South Punjab" : "KP",
  phone: "0312-1234567",
  orders: [12, 10, 9, 8, 12, 10, 5, 12, 12][i % 9],
  lastOrder: "12 July 2025",
  totalSpend: "PKR 127,000",
}));

const columns = [
  { key: "name", label: "Farmer Name", sortable: true },
  { key: "region", label: "Region" },
  { key: "phone", label: "Phone" },
  { key: "orders", label: "Orders" },
  { key: "lastOrder", label: "Last Order", sortable: true },
  { key: "totalSpend", label: "Total Spend", sortable: true },
  { key: "actions", label: "" },
];

export default function YourCustomersPage() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [perPage, setPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, asc: true });

  // Filter and sort logic
  let filteredCustomers = customerDemoData.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase())
    || customer.region.toLowerCase().includes(search.toLowerCase())
    || customer.phone.toLowerCase().includes(search.toLowerCase())
    || customer.totalSpend.toLowerCase().includes(search.toLowerCase())
  );
  if (customerType) filteredCustomers = filteredCustomers.filter(c => c.region === customerType);

  // Sorting
  if (sort.key) {
    filteredCustomers = [...filteredCustomers].sort((a, b) => {
      let av = a[sort.key], bv = b[sort.key];
      if (sort.key === "name") {
        av = a.name;
        bv = b.name;
      }
      if (typeof av === "number" && typeof bv === "number") return sort.asc ? av - bv : bv - av;
      return sort.asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }

  // Pagination
  const totalRows = 333;
  const pageCount = Math.ceil(totalRows / perPage);

  const handleSort = key => setSort(prev => ({
    key,
    asc: prev.key === key ? !prev.asc : true,
  }));

  return (
    <div className={styles.page}>
      {/* Top Section */}
      <div className={styles.topBar}>
        <h1 className={styles.title}>Your Customers</h1>
        <div className={styles.topControls}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={dateRange} onChange={e => setDateRange(e.target.value)}>
              <option value="">Date Range</option>
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="custom">Custom Range</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={customerType} onChange={e => setCustomerType(e.target.value)}>
              <option value="">Customer Type</option>
              <option value="South Punjab">South Punjab</option>
              <option value="KP">KP</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
        </div>
      </div>
      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className={styles.th}>
                  <div
                    className={styles.thContent}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    {col.label}
                    {col.sortable && (
                      <ArrowUpDown
                        size={14}
                        className={styles.thSortIcon + " " + (sort.key === col.key ? styles.thSortActive : "")}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, idx) => (
              <tr key={customer.name + customer.region + idx} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>
                      <img src={customer.avatar} alt={customer.name} />
                    </div>
                    <span>{customer.name}</span>
                  </div>
                </td>
                <td className={styles.td}>{customer.region}</td>
                <td className={styles.td}>{customer.phone}</td>
                <td className={styles.td}>{customer.orders}</td>
                <td className={styles.td}>{customer.lastOrder}</td>
                <td className={styles.td}>{customer.totalSpend}</td>
                <td className={styles.td + " " + styles.actionsTd}>
                  <button className={styles.viewBtn}><Eye size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className={styles.paginationRow}>
        <div className={styles.paginationLeft}>
          <span>Show</span>
          <div className={styles.pageSizeWrap}>
            <select
              className={styles.pageSizeSelect}
              value={perPage}
              onChange={e => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}>
              {[10, 25, 50, 100].map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.pageSizeIcon} />
          </div>
          <span>
            Showing {Math.min((page - 1) * perPage + 1, totalRows)}-
            {Math.min(page * perPage, totalRows)} of {totalRows}
          </span>
        </div>
        <div className={styles.paginationBtns}>
          <button className={styles.pageBtn} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            {"<"}
          </button>
          {/* First page */}
          <button className={page === 1 ? styles.pageBtnActive : styles.pageBtn} onClick={() => setPage(1)}>
            1
          </button>
          {page > 3 && <span className={styles.pageEllipsis}>...</span>}
          {Array.from({ length: 3 }).map((_, i) => {
            const p = page + i - 1;
            if (p <= 1 || p >= pageCount) return null;
            return (
              <button
                key={p}
                className={page === p ? styles.pageBtnActive : styles.pageBtn}
                onClick={() => setPage(p)}>
                {p}
              </button>
            );
          })}
          {page < pageCount - 2 && <span className={styles.pageEllipsis}>...</span>}
          {pageCount > 1 && (
            <button
              className={page === pageCount ? styles.pageBtnActive : styles.pageBtn}
              onClick={() => setPage(pageCount)}>
              {pageCount}
            </button>
          )}
          <button className={styles.pageBtn} onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}