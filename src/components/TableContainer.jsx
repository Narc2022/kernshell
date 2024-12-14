import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import data from "../api/data.json";
import ExcelExportComponent from "./ExcelExportComponent";
import Filter from "./Filter";
const TableContainer = () => {
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
    <div className="h-auto lg:h-[100vh] block md:block lg:flex">
      <div className="p-5 bg-black text-white lg:w-[250px] ">
        <h1 className="text-4xl font-bold text-white-500 text-center p-3 block lg:hidden">
          kernshell dashboard
        </h1>
        <ExcelExportComponent data={currentPageData} />
        <Filter
          columns={columns}
          hiddenColumns={hiddenColumns}
          handleToggleColumn={handleToggleColumn}
        />
      </div>
      <div className="w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center p-3 hidden lg:block">
          kernshell dashboard
        </h1>
        <div style={{ maxHeight: "90vh", overflowY: "auto" }}>
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
      </div>
    </div>
  );
};

export default TableContainer;
