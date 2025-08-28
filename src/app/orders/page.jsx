"use client";
import { useState } from "react";
import { Search, ChevronDown, ArrowUpDown, Eye, User } from "lucide-react";
import styles from "./orders.module.css";
import { ordersDemoData } from "./orderDemoData";

const statusMap = {
  Pending: { color: "#FFB300", bg: "#FFF8E1" },
  Delivered: { color: "#4CAF50", bg: "#E8F5E9" },
  Shipped: { color: "#2196F3", bg: "#E3F2FD" },
  Cancelled: { color: "#F44336", bg: "#FEECEC" },
};

const columns = [
  { key: "buyer", label: "Buyer Name", sortable: true },
  { key: "orderId", label: "Order ID" },
  { key: "product", label: "Product(s)" },
  { key: "qty", label: "Qty" },
  { key: "orderDate", label: "Order Date", sortable: true },
  { key: "total", label: "Total", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "actions", label: "" }
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [perPage, setPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, asc: true });

  let filteredOrders = ordersDemoData.filter(order =>
    order.buyer.name.toLowerCase().includes(search.toLowerCase())
    || order.product.toLowerCase().includes(search.toLowerCase())
    || order.orderId.toLowerCase().includes(search.toLowerCase())
    || order.status.toLowerCase().includes(search.toLowerCase())
  );
  if (orderStatus) {
    filteredOrders = filteredOrders.filter(order => order.status === orderStatus);
  }
  // Sorting
  if (sort.key) {
    filteredOrders = [...filteredOrders].sort((a, b) => {
      let av = a[sort.key], bv = b[sort.key];
      if (sort.key === "buyer") {
        av = a.buyer.name;
        bv = b.buyer.name;
      }
      if (typeof av === "number" && typeof bv === "number") return sort.asc ? av - bv : bv - av;
      return sort.asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }
  // Pagination
  const totalRows = 333;
  const pageCount = Math.ceil(totalRows / perPage);

  // Export CSV
  const handleExport = () => {
    const headers = columns.filter(c => c.key !== "actions").map(c => c.label);
    const rows = filteredOrders.map(order => [
      order.buyer.name,
      order.orderId,
      order.product,
      order.qty,
      order.orderDate,
      order.total,
      order.status
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSort = key => setSort(prev => ({
    key,
    asc: prev.key === key ? !prev.asc : true,
  }));

  return (
    <div className={styles.page}>
      {/* --- Top Bar Section --- */}
      <div className={styles.topBar}>
        <h1 className={styles.title}>Your Orders</h1>
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
            <select className={styles.filterSelect} value={orderStatus} onChange={e => setOrderStatus(e.target.value)}>
              <option value="">Order Status</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <button className={styles.exportBtn} onClick={handleExport}>Export CSV</button>
        </div>
      </div>
      {/* --- End Top Bar Section --- */}

      {/* Table and Pagination remain unchanged below */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className={styles.th}>
                  <div className={styles.thContent} onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                    {col.label}
                    {col.sortable && <ArrowUpDown size={14} className={styles.thSortIcon + " " + (sort.key === col.key ? styles.thSortActive : "")} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <tr key={order.id + idx} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>
                      <User />
                    </div>
                    <span>{order.buyer.name}</span>
                  </div>
                </td>
                <td className={styles.td}>{order.orderId}</td>
                <td className={styles.td}>{order.product}</td>
                <td className={styles.td}>{order.qty}</td>
                <td className={styles.td}>{order.orderDate}</td>
                <td className={styles.td}>{order.total}</td>
                <td className={styles.td}>
                  <span className={styles.statusBadge} style={{
                    color: statusMap[order.status].color,
                    background: statusMap[order.status].bg
                  }}>
                    <span className={styles.statusDot} style={{ background: statusMap[order.status].color }}/>
                    {order.status}
                  </span>
                </td>
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
            <select className={styles.pageSizeSelect} value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}>
              {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <ChevronDown size={14} className={styles.pageSizeIcon} />
          </div>
          <span>Showing {Math.min((page-1)*perPage+1, totalRows)}-{Math.min(page*perPage, totalRows)} of {totalRows}</span>
        </div>
        <div className={styles.paginationBtns}>
          <button className={styles.pageBtn} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>{"<"}</button>
          {/* First page */}
          <button className={page === 1 ? styles.pageBtnActive : styles.pageBtn} onClick={() => setPage(1)}>1</button>
          {page > 3 && <span className={styles.pageEllipsis}>...</span>}
          {Array.from({ length: 3 }).map((_, i) => {
            const p = page + i - 1;
            if (p <= 1 || p >= pageCount) return null;
            return (
              <button key={p} className={page === p ? styles.pageBtnActive : styles.pageBtn} onClick={() => setPage(p)}>
                {p}
              </button>
            );
          })}
          {page < pageCount - 2 && <span className={styles.pageEllipsis}>...</span>}
          {pageCount > 1 && (
            <button className={page === pageCount ? styles.pageBtnActive : styles.pageBtn} onClick={() => setPage(pageCount)}>{pageCount}</button>
          )}
          <button className={styles.pageBtn} onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount}>{">"}</button>
        </div>
      </div>
    </div>
  );
}