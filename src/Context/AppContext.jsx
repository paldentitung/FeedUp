import { createContext, useEffect, useState } from "react";
import postData from "../data/PostData";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    const savedPost = localStorage.getItem("savedPosts");
    return savedPost ? JSON.parse(savedPost) : postData;
  });
  const [friend, setFriend] = useState([]);
  const [theme, setTheme] = useState("light");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // locally added the posts

  useEffect(() => {
    localStorage.setItem("savedPosts", JSON.stringify(posts));
  }, [posts]);

  //   toggle theme
  const toggleTheme = (prev) => setTheme(prev === "light" ? "dark" : "light");

  //   add friend
  const toggleFriends = (userId) => {
    setFriend((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // handle add post
  const handleAddPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        friend,
        setFriend,
        toggleFriends,
        setShowSidebar,
        showSidebar,
        toggleSidebar,
        posts,
        handleAddPost,
        showModal,
        toggleModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
