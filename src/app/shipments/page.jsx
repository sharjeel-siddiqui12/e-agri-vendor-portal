"use client";
import { useState } from "react";
import { Search, ChevronDown, Eye, ArrowUpDown } from "lucide-react";
import styles from "./shipments.module.css";

// Demo data for table
const shipmentDemoData = Array.from({ length: 25 }).map((_, i) => ({
  id: `SHP-02034`,
  orderId: `ORD-2033`,
  courier: i % 2 === 0 ? "TCS" : "Leopards",
  trackingId: "TRK-5565-9871",
  shipDate: "12 July 2025",
  status: ["Pending", "Delivered", "Failed", "Dispatched"][i % 4],
}));

const statusMap = {
  Pending: { color: "#FFB300", bg: "#FFF8E1" },
  Delivered: { color: "#4CAF50", bg: "#E8F5E9" },
  Failed: { color: "#F44336", bg: "#FEECEC" },
  Dispatched: { color: "#2196F3", bg: "#E3F2FD" },
};

const columns = [
  { key: "id", label: "Shipment ID", sortable: true },
  { key: "orderId", label: "Order ID" },
  { key: "courier", label: "Courier" },
  { key: "trackingId", label: "Tracking ID" },
  { key: "shipDate", label: "Ship Date", sortable: true },
  { key: "status", label: "Delivery Status", sortable: true },
  { key: "actions", label: "" }
];

export default function YourShipmentsPage() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [courier, setCourier] = useState("");
  const [shipmentStatus, setShipmentStatus] = useState("");
  const [perPage, setPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, asc: true });

  // Filter and sort logic
  let filteredShipments = shipmentDemoData.filter(shipment =>
    shipment.id.toLowerCase().includes(search.toLowerCase())
    || shipment.orderId.toLowerCase().includes(search.toLowerCase())
    || shipment.courier.toLowerCase().includes(search.toLowerCase())
    || shipment.trackingId.toLowerCase().includes(search.toLowerCase())
    || shipment.status.toLowerCase().includes(search.toLowerCase())
  );
  if (courier) filteredShipments = filteredShipments.filter(s => s.courier === courier);
  if (shipmentStatus) filteredShipments = filteredShipments.filter(s => s.status === shipmentStatus);

  // Sorting
  if (sort.key) {
    filteredShipments = [...filteredShipments].sort((a, b) => {
      let av = a[sort.key], bv = b[sort.key];
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
        <h1 className={styles.title}>Your Shipments</h1>
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
            <select className={styles.filterSelect} value={courier} onChange={e => setCourier(e.target.value)}>
              <option value="">Courier Partner</option>
              <option value="TCS">TCS</option>
              <option value="Leopards">Leopards</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={shipmentStatus} onChange={e => setShipmentStatus(e.target.value)}>
              <option value="">Shipment Status</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Failed">Failed</option>
              <option value="Dispatched">Dispatched</option>
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
            {filteredShipments.map((shipment, idx) => (
              <tr key={shipment.id + shipment.courier + idx} className={styles.tr}>
                <td className={styles.td}>{shipment.id}</td>
                <td className={styles.td}>{shipment.orderId}</td>
                <td className={styles.td}>{shipment.courier}</td>
                <td className={styles.td}>{shipment.trackingId}</td>
                <td className={styles.td}>{shipment.shipDate}</td>
                <td className={styles.td}>
                  <span
                    className={styles.statusBadge}
                    style={{
                      color: statusMap[shipment.status].color,
                      background: statusMap[shipment.status].bg
                    }}>
                    <span
                      className={styles.statusDot}
                      style={{ background: statusMap[shipment.status].color }}
                    />
                    {shipment.status}
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