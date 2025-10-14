import React, { useState } from "react";

const PostCard = ({ post }) => {
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
    comments,
    shares,
  } = post;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(reactions.like);

  // Handle like toggle and update count
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <section className="bg-white shadow-md rounded-lg p-3 md:p-6 mb-2 max-w-full">
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img
              src={avatar}
              alt={`${username}'s avatar`}
              className="w-7 h-7 rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <h1 className="font-semibold text-sm">{username}</h1>
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

        {/* Content */}
        <p className="text-sm text-gray-800 max-w-full break-words">
          {content}
        </p>

        {/* Images */}
        {images.length > 0 && (
          <div className="mt-1 flex gap-1 snap-x snap-mandatory overflow-x-auto">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post ${id} image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md snap-center"
              />
            ))}
          </div>
        )}

        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {hashtags.map((tag, index) => (
              <a
                key={index}
                href={`/hashtag/${tag.slice(1)}`}
                className="text-blue-500 text-sm hover:underline"
                aria-label={`Hashtag ${tag}`}
              >
                {tag}
              </a>
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
          <span>💬 {comments}</span>
          <span>↗️ {shares}</span>
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
          <button
            className="px-1.5 py-0.5 text-sm text-gray-600 rounded-md hover:text-blue-500 hover:bg-blue-100 transition-all duration-300"
            aria-label={`Comment on ${username}'s post`}
          >
            💬 Comment
          </button>
          <button
            className="px-1.5 py-0.5 text-sm text-gray-600 rounded-md hover:text-blue-500 hover:bg-blue-100 transition-all duration-300"
            aria-label={`Share ${username}'s post`}
          >
            ↗️ Share
          </button>
        </div>
      </div>
    </section>
  );
};

export default PostCard;
