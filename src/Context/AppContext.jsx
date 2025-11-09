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

  // NEW: current user state
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleFriends = (userId) => {
    setFriend((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAddPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLogIn = (value, userData = null) => {
    setLogIn(value);
    localStorage.setItem("logIn", value);
    if (userData) setCurrentUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData)); // save user info
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
        currentUser,
        setCurrentUser,
        searchTerm,
        setSearchTerm,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
