"use client";
import { useState } from "react";
import { Search, ChevronDown, Eye, ArrowUpDown, Star } from "lucide-react";
import styles from "./feedback.module.css";

// Demo data for table
const feedbackDemoData = Array.from({ length: 25 }).map(() => ({
  rating: 3,
  product: "DAP Fertilizer",
  feedback: "“Didn't work well for my soil.”",
  buyer: "Usman Khan",
  region: "Sindh",
  date: "12 July",
  status: "Not Replied",
}));

const columns = [
  { key: "rating", label: "Rating", sortable: true },
  { key: "product", label: "Product" },
  { key: "feedback", label: "Feedback" },
  { key: "buyer", label: "Buyer" },
  { key: "region", label: "Region", sortable: true },
  { key: "date", label: "Date", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "actions", label: "" }
];

export default function FeedbackReviewsPage() {
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [product, setProduct] = useState("");
  const [region, setRegion] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [perPage, setPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, asc: true });

  // Filter and sort logic
  let filteredFeedbacks = feedbackDemoData.filter(fb =>
    String(fb.rating).includes(search)
    || fb.product.toLowerCase().includes(search.toLowerCase())
    || fb.feedback.toLowerCase().includes(search.toLowerCase())
    || fb.buyer.toLowerCase().includes(search.toLowerCase())
    || fb.region.toLowerCase().includes(search.toLowerCase())
    || fb.status.toLowerCase().includes(search.toLowerCase())
  );
  if (rating) filteredFeedbacks = filteredFeedbacks.filter(fb => String(fb.rating) === rating);
  if (product) filteredFeedbacks = filteredFeedbacks.filter(fb => fb.product === product);
  if (region) filteredFeedbacks = filteredFeedbacks.filter(fb => fb.region === region);
  if (responseStatus) filteredFeedbacks = filteredFeedbacks.filter(fb => fb.status === responseStatus);

  // Sorting
  if (sort.key) {
    filteredFeedbacks = [...filteredFeedbacks].sort((a, b) => {
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

  // Utility to render stars
  function renderStars(count) {
    return (
      <span className={styles.stars}>
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            size={18}
            fill={i <= count ? "#FFD600" : "none"}
            stroke="#FFD600"
            style={{ marginRight: 2, verticalAlign: "middle" }}
          />
        ))}
      </span>
    );
  }

  return (
    <div className={styles.page}>
      {/* Top Section */}
      <div className={styles.topBar}>
        <h1 className={styles.title}>Feedback &amp; Reviews</h1>
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
            <select className={styles.filterSelect} value={rating} onChange={e => setRating(e.target.value)}>
              <option value="">Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={product} onChange={e => setProduct(e.target.value)}>
              <option value="">Product</option>
              <option value="DAP Fertilizer">DAP Fertilizer</option>
              <option value="Urea">Urea</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={region} onChange={e => setRegion(e.target.value)}>
              <option value="">Region</option>
              <option value="Sindh">Sindh</option>
              <option value="Punjab">Punjab</option>
              <option value="KP">KP</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={dateRange} onChange={e => setDateRange(e.target.value)}>
              <option value="">Date range</option>
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={responseStatus} onChange={e => setResponseStatus(e.target.value)}>
              <option value="">Response status</option>
              <option value="Not Replied">Not Replied</option>
              <option value="Replied">Replied</option>
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
            {filteredFeedbacks.map((fb, idx) => (
              <tr key={fb.buyer + fb.product + idx} className={styles.tr}>
                <td className={styles.td}>{renderStars(fb.rating)}</td>
                <td className={styles.td}>{fb.product}</td>
                <td className={styles.td}>{fb.feedback}</td>
                <td className={styles.td}>{fb.buyer}</td>
                <td className={styles.td}>{fb.region}</td>
                <td className={styles.td}>{fb.date}</td>
                <td className={styles.td}>{fb.status}</td>
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