import React from "react";

const Category = ({ category, categoryCount }) => {
  return (
    <div>
      <h3 className="text-gray-700 text-2xl font-medium block mt-16">
        Categories
      </h3>
      <span className="mt-3 text-sm text-gray-500">{categoryCount}</span>
    </div>
  );
};

export default Category;
