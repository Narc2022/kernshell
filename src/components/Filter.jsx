import React from "react";

const Filter = ({ columns, hiddenColumns, handleToggleColumn }) => {
  return (
    <div className="flex flex-wrap gap-2 lg:flex-col space-y-2 pl-2">
      {columns.map((col) => (
        <label key={col.name} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={!hiddenColumns.includes(col.name)}
            onChange={() => handleToggleColumn(col.name)}
            className="h-4 w-4"
          />
          <span className="text-sm">{col.name}</span>
        </label>
      ))}
    </div>
  );
};

export default Filter;
