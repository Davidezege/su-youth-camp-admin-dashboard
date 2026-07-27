import { useState } from "react";
import styles from "./ExportToExcelButton.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const EXPORT_TO_EXCEL_ENDPOINT = import.meta.env.VITE_EXPORT_TO_EXCEL_ENDPOINT || '';

/**
 * ExportToExcelButton component
 *
 * Triggers a fetch request to the server to download/export Excel data.
 * You can pass the endpoint route via the `endpoint` prop.
 */
export default function ExportToExcelButton({
  endpoint = "/api/export-excel", // Replace or override with your server route
  fetchOptions = { method: "GET" },
  fileName = "export.xlsx",
  buttonText = "Export to Excel",
  onSuccess,
  onError,
  className = "",
  disabled = false,
  ...restProps
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async (e) => {
    if (disabled || isLoading) return;

    setIsLoading(true);

    try {
      // Send fetch request to the server route
      const response = await fetch(`${API_BASE_URL}${EXPORT_TO_EXCEL_ENDPOINT}`);

      if (!response.ok) {
        throw new Error(
          `Failed to export: ${response.status} ${response.statusText}`,
        );
      }

      // Handle binary blob response if server returns a file
      const blob = await response.blob();
      if (blob && blob.size > 0) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err) {
      console.error("Error fetching export from server:", err);
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.exportButton} ${isLoading ? styles.loading : ""} ${className}`}
      onClick={handleExport}
      disabled={disabled || isLoading}
      aria-label={buttonText}
      {...restProps}
    >
      {isLoading ? (
        <svg
          className={styles.spinner}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-2.64-6.36" />
          <polyline points="21 3 21 9 15 9" />
        </svg>
      ) : (
        <svg
          className={styles.icon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* File Excel icon */}
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M8 13l3 3 3-3" />
          <path d="M12 10v6" />
        </svg>
      )}
      <span>{isLoading ? "Exporting..." : buttonText}</span>
    </button>
  );
}
