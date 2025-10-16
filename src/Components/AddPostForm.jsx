import React, { useContext, useState } from "react";
import Button from "./Button";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const AddPostForm = () => {
  const { handleAddPost } = useContext(AppContext);
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    content: "",
    mood: "",
    moodColor: "",
    images: [],
    hashtags: [],
  });

  //   handle change
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
        hashtags: value.split(/[ ,]+/),
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
      username: "CurrentUser",
      avatar: "/user.png",
      timestamp: "Just now",
      moodTag: formData.mood,
      moodTagColor: formData.moodColor,
      content: formData.content,
      images: imageUrls,
      hashtags: formData.hashtags,
      reactions: { like: 0, love: 0, haha: 0 },
      comments: 0,
      shares: 0,
      slug, // <-- add slug here
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

    navigator("/");
  };

  return (
    <div className="   p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigator(-1)}
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-200 mb-5"
      >
        <FaArrowLeft />
        Go Back
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Create a New Post
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value="CurrentUser"
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2"
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            placeholder="Share your thoughts..."
          />
        </div>

        {/* Mood Tag */}
        <div>
          <label
            htmlFor="moodTag"
            className="block text-sm font-medium text-gray-700"
          >
            Mood
          </label>
          <select
            id="moodTag"
            name="moodTag"
            value={formData.mood}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          >
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
            className="block text-sm font-medium text-gray-700"
          >
            Mood Color
          </label>
          <select
            id="moodTagColor"
            name="moodTagColor"
            value={formData.moodColor}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          >
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
            className="block text-sm font-medium text-gray-700"
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
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* Hashtags */}
        <div>
          <label
            htmlFor="hashtags"
            className="block text-sm font-medium text-gray-700"
          >
            Hashtags
          </label>
          <input
            type="text"
            id="hashtags"
            name="hashtags"
            value={formData.hashtags.join(" ")}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            placeholder="#Nepal #Travel"
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button name="Post" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
