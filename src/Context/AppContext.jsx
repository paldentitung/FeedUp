import { createContext, useState } from "react";
import postData from "../data/PostData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState(postData);
  const [friend, setFriend] = useState([]);
  const [theme, setTheme] = useState("light");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [logIn, setLogIn] = useState(() => {
    const isLogin = localStorage.getItem("logIn");
    return isLogin === "true";
  });
  const [register, setRegister] = useState("signin");
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle theme
  const toggleTheme = (prev) => setTheme(prev === "light" ? "dark" : "light");

  // Add/remove friend
  const toggleFriends = (userId) => {
    setFriend((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Add a new post
  const handleAddPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // handleLogIn
  const handleLogIn = (value) => {
    setLogIn(value);
    localStorage.setItem("logIn", value);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleModal = () => setShowModal(!showModal);

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
        register,
        setRegister,
        logIn,
        setLogIn,
        handleLogIn,
        setShowModal,

        setSearchTerm,
        searchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
