import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
import AddPostPage from "./Pages/AddPostPage";
import PostDetailPage from "./Pages/PostDetailPage";
const App = () => {
  return (
    <>
      <div className="bg-gray-50">
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
        </Routes>
      </div>
    </>
  );
};

export default App;
