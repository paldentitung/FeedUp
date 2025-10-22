import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
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
    const newLiked = !isLiked; // toggle

    // Update localStorage
    const updatedLikes = { ...savedLikes, [id]: newLiked };
    localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));

    // Update states
    setIsLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
  };

  // comment handling
  const [commentList, setCommentList] = useState(
    Array.isArray(comments) ? comments : []
  );

  const [commentUserName, setCommentUserName] = useState("");
  const [commentInput, setCommentInput] = useState("");

  const handleAddComment = () => {
    // Prevent empty inputs
    if (!commentUserName.trim() || !commentInput.trim()) return;

    // Create new comment object
    const newComment = {
      username: commentUserName,
      comment: commentInput,
      timestamp: new Date(),
    };

    // Update state
    setCommentList((prev) => [newComment, ...prev]);

    // Optionally clear input fields
    setCommentUserName("");
    setCommentInput("");
  };

  // handle share
  const [shareCount, setShareCount] = useState(shares);

  const handleShare = () => {
    const url = `${window.location.origin}/post/${slug}`;
    navigator.clipboard.writeText(url);
    setShareCount((prev) => prev + 1);
    alert("Post URL copied to clipboard!");
  };

  const navigator = useNavigate();
  return (
    <section className="bg-white shadow-md max-w-full rounded-lg p-3 md:p-6 mb-2 ">
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
              className="w-7 h-7 rounded-full object-cover border border-gray-200"
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
          <p className="text-sm text-gray-800 max-w-full break-words">
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
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-2xl rounded-md">
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
                className="text-blue-500 text-sm hover:underline"
                aria-label={`Hashtag ${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        {/* Reactions Summary */}
        <div className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 mt-1">
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
          <span> ↗️ {shareCount}</span>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-1 border-t border-gray-200">
          <button
            onClick={handleLike}
            className={`px-1.5 py-0.5 text-sm rounded-md transition-all duration-300 ${
              isLiked
                ? "text-blue-500 font-semibold bg-blue-100"
                : "text-gray-600 hover:text-blue-500 hover:bg-blue-100"
            }`}
            aria-label={
              isLiked ? `Unlike ${username}'s post` : `Like ${username}'s post`
            }
          >
            👍 {isLiked ? "Liked" : "Like"}
          </button>
          <Link to={`/post/${slug}`}>
            <button
              className="px-1.5 py-0.5 text-sm text-gray-600 rounded-md hover:text-blue-500 hover:bg-blue-100 transition-all duration-300"
              aria-label={`Comment on ${username}'s post`}
            >
              💬 Comment
            </button>
          </Link>
          <button
            className="px-1.5 py-0.5 text-sm text-gray-600 rounded-md hover:text-blue-500 hover:bg-blue-100 transition-all duration-300"
            aria-label={`Share ${username}'s post`}
            onClick={handleShare}
          >
            ↗️ Share
          </button>
        </div>{" "}
        {showComment && (
          <div className="flex flex-col gap-3  rounded-lg ">
            <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e) => setCommentUserName(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your username"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="comment"
                  className="text-sm font-medium text-gray-700"
                >
                  Comment
                </label>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  onChange={(E) => setCommentInput(E.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Add your comment"
                />
              </div>
              <button
                name="add"
                onClick={handleAddComment}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Add Comment
              </button>
            </div>

            {commentList.length > 0 ? (
              commentList.map((comment, index) => (
                <div
                  key={`comment-${index}`}
                  className="flex items-start gap-3 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {/* Avatar placeholder */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  {/* Comment content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">
                        {comment.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        • {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mt-1">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic p-3">
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
