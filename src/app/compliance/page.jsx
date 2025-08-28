"use client";
import { useState } from "react";
import { Search, ChevronDown, Eye, ArrowUpDown } from "lucide-react";
import styles from "./compliance.module.css";

// Demo data for table
const complianceDemoData = Array.from({ length: 25 }).map((_, i) => ({
  productName: "DAP Fertilizer",
  documentType: "Product Registration",
  fileName: "DAP-CERT-2033.pdf",
  validity: "1 Year",
  expiryDate: "12 Aug 2025",
  status: "Valid",
}));

const columns = [
  { key: "productName", label: "Product Name", sortable: true },
  { key: "documentType", label: "Document Type" },
  { key: "fileName", label: "File Name" },
  { key: "validity", label: "Validity" },
  { key: "expiryDate", label: "Expiry Date", sortable: true },
  { key: "actions", label: "" },
];

export default function CompliancePage() {
  const [search, setSearch] = useState("");
  const [productName, setProductName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [status, setStatus] = useState("");
  const [perPage, setPerPage] = useState(25);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ key: null, asc: true });

  // Filter and sort logic
  let filteredData = complianceDemoData.filter(row =>
    row.productName.toLowerCase().includes(search.toLowerCase())
    || row.documentType.toLowerCase().includes(search.toLowerCase())
    || row.fileName.toLowerCase().includes(search.toLowerCase())
    || row.validity.toLowerCase().includes(search.toLowerCase())
    || row.expiryDate.toLowerCase().includes(search.toLowerCase())
  );
  if (productName) filteredData = filteredData.filter(r => r.productName === productName);
  if (documentType) filteredData = filteredData.filter(r => r.documentType === documentType);
  if (status) filteredData = filteredData.filter(r => r.status === status);

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
        <h1 className={styles.title}>Compliance</h1>
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
            <select className={styles.filterSelect} value={productName} onChange={e => setProductName(e.target.value)}>
              <option value="">Product Name</option>
              <option value="DAP Fertilizer">DAP Fertilizer</option>
              <option value="Urea">Urea</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={documentType} onChange={e => setDocumentType(e.target.value)}>
              <option value="">Document Type</option>
              <option value="Product Registration">Product Registration</option>
              <option value="Lab Report">Lab Report</option>
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
          <div className={styles.filterWrap}>
            <select className={styles.filterSelect} value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">Status</option>
              <option value="Valid">Valid</option>
              <option value="Expired">Expired</option>
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
              <tr key={row.productName + row.fileName + idx} className={styles.tr}>
                <td className={styles.td}>{row.productName}</td>
                <td className={styles.td}>{row.documentType}</td>
                <td className={styles.td}>{row.fileName}</td>
                <td className={styles.td}>{row.validity}</td>
                <td className={styles.td}>{row.expiryDate}</td>
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