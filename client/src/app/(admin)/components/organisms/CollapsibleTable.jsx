"use client";

import Table from "@mui/material/Table";
import CustomTableRows from "@adminMol/CustomTableRows";
import Typography from "@mui/material/Typography";
import HeaderTableRow from "@adminAto/HeaderTableRow";
import { TableContainer } from "@mui/material";
import { useEffect } from "react";

const CollapsibleTable = ({ tableKey, subDataTitle, data }) => {
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "table-column-styles";

    const css = `
      [data-content] {
        min-width: 120px;
        padding: 12px 16px;
        vertical-align: middle;
        text-align: left;
      }
      
      /* Table header styles */
      thead th {
        font-weight: 600;
        color: #333;
        border-bottom: 2px solid #e5e7eb;
        padding: 12px 16px;
        text-transform: capitalize;
      }
      
      /* Zebra striping for better readability */
      tbody tr:nth-of-type(odd) {
        background-color: rgba(0, 0, 0, 0.02);
      }

      /* Specific column styles */
      [data-content="pictures"], [data-content="childPosts"] {
        min-width: 200px;
        max-width: 300px;
      }
      
      [data-content="content"] {
        min-width: 250px;
        max-width: 350px;
      }
      
      [data-content="title"] {
        min-width: 180px;
        font-weight: 500;
      }
      
      [data-content="email"], [data-content="phone"], [data-content="link"], [data-content="website"] {
        min-width: 150px;
      }
      
      [data-content="createdAt"], [data-content="updatedAt"] {
        min-width: 150px;
        color: #666;
        font-size: 0.9rem;
      }
      
      [data-content="tags"] {
        min-width: 120px;
      }
      
      [data-content="pinned"], [data-content="showInSlider"], [data-content="approved"] {
        min-width: 100px;
        max-width: 120px;
        height: 100%;
        padding: 12px;
      }
      
      /* Style for boolean value containers */
      [data-content="pinned"] > div, 
      [data-content="showInSlider"] > div, 
      [data-content="approved"] > div {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px 12px;
        border-radius: 6px;
        font-weight: 500;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }
      
      /* Style for the table rows to ensure consistent height */
      tr {
        border-bottom: 1px solid #e5e7eb;
        transition: background-color 0.2s ease;
      }
      
      /* Last row shouldn't have a border */
      tr:last-child {
        border-bottom: none;
      }
      
      [data-content="actions"] {
        min-width: 140px;
        max-width: 140px;
      }
    `;

    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // Cleanup function
    return () => {
      const existingStyle = document.getElementById("table-column-styles");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  if (!data || data.length === 0) {
    return (
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        No data available
      </Typography>
    );
  }

  return (
    <TableContainer className="border border-gray-300 rounded-lg shadow-sm">
      <Table stickyHeader>
        <HeaderTableRow data={data[0]} subDataTitle={subDataTitle} />
        <CustomTableRows
          data={data}
          tableKey={tableKey}
          subDataTitle={subDataTitle}
        />
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
