# FeedUp – Project Documentation

---

## 1. Project Overview

FeedUp is a lightweight, modern social feed web application built with **React** and **Tailwind CSS**. It provides a simplified yet engaging social media experience inspired by platforms like Facebook, allowing users to post content with mood-based styling, interact with static friends, and browse a dynamic feed.

## 🔗 Live Demo

[![Go Live](https://img.shields.io/badge/Go%20Live-FeedUp-blue?style=for-the-badge&logo=netlify)](https://feedup-site.netlify.app/)


### Objectives

- Develop a mid-level React project to enhance frontend interactivity skills.
- Master React state management and modular component design.
- Lay the foundation for future backend and database integration.

---

## 2. Features

### 2.1 Header

- **Components**: Logo, App Name, Search Bar, Add Post Button, User Avatar.
- **Functionality**:
  - **Avatar**: Opens a profile page or modal.
  - **Search Bar**: Dynamically filters posts based on user input.
  - **Add Post Button**: Opens a modal or form for creating new posts.

### 2.2 Sidebar

- **Components**:
  - **Profile Card**: Displays current user's avatar, name, mood, post count, and reaction stats.
  - **Trending Tags**: Clickable hashtags to filter posts.
  - **Suggested Users/Friends**: Static list with an "Add Friend" toggle.
  - **Optional Mini Stats**: Displays total posts and mood counts.
- **Functionality**:
  - "Add Friend" button updates React state to reflect friend status.
  - Profile card provides a quick overview while browsing the feed.

### 2.3 Feed / Posts

- **Post Components**:
  - Username and avatar.
  - Mood/feeling tag with color-coded background (e.g., `bg-yellow-100` for happy, `bg-blue-100` for sad).
  - Text content.
  - Emoji reaction buttons.
- **Functionality**:
  - Users can react to posts with emojis, updating React state.
  - Posts are stored locally in React state.
  - Optional timestamps (e.g., "2 hours ago").
  - Clickable tags filter the feed dynamically.

### 2.4 Add Post

- **Form Elements**:
  - Text input for post content.
  - Mood selection dropdown (influences post background color).
  - Optional hashtag/tag input field.
- **Functionality**:
  - Submitting a post adds it to the feed, stored in React state.
  - Updates the feed dynamically without requiring a backend.

### 2.5 Static Users / Friends

- Uses a static array of users for sidebar friend suggestions.
- React state manages the "Add Friend" toggle (e.g., "Add Friend" → "Friend Added").
- Designed for seamless replacement with backend-driven user data in the future.

### 2.6 Optional Features

- Light/Dark mode toggle using Tailwind CSS dark mode classes.
- Floating "Add Post" button (sticky, bottom-right corner).
- Profile page/modal displaying user posts, friends list, and stats.

---

## 3. Layout & Design

### Layout Structure

```
Header
├── Logo + App Name
├── Search Bar
├── Add Post Button
└── User Avatar

Main
├── Sidebar (25% width)
│   ├── Profile Card
│   ├── Trending Tags
│   └── Suggested Friends
└── Feed (75% width)
    └── Post Cards
```

### Design Specifications

- **Container Width**: `max-w-5xl` (Tailwind CSS).
- **Primary Color**: `blue-500` for branding and accents.
- **Post Background Colors**: Mood-based (e.g., `bg-yellow-100`, `bg-blue-100`).
- **Sidebar Cards**: White background (`bg-white`), rounded corners (`rounded-lg`), subtle shadow (`shadow`), padding (`p-4`).
- **Typography**: Clean, sans-serif fonts with Tailwind utilities (`font-sans`, `text-base`).
- **Responsive Design**: Fully responsive with Tailwind’s mobile-first approach.

---

## 4. Technical Stack

- **Frontend**: React (functional components, hooks for state management).
- **Styling**: Tailwind CSS (responsive design, utility-first classes for cards, shadows, and colors).
- **Data Handling**:
  - Local React state for managing posts, friends, and moods.
  - Static arrays for users and suggested friends.
- **Future Backend**: Node.js + Express with MongoDB or MySQL for persistent data storage.

---

## 5. Component Breakdown

| Component        | Description                                  | State/Props Used              |
| ---------------- | -------------------------------------------- | ----------------------------- |
| **Header**       | Logo, App Name, Search Bar, Add Post, Avatar | `searchTerm`, `onAddPost`     |
| **Sidebar**      | Profile Card, Trending Tags, Suggested Users | `friendsState`, `profileData` |
| **PostCard**     | Single post with mood, text, reactions       | `postData`, `onReact`         |
| **AddPostModal** | Form for adding posts                        | `postContent`, `selectedMood` |
| **ProfilePage**  | Displays user’s posts, stats, friends        | `userPosts`, `friendsState`   |

---

## 6. Project Workflow

1. User opens FeedUp → Views header, sidebar, and feed.
2. User clicks "Add Post" → Fills out content and mood → Submits to add post to feed.
3. User interacts with posts via emoji reactions, updating React state.
4. Sidebar shows static suggested users → User can toggle "Add Friend."
5. Header avatar click → Opens profile page/modal with user details.
6. Future backend integration will enable persistent data and real-time updates.

---

## 7. Future Enhancements

- **Backend Integration**: Implement Node.js + Express for API-driven posts and user management.
- **Database**: Use MongoDB or MySQL for persistent data storage.
- **Authentication**: Add real user authentication (e.g., JWT or OAuth).
- **Notifications**: Support for reaction and friend request notifications.
- **Comments**: Enable a comments section for posts.
- **Real-Time Features**: Use WebSockets for live updates.

---

## 8. Unique Selling Points

- **Mood-Based Posts**: Color-coded backgrounds based on user-selected moods.
- **Emoji Reactions**: Interactive and engaging post interactions.
- **Friend Toggle**: Dynamic "Add Friend" functionality using React state.
- **Trending Tags**: Filterable hashtags for personalized feed browsing.
- **Lightweight Design**: Fast, responsive, and optimized for performance.
- **Scalable Architecture**: Ready for backend and database integration.

---
