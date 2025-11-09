import React, { useContext, useState, useRef } from "react";
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

  // Load initial reaction state from localStorage
  const savedReactions =
    JSON.parse(localStorage.getItem("postReactions")) || {};
  const initialReaction = savedReactions[id] || null;
  const [userReaction, setUserReaction] = useState(initialReaction);
  const [reactionCounts, setReactionCounts] = useState({
    like: reactions.like + (initialReaction === "like" ? 1 : 0),
    love: reactions.love + (initialReaction === "love" ? 1 : 0),
    wow: reactions.wow + (initialReaction === "wow" ? 1 : 0),
    haha: reactions.haha + (initialReaction === "haha" ? 1 : 0),
    yum: reactions.yum + (initialReaction === "yum" ? 1 : 0),
    question: reactions.question + (initialReaction === "question" ? 1 : 0),
    clap: reactions.clap + (initialReaction === "clap" ? 1 : 0),
    calm: reactions.calm + (initialReaction === "calm" ? 1 : 0),
    dance: reactions.dance + (initialReaction === "dance" ? 1 : 0),
  });
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const reactionPickerRef = useRef(null);

  // Reaction options
  const reactionOptions = [
    { type: "like", emoji: "👍", label: "Like" },
    { type: "love", emoji: "❤️", label: "Love" },
    { type: "wow", emoji: "😲", label: "Wow" },
    { type: "haha", emoji: "😂", label: "Haha" },
    { type: "yum", emoji: "😋", label: "Yum" },
    { type: "question", emoji: "❓", label: "Question" },
    { type: "clap", emoji: "👏", label: "Clap" },
    { type: "calm", emoji: "🧘", label: "Calm" },
    { type: "dance", emoji: "🕺", label: "Dance" },
  ];

  // Handle reaction selection
  const handleReaction = (reactionType) => {
    const previousReaction = userReaction;
    const newReaction = userReaction === reactionType ? null : reactionType;

    // Update localStorage
    const updatedReactions = { ...savedReactions, [id]: newReaction };
    localStorage.setItem("postReactions", JSON.stringify(updatedReactions));

    // Update state
    setUserReaction(newReaction);
    setReactionCounts((prev) => {
      const newCounts = { ...prev };
      if (previousReaction) {
        newCounts[previousReaction] = Math.max(
          0,
          newCounts[previousReaction] - 1
        );
      }
      if (newReaction) {
        newCounts[newReaction] = (newCounts[newReaction] || 0) + 1;
      }
      return newCounts;
    });
    setShowReactionPicker(false);
  };

  // Toggle reaction picker
  const toggleReactionPicker = () => {
    setShowReactionPicker((prev) => !prev);
  };

  // Close reaction picker when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        reactionPickerRef.current &&
        !reactionPickerRef.current.contains(event.target)
      ) {
        setShowReactionPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fix: use 'images' from post
  const showImages = images.length > 4 ? images.slice(0, 4) : images;

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
      className={`shadow-md max-w-full rounded-lg p-3 md:p-6 mb-2 transition-colors duration-300 custom-scrollbar ${
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
              loading="lazy"
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
                  loading="lazy"
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
                      loading="lazy"
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
                    loading="lazy"
                    className="row-span-2 w-full h-full object-cover rounded-md"
                  />
                  <img
                    src={images[1]}
                    alt={`Post ${id} image 2`}
                    loading="lazy"
                    className="w-full h-28 sm:h-32 md:h-40 lg:h-48 object-cover rounded-md"
                  />
                  <img
                    src={images[2]}
                    alt={`Post ${id} image 3`}
                    loading="lazy"
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
                        loading="lazy"
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
          {reactionCounts.like > 0 && <span>👍 {reactionCounts.like}</span>}
          {reactionCounts.love > 0 && <span>❤️ {reactionCounts.love}</span>}
          {reactionCounts.wow > 0 && <span>😲 {reactionCounts.wow}</span>}
          {reactionCounts.haha > 0 && <span>😂 {reactionCounts.haha}</span>}
          {reactionCounts.yum > 0 && <span>😋 {reactionCounts.yum}</span>}
          {reactionCounts.question > 0 && (
            <span>❓ {reactionCounts.question}</span>
          )}
          {reactionCounts.clap > 0 && <span>👏 {reactionCounts.clap}</span>}
          {reactionCounts.calm > 0 && <span>🧘 {reactionCounts.calm}</span>}
          {reactionCounts.dance > 0 && <span>🕺 {reactionCounts.dance}</span>}
          <span>💬 {commentCount + commentList.length}</span>
          <span>↗️ {shareCount}</span>
        </div>
        {/* Action Buttons */}
        <div
          className={`flex justify-between items-center pt-1 border-t ${
            theme === "light" ? "border-gray-200" : "border-gray-600"
          }`}
        >
          <div className="relative" ref={reactionPickerRef}>
            <button
              onClick={toggleReactionPicker}
              className={`px-1.5 py-0.5 text-sm rounded-md transition-all duration-300 ${
                userReaction
                  ? theme === "light"
                    ? "text-blue-500 font-semibold bg-blue-100"
                    : "text-blue-400 font-semibold bg-blue-900/30"
                  : theme === "light"
                  ? "text-gray-600 hover:text-blue-500 hover:bg-blue-100"
                  : "text-gray-400 hover:text-blue-400 hover:bg-blue-900/30"
              }`}
              aria-label={
                userReaction
                  ? `Change or remove reaction to ${username}'s post`
                  : `React to ${username}'s post`
              }
            >
              {userReaction
                ? reactionOptions.find((r) => r.type === userReaction)?.emoji +
                  " " +
                  reactionOptions.find((r) => r.type === userReaction)?.label
                : "👍 Like"}
            </button>
            {showReactionPicker && (
              <div
                className={`absolute z-10 left-0 -top-12 flex gap-2 p-2 rounded-md shadow-md ${
                  theme === "light" ? "bg-white" : "bg-gray-700"
                }`}
              >
                {reactionOptions.map((reaction) => (
                  <button
                    key={reaction.type}
                    onClick={() => handleReaction(reaction.type)}
                    className={`text-lg p-1 rounded-full transition-all duration-200 ${
                      userReaction === reaction.type
                        ? theme === "light"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-blue-900/30 text-blue-400"
                        : theme === "light"
                        ? "hover:bg-blue-100 hover:text-blue-500"
                        : "hover:bg-blue-900/30 hover:text-blue-400"
                    }`}
                    aria-label={`React with ${reaction.label}`}
                    title={reaction.label}
                  >
                    {reaction.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
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
          <div className="flex flex-col gap-3 rounded-lg max-h-96 overflow-y-auto custom-scrollbar">
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
