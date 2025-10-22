import { Link } from "react-router-dom";
const TrendingTags = () => {
  const trendingTags = [
    "#Tihar",
    "#Nepal",
    "#Pokhara",
    "#Music",
    "#NepaliCulture",
  ];

  return (
    <div>
      <h3 className="text-lg font-bold mb-3 p-2">Trending Tags</h3>
      <div className="flex flex-wrap gap-2">
        {trendingTags.map((tag, index) => (
          <Link
            key={index}
            to={`/hashtag/${tag.replace("#", "")}`}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 active:text-blue-600"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingTags;
