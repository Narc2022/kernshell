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
      Email: item.contact.email, // Flattened email
      Phone: item.contact.phone, // Flattened phone
    }));
  };
  const exportToExcel = () => {
    // Flatten the data before passing it to json_to_sheet
    const flattenedData = flattenData(data);

    // Ensure flattenedData is an array
    if (!Array.isArray(flattenedData)) {
      console.error("Data is not an array.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
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
    <div className="App">
      <button onClick={exportToExcel}>Export as Excel</button>
    </div>
  );
}

export default ExcelExportComponent;
