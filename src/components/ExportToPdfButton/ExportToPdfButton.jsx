import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TABLE_COLUMNS } from '../../constants/tableColumns';
import styles from './ExportToPdfButton.module.css';

/**
 * ExportToPdfButton component
 *
 * Exports dashboard or payload data into PDF format using jsPDF and jspdf-autotable.
 */
export default function ExportToPdfButton({
  data,
  columns = TABLE_COLUMNS,
  summaryData,
  fileName = 'pilgrim-records-report.pdf',
  title = 'Pilgrim Records Report',
  buttonText = 'Export to PDF',
  endpoint,
  onSuccess,
  onError,
  className = '',
  disabled = false,
  orientation = 'landscape',
  ...restProps
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);

    try {
      let exportData = data;

      if (!exportData && endpoint) {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for PDF: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        exportData = Array.isArray(json) ? json : json.data || json.records || [];
      }

      if (!exportData || !Array.isArray(exportData)) {
        throw new Error('No valid data available to export.');
      }

      const doc = new jsPDF({
        orientation,
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Header Banner
      doc.setFillColor(15, 122, 78);
      doc.rect(0, 0, pageWidth, 22, 'F');

      // Header Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 14, 14);

      // Meta Info
      const timestamp = new Date().toLocaleString();
      doc.setTextColor(92, 114, 104);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated: ${timestamp}   |   Total Records: ${exportData.length}`, 14, 29);

      // Prepare Table
      const tableHead = [columns.map((col) => col.label)];
      const tableBody = exportData.map((record) =>
        columns.map((col) => {
          const val = record[col.key];
          if (val === null || val === undefined || val === '') return '-';
          if (Array.isArray(val)) return val.join(', ');
          return String(val);
        })
      );

      autoTable(doc, {
        startY: 33,
        head: tableHead,
        body: tableBody,
        theme: 'striped',
        headStyles: {
          fillColor: [15, 122, 78],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9,
          halign: 'left',
        },
        bodyStyles: {
          fontSize: 8.5,
          textColor: [14, 43, 32],
          valign: 'middle',
        },
        alternateRowStyles: {
          fillColor: [238, 246, 241],
        },
        styles: {
          cellPadding: 2.5,
          overflow: 'linebreak',
          lineColor: [217, 233, 223],
          lineWidth: 0.1,
        },
        margin: { top: 33, bottom: 18, left: 14, right: 14 },
      });

      if (summaryData && Array.isArray(summaryData) && summaryData.length > 0) {
        const lastY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 33;
        let summaryStartY = lastY + 10;

        if (summaryStartY + 45 > pageHeight) {
          doc.addPage();
          summaryStartY = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 122, 78);
        doc.text('Category Breakdown Summary', 14, summaryStartY);

        autoTable(doc, {
          startY: summaryStartY + 4,
          head: [['Category', 'Total Records', 'Male', 'Female']],
          body: summaryData.map((item) => [
            item.category || '-',
            String(item.total ?? 0),
            String(item.male ?? 0),
            String(item.female ?? 0),
          ]),
          theme: 'grid',
          headStyles: {
            fillColor: [47, 190, 139],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 8.5,
          },
          bodyStyles: {
            fontSize: 8,
            textColor: [14, 43, 32],
          },
          margin: { bottom: 18, left: 14, right: 14 },
        });
      }

      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.setFont('helvetica', 'normal');
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - 14, pageHeight - 8, { align: 'right' });
        doc.text('Pilgrim Records Management System', 14, pageHeight - 8);
      }

      doc.save(fileName);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error exporting to PDF:', err);
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
      className={`${styles.exportPdfButton} ${isLoading ? styles.loading : ''} ${className}`}
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15h6" />
          <path d="M9 11h6" />
          <path d="M9 19h3" />
        </svg>
      )}
      <span>{isLoading ? 'Generating PDF...' : buttonText}</span>
    </button>
  );
}
