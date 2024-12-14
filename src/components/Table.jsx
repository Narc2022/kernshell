import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import data from "../api/data.json";
import ExcelExportComponent from "./ExcelExportComponent";
const Table = () => {
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentPageData = data.slice(indexOfFirstItem, indexOfLastItem);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      omit: hiddenColumns.includes("ID"),
    },
    {
      name: "Person Name",
      selector: (row) => row.personName,
      omit: hiddenColumns.includes("Person Name"),
    },
    {
      name: "Location",
      selector: (row) => row.location,
      omit: hiddenColumns.includes("Location"),
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      omit: hiddenColumns.includes("Subject"),
    },
    {
      name: "Interest",
      selector: (row) => row.interest,
      omit: hiddenColumns.includes("Interest"),
    },
    {
      name: "Last Book Read",
      selector: (row) => row.lastBookRead,
      omit: hiddenColumns.includes("Last Book Read"),
    },
    {
      name: "Contact",
      selector: (row) => (
        <div>
          <div>{row.contact.email}</div>
          <div>{row.contact.phone}</div>
        </div>
      ),
      omit: hiddenColumns.includes("Contact"),
    },
  ];

  const handleToggleColumn = (columnName) => {
    setHiddenColumns((prev) =>
      prev.includes(columnName)
        ? prev.filter((col) => col !== columnName)
        : [...prev, columnName]
    );
  };
  const paginationOptions = {
    rowsPerPage: perPage,
    onChangeRowsPerPage: (newPerPage) => setPerPage(newPerPage),
    rowsPerPageText: "Rows per page",
    rangeSeparatorText: "of",
    noRowsPerPage: false,
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("Current page:", page);
  };

  useEffect(() => {
    console.log("currentPageData", currentPageData);
  }, [currentPageData]);
  return (
    <div>
      <ExcelExportComponent data={currentPageData} />
      <div>
        <h3>Toggle Columns</h3>
        {columns.map((col) => (
          <label key={col.name} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={!hiddenColumns.includes(col.name)}
              onChange={() => handleToggleColumn(col.name)}
            />
            {col.name}
          </label>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={[10, 25, 50]}
        paginationComponentOptions={paginationOptions}
        onChangePage={handlePageChange}
        highlightOnHover
      />
    </div>
  );
};

export default Table;
