import React, { useContext } from "react";
import PostCard from "./PostCard";
import { AppContext } from "../Context/AppContext";
import { motion } from "framer-motion";

const PostListing = () => {
  const { posts } = useContext(AppContext);

  return (
    <section>
      <div className="w-full p-4 flex flex-col gap-4">
        {posts?.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: post.id * 0.2,
              ease: "easeOut",
            }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PostListing;
