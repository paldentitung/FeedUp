import React, { useContext, useState } from "react";
import Button from "./Button";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddPostForm = () => {
  const { handleAddPost, currentUser, theme } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: "",
    mood: "",
    moodColor: "",
    images: [],
    hashtags: [],
  });

  // Handle change
  const handleInputChange = (event) => {
    const { name, files, value } = event.target;

    if (name === "images") {
      // Convert FileList to array
      const newFiles = Array.from(files);

      // Append new files to previous files
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));
    } else if (name === "hashtags") {
      setFormData((prev) => ({
        ...prev,
        hashtags: value.split(/[ ,]+/).filter((tag) => tag.trim() !== ""),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generateSlug = (text) => {
    return (
      text
        .toLowerCase() // lowercase
        .replace(/[^a-z0-9]+/g, "-") // replace spaces & special chars with dash
        .replace(/(^-|-$)/g, "") + // remove leading/trailing dash
      "-" +
      Date.now()
    ); // append timestamp to make it unique
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert files to Base64
    const imageUrls = await Promise.all(
      formData.images.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );

    // Generate slug
    const slug = generateSlug(formData.content);

    const newPost = {
      id: Date.now(),
      username: currentUser.username,
      avatar: currentUser.avatar,
      timestamp: "Just now",
      moodTag: formData.mood,
      moodTagColor: formData.moodColor,
      content: formData.content,
      images: imageUrls,
      hashtags: formData.hashtags,
      reactions: { like: 0, love: 0, haha: 0 },
      comments: 0,
      shares: 0,
      slug,
    };

    handleAddPost(newPost);

    // Reset form
    setFormData({
      content: "",
      mood: "",
      moodColor: "",
      images: [],
      hashtags: [],
    });

    navigate("/");
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md w-full mx-auto ${
        theme === "light"
          ? "bg-white text-gray-900"
          : "bg-gray-800 text-gray-100"
      } transition-colors duration-300`}
    >
      <button
        onClick={() => navigate(-1)}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-200 ${
          theme === "light"
            ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
            : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
        } mb-5`}
        aria-label="Go back"
      >
        <FaArrowLeft />
        Go Back
      </button>

      <h2
        className={`text-2xl font-semibold mb-4 ${
          theme === "light" ? "text-gray-800" : "text-gray-200"
        }`}
      >
        Create a New Post
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Username */}
        <div className="flex gap-2 items-center">
          <div>
            <img
              src={currentUser.avatar || "/user.png"}
              alt={`${currentUser.username}'s avatar`}
              className={`w-10 h-10 rounded-full object-cover border ${
                theme === "light" ? "border-gray-200" : "border-gray-600"
              }`}
            />
          </div>
          <span
            className={`text-lg font-semibold ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            {currentUser.username}
          </span>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className={`block text-sm font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            What's on your mind?
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            maxLength={500}
            value={formData.content}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 p-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:border-blue-400 focus:ring-blue-400"
            }`}
            placeholder="Share your thoughts..."
          />
        </div>

        {/* Mood Tag */}
        <div>
          <label
            htmlFor="moodTag"
            className={`block text-sm font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Mood
          </label>
          <select
            id="moodTag"
            name="mood"
            value={formData.mood}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 p-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:border-blue-400 focus:ring-blue-400"
            }`}
          >
            <option value="">Select a mood</option>
            <option value="Happy">Happy</option>
            <option value="Excited">Excited</option>
            <option value="Relaxed">Relaxed</option>
            <option value="Inspired">Inspired</option>
            <option value="Curious">Curious</option>
            <option value="Grateful">Grateful</option>
            <option value="Energetic">Energetic</option>
            <option value="Peaceful">Peaceful</option>
            <option value="Creative">Creative</option>
            <option value="Joyful">Joyful</option>
          </select>
        </div>

        {/* Mood Tag Color */}
        <div>
          <label
            htmlFor="moodTagColor"
            className={`block text-sm font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Mood Color
          </label>
          <select
            id="moodTagColor"
            name="moodColor"
            value={formData.moodColor}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 p-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:border-blue-400 focus:ring-blue-400"
            }`}
          >
            <option value="">Select a color</option>
            <option value="bg-green-200 text-gray-800">Green (Happy)</option>
            <option value="bg-orange-200 text-gray-800">
              Orange (Excited)
            </option>
            <option value="bg-blue-200 text-gray-800">Blue (Relaxed)</option>
            <option value="bg-purple-200 text-gray-800">
              Purple (Inspired)
            </option>
            <option value="bg-teal-200 text-gray-800">Teal (Curious)</option>
            <option value="bg-pink-200 text-gray-800">Pink (Grateful)</option>
            <option value="bg-red-200 text-gray-800">Red (Energetic)</option>
            <option value="bg-cyan-200 text-gray-800">Cyan (Peaceful)</option>
            <option value="bg-indigo-200 text-gray-800">
              Indigo (Creative)
            </option>
            <option value="bg-yellow-200 text-gray-800">Yellow (Joyful)</option>
          </select>
        </div>

        {/* Images */}
        <div>
          <label
            htmlFor="images"
            className={`block text-sm font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/png, image/jpeg"
            onChange={handleInputChange}
            multiple
            className={`mt-1 block w-full text-sm transition-colors duration-200 ${
              theme === "light"
                ? "text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                : "text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-900/30 file:text-blue-400 hover:file:bg-blue-900/50"
            }`}
          />
        </div>

        {/* Hashtags */}
        <div>
          <label
            htmlFor="hashtags"
            className={`block text-sm font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            Hashtags
          </label>
          <input
            type="text"
            id="hashtags"
            name="hashtags"
            value={formData.hashtags.join(" ")}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 p-2 transition-colors duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400"
                : "border-gray-600 bg-gray-800 text-gray-100 focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400"
            }`}
            placeholder="#Nepal #Travel"
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            name="Post"
            type="submit"
            className={`w-full py-2 rounded-md font-medium transition-all duration-200 ${
              theme === "light"
                ? "bg-blue-500 text-white hover:bg-blue-600 hover:ring-1 hover:ring-blue-500 hover:ring-offset-white"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:ring-1 hover:ring-blue-400 hover:ring-offset-gray-800"
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
