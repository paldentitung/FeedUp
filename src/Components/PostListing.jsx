import React, { useContext } from "react";
import PostCard from "./PostCard";
import { AppContext } from "../Context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const PostListing = () => {
  const { posts } = useContext(AppContext);

  return (
    <section>
      <div className="w-full p-4 flex flex-col gap-4">
        <AnimatePresence>
          {posts?.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PostListing;
