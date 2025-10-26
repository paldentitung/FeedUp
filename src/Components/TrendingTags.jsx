import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const TrendingTags = () => {
  const { theme } = useContext(AppContext);
  const trendingTags = [
    "#Tihar",
    "#Nepal",
    "#Pokhara",
    "#Music",
    "#NepaliCulture",
  ];

  return (
    <div className={`p-2 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
      <h3
        className={`text-lg font-bold mb-3 p-2 ${
          theme === "light" ? "text-gray-900" : "text-gray-100"
        }`}
      >
        Trending Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {trendingTags.map((tag, index) => (
          <Link
            key={index}
            to={`/hashtag/${tag.replace("#", "")}`}
            className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-200 ${
              theme === "light"
                ? "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600 active:text-blue-600"
                : "bg-gray-700 text-gray-300 hover:bg-blue-900/30 hover:text-blue-400 active:text-blue-400"
            }`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingTags;
