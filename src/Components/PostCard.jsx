import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const PostCard = ({ post, showComment = false }) => {
  const {
    id,
    avatar,
    username,
    timestamp,
    moodTag,
    moodTagColor,
    content,
    images,
    hashtags,
    reactions,
    commentCount,
    comments,
    shares,
    slug,
  } = post;

  // Load initial like state from localStorage
  const savedLikes = JSON.parse(localStorage.getItem("likedPosts")) || {};
  const [isLiked, setIsLiked] = useState(savedLikes[id] || false);
  const [likeCount, setLikeCount] = useState(
    reactions.like + (savedLikes[id] ? 1 : 0)
  );

  // Fix: use 'images' from post, not 'image'
  const showImages = images.length > 4 ? images.slice(0, 4) : images;

  // Handle like toggle and update count
  const handleLike = () => {
    const newLiked = !isLiked;
    const updatedLikes = { ...savedLikes, [id]: newLiked };
    localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
    setIsLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
  };

  // Comment handling
  const [commentList, setCommentList] = useState(
    Array.isArray(comments) ? comments : []
  );
  const [commentUserName, setCommentUserName] = useState("");
  const [commentInput, setCommentInput] = useState("");

  const handleAddComment = () => {
    if (!commentUserName.trim() || !commentInput.trim()) return;
    const newComment = {
      username: commentUserName,
      comment: commentInput,
      timestamp: new Date(),
    };
    setCommentList((prev) => [newComment, ...prev]);
    setCommentUserName("");
    setCommentInput("");
  };

  // Handle share
  const [shareCount, setShareCount] = useState(shares);

  const handleShare = () => {
    const url = `${window.location.origin}/post/${slug}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("Post URL copied to clipboard!");
          setShareCount((prev) => prev + 1);
        })
        .catch((err) => {
          console.error("Clipboard write failed:", err);
          fallbackCopyText(url);
        });
    } else {
      fallbackCopyText(url);
    }
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      alert("Post URL copied to clipboard!");
      setShareCount((prev) => prev + 1);
    } catch (err) {
      console.error("Fallback copy failed:", err);
      alert("Could not copy URL.");
    }
    document.body.removeChild(textArea);
  };

  const { theme } = useContext(AppContext);

  return (
    <section
      className={`shadow-md max-w-full rounded-lg p-3 md:p-6 mb-2 transition-colors duration-300 ${
        theme === "light"
          ? "bg-white text-gray-900"
          : "bg-gray-800 text-gray-100"
      }`}
    >
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img
              src={
                avatar ||
                `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`
              }
              alt={`${username}'s avatar`}
              className={`w-7 h-7 rounded-full object-cover border ${
                theme === "light" ? "border-gray-200" : "border-gray-600"
              }`}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Link to={`/user-profile/${username}`}>
                  <h1 className="font-semibold text-sm">{username}</h1>
                </Link>
                <span
                  className={`text-[12px] px-2 py-1 rounded-full ${moodTagColor}`}
                >
                  {moodTag}
                </span>
              </div>
              <span className="text-[12px] text-gray-400">{timestamp}</span>
            </div>
          </div>
        </div>
        <Link to={`/post/${slug}`}>
          {/* Content */}
          <p
            className={`text-sm max-w-full break-words ${
              theme === "light" ? "text-gray-800" : "text-gray-200"
            }`}
          >
            {content}
          </p>

          {/* Images */}
          {images.length > 0 && (
            <div className="mt-1 grid gap-1 w-full">
              {/* 1 image */}
              {images.length === 1 && (
                <img
                  src={images[0]}
                  alt={`Post ${id} image 1`}
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-md"
                />
              )}

              {/* 2 images */}
              {images.length === 2 && (
                <div className="grid grid-cols-2 gap-1">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Post ${id} image ${idx + 1}`}
                      className="w-full h-36 sm:h-48 md:h-56 lg:h-64 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              {/* 3 images */}
              {images.length === 3 && (
                <div className="grid grid-cols-2 gap-1">
                  <img
                    src={images[0]}
                    alt={`Post ${id} image 1`}
                    className="row-span-2 w-full h-full object-cover rounded-md"
                  />
                  <img
                    src={images[1]}
                    alt={`Post ${id} image 2`}
                    className="w-full h-28 sm:h-32 md:h-40 lg:h-48 object-cover rounded-md"
                  />
                  <img
                    src={images[2]}
                    alt={`Post ${id} image 3`}
                    className="w-full h-28 sm:h-32 md:h-40 lg:h-48 object-cover rounded-md"
                  />
                </div>
              )}

              {/* 4+ images */}
              {images.length >= 4 && (
                <div className="grid grid-cols-2 gap-1">
                  {showImages.map((img, idx, arr) => (
                    <div key={idx} className="relative">
                      <img
                        src={img}
                        alt={`Post ${id} image ${idx + 1}`}
                        className="w-full h-36 sm:h-48 md:h-56 lg:h-64 object-cover rounded-md"
                      />
                      {idx === arr.length - 1 && images.length > 4 && (
                        <div
                          className={`absolute inset-0 flex items-center justify-center font-bold text-2xl rounded-md ${
                            theme === "light"
                              ? "bg-black/50 text-white"
                              : "bg-black/60 text-gray-100"
                          }`}
                        >
                          +{images.length - 4}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Link>
        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {hashtags.map((tag, index) => (
              <Link
                key={index}
                to={`/hashtag/${tag.replace("#", "")}`}
                className={`text-sm hover:underline ${
                  theme === "light" ? "text-blue-500" : "text-blue-400"
                }`}
                aria-label={`Hashtag ${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        {/* Reactions Summary */}
        <div
          className={`flex flex-wrap items-center gap-1.5 text-sm mt-1 ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          <div className="flex gap-1 items-center">
            {likeCount > 0 && <span>👍 {likeCount}</span>}
            {reactions.love > 0 && <span>❤️ {reactions.love}</span>}
            {reactions.wow > 0 && <span>😲 {reactions.wow}</span>}
            {reactions.haha > 0 && <span>😂 {reactions.haha}</span>}
            {reactions.yum > 0 && <span>😋 {reactions.yum}</span>}
            {reactions.question > 0 && <span>❓ {reactions.question}</span>}
            {reactions.clap > 0 && <span>👏 {reactions.clap}</span>}
            {reactions.calm > 0 && <span>🧘 {reactions.calm}</span>}
            {reactions.dance > 0 && <span>🕺 {reactions.dance}</span>}
          </div>
          <span>💬 {commentCount}</span>
          <span>↗️ {shareCount}</span>
        </div>
        {/* Action Buttons */}
        <div
          className={`flex justify-between items-center pt-1 border-t ${
            theme === "light" ? "border-gray-200" : "border-gray-600"
          }`}
        >
          <button
            onClick={handleLike}
            className={`px-1.5 py-0.5 text-sm rounded-md transition-all duration-300 ${
              isLiked
                ? theme === "light"
                  ? "text-blue-500 font-semibold bg-blue-100"
                  : "text-blue-400 font-semibold bg-blue-900/30"
                : theme === "light"
                ? "text-gray-600 hover:text-blue-500 hover:bg-blue-100"
                : "text-gray-400 hover:text-blue-400 hover:bg-blue-900/30"
            }`}
            aria-label={
              isLiked ? `Unlike ${username}'s post` : `Like ${username}'s post`
            }
          >
            👍 {isLiked ? "Liked" : "Like"}
          </button>
          <Link to={`/post/${slug}`}>
            <button
              className={`px-1.5 py-0.5 text-sm rounded-md transition-all duration-300 ${
                theme === "light"
                  ? "text-gray-600 hover:text-blue-500 hover:bg-blue-100"
                  : "text-gray-400 hover:text-blue-400 hover:bg-blue-900/30"
              }`}
              aria-label={`Comment on ${username}'s post`}
            >
              💬 Comment
            </button>
          </Link>
          <button
            className={`px-1.5 py-0.5 text-sm rounded-md transition-all duration-300 ${
              theme === "light"
                ? "text-gray-600 hover:text-blue-500 hover:bg-blue-100"
                : "text-gray-400 hover:text-blue-400 hover:bg-blue-900/30"
            }`}
            aria-label={`Share ${username}'s post`}
            onClick={handleShare}
          >
            ↗️ Share
          </button>
        </div>
        {showComment && (
          <div className="flex flex-col gap-3 rounded-lg">
            <div
              className={`flex flex-col gap-4 p-4 rounded-lg shadow-md ${
                theme === "light" ? "bg-white" : "bg-gray-700"
              }`}
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="username"
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={commentUserName}
                  onChange={(e) => setCommentUserName(e.target.value)}
                  className={`p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    theme === "light"
                      ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      : "border-gray-600 focus:ring-blue-400 focus:border-blue-400 bg-gray-800 text-gray-100"
                  }`}
                  placeholder="Enter your username"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="comment"
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  Comment
                </label>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className={`p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    theme === "light"
                      ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      : "border-gray-600 focus:ring-blue-400 focus:border-blue-400 bg-gray-800 text-gray-100"
                  }`}
                  placeholder="Add your comment"
                />
              </div>
              <button
                name="add"
                onClick={handleAddComment}
                className={`px-4 py-2 text-white font-semibold rounded-md focus:outline-none focus:ring-2 transition-colors ${
                  theme === "light"
                    ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-white"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400 focus:ring-offset-gray-800"
                }`}
              >
                Add Comment
              </button>
            </div>

            {commentList.length > 0 ? (
              commentList.map((comment, index) => (
                <div
                  key={`comment-${index}`}
                  className={`flex items-start gap-3 p-3 rounded-md transition-colors ${
                    theme === "light"
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        theme === "light"
                          ? "bg-gray-300 text-gray-600"
                          : "bg-gray-600 text-gray-200"
                      }`}
                    >
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${
                          theme === "light" ? "text-gray-800" : "text-gray-100"
                        }`}
                      >
                        {comment.username}
                      </span>
                      <span className="text-xs text-gray-400">
                        • {new Date(comment.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p
                      className={`text-sm mt-1 ${
                        theme === "light" ? "text-gray-700" : "text-gray-200"
                      }`}
                    >
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p
                className={`text-sm italic p-3 ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                No comments yet.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PostCard;
