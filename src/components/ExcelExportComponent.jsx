import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExcelExportComponent({ data }) {
  console.log("data", data);
  const flattenData = (data) => {
    console.log("data", data);
    return data.map((item) => ({
      id: item.id,
      personName: item.personName,
      location: item.location,
      subject: item.subject,
      interest: item.interest,
      lastBookRead: item.lastBookRead,
      Email: item.contact.email,
      Phone: item.contact.phone,
    }));
  };
  const exportToExcel = () => {
    const flattenedData = flattenData(data);

    if (!Array.isArray(flattenedData)) {
      console.error("Data is not an array.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "exportedData.xlsx");
  };

  return (
    <div className="py-5 flex justify-center lg:block">
      <button
        onClick={exportToExcel}
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Export as Excel
      </button>
    </div>
  );
}

export default ExcelExportComponent;
