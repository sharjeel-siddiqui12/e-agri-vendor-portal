"use client";
import { useState } from "react";
import { Search, ChevronDown, Eye, ArrowUpDown, TrendingUp } from "lucide-react";
import styles from "./demand.module.css";

// Demo data for table
const demandDemoData = Array.from({ length: 25 }).map((_, i) => ({
  productName: "DAP Fertilizer",
  category: "Fertilizer",
  projectedOrders: "12,000",
  demandGrowth: "+28%",
  peakRegions: "Punjab, Sindh",
  forecastWindow: "Aug 1–20",
}));

const columns = [
  { key: "productName", label: "Product Name", sortable: true },
  { key: "category", label: "Category" },
  { key: "projectedOrders", label: "Projected Orders" },
  { key: "demandGrowth", label: "Demand Growth" },
  { key: "peakRegions", label: "Peak Region(s)", sortable: true },
  { key: "forecastWindow", label: "Forecast Window", sortable: true },
  { key: "actions", label: "" }
];

export default function DemandIntelligencePage() {
  const [search, setSearch] = useState("");
  const [cropSeason, setCropSeason] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [perPage, setPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, asc: true });

  // Filter and sort logic
  let filteredData = demandDemoData.filter(row =>
    row.productName.toLowerCase().includes(search.toLowerCase())
    || row.category.toLowerCase().includes(search.toLowerCase())
    || row.projectedOrders.includes(search)
    || row.demandGrowth.includes(search)
    || row.peakRegions.toLowerCase().includes(search.toLowerCase())
    || row.forecastWindow.toLowerCase().includes(search.toLowerCase())
  );
  if (cropSeason) filteredData = filteredData.filter(r => r.forecastWindow === cropSeason);
  if (region) filteredData = filteredData.filter(r => r.peakRegions.includes(region));
  if (category) filteredData = filteredData.filter(r => r.category === category);
  if (timeframe) filteredData = filteredData.filter(r => r.forecastWindow === timeframe);

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
        <h1 className={styles.title}>Demand Intelligence</h1>
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
            <select className={styles.filterSelect} value={cropSeason} onChange={e => setCropSeason(e.target.value)}>
              <option value="">Crop Season</option>
              <option value="Aug 1–20">Aug 1–20</option>
              <option value="Sep 1–20">Sep 1–20</option>
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
              <option value="">Product Category</option>
              <option value="Fertilizer">Fertilizer</option>
              <option value="Pesticide">Pesticide</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={timeframe} onChange={e => setTimeframe(e.target.value)}>
              <option value="">Timeframe</option>
              <option value="Aug 1–20">Aug 1–20</option>
              <option value="Sep 1–20">Sep 1–20</option>
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
              <tr key={row.productName + row.forecastWindow + idx} className={styles.tr}>
                <td className={styles.td}>{row.productName}</td>
                <td className={styles.td}>{row.category}</td>
                <td className={styles.td}>{row.projectedOrders}</td>
                <td className={styles.td}>
                  <span className={styles.demandBadge}>
                    <span className={styles.demandArrow}><TrendingUp size={18} /></span>
                    {row.demandGrowth}
                  </span>
                </td>
                <td className={styles.td}>{row.peakRegions}</td>
                <td className={styles.td}>{row.forecastWindow}</td>
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