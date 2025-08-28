"use client";
import { useState } from "react";
import { Search, ChevronDown, Eye, ArrowUpDown } from "lucide-react";
import styles from "./insights.module.css";

// Demo data for table
const insightsDemoData = Array.from({ length: 25 }).map((_, i) => ({
  productName: "DAP Fertilizer",
  searchVolume: "8,200",
  regions: "Punjab, Sindh",
  category: "Fertilizer",
  last7DaysChange: "+12%",
}));

const columns = [
  { key: "productName", label: "Product Name", sortable: true },
  { key: "searchVolume", label: "Search Volume" },
  { key: "regions", label: "Region(s)" },
  { key: "category", label: "Category" },
  { key: "last7DaysChange", label: "Last 7 Days Change", sortable: true },
  { key: "actions", label: "" }
];

export default function MarketInsightsPage() {
  const [search, setSearch] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [perPage, setPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, asc: true });

  // Filter and sort logic
  let filteredData = insightsDemoData.filter(row =>
    row.productName.toLowerCase().includes(search.toLowerCase())
    || row.searchVolume.includes(search)
    || row.regions.toLowerCase().includes(search.toLowerCase())
    || row.category.toLowerCase().includes(search.toLowerCase())
    || row.last7DaysChange.includes(search)
  );
  if (region) filteredData = filteredData.filter(r => r.regions.includes(region));
  if (category) filteredData = filteredData.filter(r => r.category === category);
  if (timeframe) {
    // For demo, no actual filter, as the data is static.
  }

  // Sorting
  if (sort.key) {
    filteredData = [...filteredData].sort((a, b) => {
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
        <h1 className={styles.title}>Market Insights</h1>
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
            <select className={styles.filterSelect} value={timeframe} onChange={e => setTimeframe(e.target.value)}>
              <option value="">Timeframe</option>
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={region} onChange={e => setRegion(e.target.value)}>
              <option value="">Region</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Category</option>
              <option value="Fertilizer">Fertilizer</option>
              <option value="Pesticide">Pesticide</option>
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
            {filteredData.map((row, idx) => (
              <tr key={row.productName + row.searchVolume + idx} className={styles.tr}>
                <td className={styles.td}>{row.productName}</td>
                <td className={styles.td}>{row.searchVolume}</td>
                <td className={styles.td}>{row.regions}</td>
                <td className={styles.td}>{row.category}</td>
                <td className={styles.td}>
                  <span className={styles.changeBadge}>
                    <span className={styles.changeArrow}>↑</span>
                    {row.last7DaysChange}
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