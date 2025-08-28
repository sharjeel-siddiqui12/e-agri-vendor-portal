"use client";
import { useState } from "react";
import { Search, ChevronDown, Eye, ArrowUpDown, Download } from "lucide-react";
import styles from "./support.module.css";

// Demo data for table
const ticketDemoData = Array.from({ length: 22 }).map((_, i) => ({
  id: "#23" + (784 + i),
  subject: i % 2 === 0 ? "Issue in CSV Upload" : "Delay in Payment",
  dateSubmitted: `${13 + (i % 3)} July 2025`,
  status: ["Pending", "Resolved"][i % 2],
  lastUpdate: `${12 + (i % 3)} July 2025`,
}));

const statusMap = {
  Pending: { color: "#FFD36A", bg: "#FFF6E0", text: "#ca8a04" },
  Resolved: { color: "#4AB66A", bg: "#E7F6EB", text: "#207a34" },
};

const columns = [
  { key: "id", label: "Ticket ID", sortable: true },
  { key: "subject", label: "Subject", sortable: false },
  { key: "dateSubmitted", label: "Date Submitted", sortable: false },
  { key: "status", label: "Status", sortable: false },
  { key: "lastUpdate", label: "Last Update", sortable: true },
  { key: "actions", label: "" },
];

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({
    key: null,
    asc: true,
  });

  // Filter and sort logic
  let filteredTickets = ticketDemoData.filter((t) =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase()) ||
    t.dateSubmitted.toLowerCase().includes(search.toLowerCase()) ||
    t.status.toLowerCase().includes(search.toLowerCase()) ||
    t.lastUpdate.toLowerCase().includes(search.toLowerCase())
  );
  if (status) filteredTickets = filteredTickets.filter((t) => t.status === status);

  // Sorting
  if (sort.key) {
    filteredTickets = [...filteredTickets].sort((a, b) => {
      let av = a[sort.key], bv = b[sort.key];
      return sort.asc
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }

  // Pagination
  const totalRows = filteredTickets.length;
  const pageCount = Math.ceil(totalRows / perPage);
  const pagedTickets = filteredTickets.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleSort = (key) =>
    setSort((prev) => ({
      key,
      asc: prev.key === key ? !prev.asc : true,
    }));

  const downloadCSV = () => {
    const csv =
      "Ticket ID,Subject,Date Submitted,Status,Last Update\n" +
      filteredTickets
        .map((t) =>
          [t.id, t.subject, t.dateSubmitted, t.status, t.lastUpdate].join(",")
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tickets.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>Send Feedback or Report Any Issue</h1>
        <div className={styles.topControls}>
          <button className={styles.downloadBtn} onClick={downloadCSV}>
            <Download size={18} style={{ marginRight: 6 }} />
            Download
          </button>
          <button className={styles.createBtn}>Raise New Ticket</button>
        </div>
      </div>
      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={styles.th}>
                  <div
                    className={styles.thContent}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    {col.label}
                    {col.sortable && (
                      <ArrowUpDown
                        size={14}
                        className={
                          styles.thSortIcon +
                          " " +
                          (sort.key === col.key ? styles.thSortActive : "")
                        }
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedTickets.map((t, idx) => (
              <tr key={t.id + t.status + idx} className={styles.tr}>
                <td className={styles.td}>{t.id}</td>
                <td className={styles.td}>{t.subject}</td>
                <td className={styles.td}>{t.dateSubmitted}</td>
                <td className={styles.td}>
                  <span
                    className={styles.statusBadge}
                    style={{
                      background: statusMap[t.status].bg,
                      color: statusMap[t.status].text,
                    }}
                  >
                    <span
                      className={styles.statusDot}
                      style={{ background: statusMap[t.status].color }}
                    />
                    {t.status}
                  </span>
                </td>
                <td className={styles.td}>{t.lastUpdate}</td>
                <td className={styles.td + " " + styles.actionsTd}>
                  <button className={styles.viewBtn}>
                    <Eye size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {pagedTickets.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.td} style={{ textAlign: "center", color: "#888" }}>
                  No tickets found.
                </td>
              </tr>
            )}
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
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              {[10, 25, 50, 100].map((n) => (
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
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            {"<"}
          </button>
          {/* First page */}
          <button
            className={page === 1 ? styles.pageBtnActive : styles.pageBtn}
            onClick={() => setPage(1)}
          >
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
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            );
          })}
          {page < pageCount - 2 && <span className={styles.pageEllipsis}>...</span>}
          {pageCount > 1 && (
            <button
              className={page === pageCount ? styles.pageBtnActive : styles.pageBtn}
              onClick={() => setPage(pageCount)}
            >
              {pageCount}
            </button>
          )}
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}