import React from "react";

const TrendingTags = () => {
  const trendingTags = ["#Travel", "#Food", "#Tech", "#Mood", "#Music"];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 p-2">Trending Tags</h3>
      <div className="flex flex-wrap gap-2">
        {trendingTags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 active:text-blue-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrendingTags;
