import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [post, setPosts] = useState([]);
  const [friend, setFriend] = useState([]);
  const [theme, setTheme] = useState("light");

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

  return (
    <AppContext.Provider
      value={{ theme, setTheme, friend, setFriend, toggleFriends }}
    >
      {children}
    </AppContext.Provider>
  );
};
