"use client";
import { useState } from "react";
import { Search, ChevronDown, Eye, ArrowUpDown } from "lucide-react";
import styles from "./promotions.module.css";

// Demo data for table
const campaignDemoData = Array.from({ length: 25 }).map((_, i) => ({
  campaignName: "Kharif Season Boost",
  type: "Discount",
  products: "Urea, DAP",
  duration: "10–25 July 2025",
  status: ["Completed", "Active", "Expired"][i % 3],
  views: "4,200",
  orders: "370",
}));

const statusMap = {
  Completed: { color: "#FFB300", bg: "#FFF8E1" },
  Active: { color: "#4CAF50", bg: "#E8F5E9" },
  Expired: { color: "#2196F3", bg: "#E3F2FD" },
};

const columns = [
  { key: "campaignName", label: "Campaign Name", sortable: true },
  { key: "type", label: "Type" },
  { key: "products", label: "Product(s)" },
  { key: "duration", label: "Duration" },
  { key: "status", label: "Status", sortable: true },
  { key: "views", label: "Views", sortable: true },
  { key: "orders", label: "Orders", sortable: true },
  { key: "actions", label: "" },
];

export default function PromotionsCampaignsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [perPage, setPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, asc: true });

  // Filter and sort logic
  let filteredCampaigns = campaignDemoData.filter(c =>
    c.campaignName.toLowerCase().includes(search.toLowerCase())
    || c.type.toLowerCase().includes(search.toLowerCase())
    || c.products.toLowerCase().includes(search.toLowerCase())
    || c.duration.toLowerCase().includes(search.toLowerCase())
    || c.status.toLowerCase().includes(search.toLowerCase())
    || c.views.includes(search)
    || c.orders.includes(search)
  );
  if (status) filteredCampaigns = filteredCampaigns.filter(c => c.status === status);
  if (type) filteredCampaigns = filteredCampaigns.filter(c => c.type === type);

  // Sorting
  if (sort.key) {
    filteredCampaigns = [...filteredCampaigns].sort((a, b) => {
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
        <h1 className={styles.title}>Promotions / Campaigns</h1>
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
            <select className={styles.filterSelect} value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">Status</option>
              <option value="Completed">Completed</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={type} onChange={e => setType(e.target.value)}>
              <option value="">Type</option>
              <option value="Discount">Discount</option>
              <option value="Bundle">Bundle</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <button className={styles.createBtn}>Create Campaign</button>
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
            {filteredCampaigns.map((c, idx) => (
              <tr key={c.campaignName + c.status + idx} className={styles.tr}>
                <td className={styles.td}>{c.campaignName}</td>
                <td className={styles.td}>{c.type}</td>
                <td className={styles.td}>{c.products}</td>
                <td className={styles.td}>{c.duration}</td>
                <td className={styles.td}>
                  <span className={styles.statusBadge} style={{
                    color: statusMap[c.status].color,
                    background: statusMap[c.status].bg
                  }}>
                    <span className={styles.statusDot} style={{ background: statusMap[c.status].color }}/>
                    {c.status}
                  </span>
                </td>
                <td className={styles.td}>{c.views}</td>
                <td className={styles.td}>{c.orders}</td>
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