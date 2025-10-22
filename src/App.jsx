import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
import AddPostPage from "./Pages/AddPostPage";
import PostDetailPage from "./Pages/PostDetailPage";
import UserProfilePage from "./Pages/UserProfilePage";
import Register from "./Pages/Register";
import CurrentUserPage from "./Pages/CurrentUserPage";
import HashtagPosts from "./Pages/HashtagPosts";
import ScrollToTop from "./Components/ScrollToTop";
const App = () => {
  return (
    <>
      <div className="bg-gray-50">
        <ScrollToTop />

        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/add-post"
            element={
              <MainLayout>
                <AddPostPage />
              </MainLayout>
            }
          />
          <Route
            path="/post/:slug"
            element={
              <MainLayout>
                <PostDetailPage />
              </MainLayout>
            }
          />
          <Route
            path="/user-profile/:username"
            element={
              <MainLayout>
                <UserProfilePage />
              </MainLayout>
            }
          />
          <Route
            path="/:username"
            element={
              <MainLayout>
                <CurrentUserPage />
              </MainLayout>
            }
          />
          <Route
            path="/hashtag/:hashTag"
            element={
              <MainLayout>
                <HashtagPosts />
              </MainLayout>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
