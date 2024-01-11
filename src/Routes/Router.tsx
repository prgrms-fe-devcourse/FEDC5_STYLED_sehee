import { Routes, Route } from 'react-router-dom';

import {
  DetailPage,
  HomePage,
  NotFoundPage,
  LoginPage,
  SignUpPage,
  DirectMessagePage,
  ProfilePage,
  AddPostPage,
  SearchPage,
  EditPasswordPage,
} from '@/Pages';

const RouterManager = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      >
        <Route
          path="/modal-detail:postId"
          element={<DetailPage />}
        />
        <Route
          path="/edit-password/:userId"
          element={<EditPasswordPage />}
        />
      </Route>
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/signup"
        element={<SignUpPage />}
      />
      <Route
        path="/search"
        element={<SearchPage />}
      />
      <Route
        path="/add-post"
        element={<AddPostPage />}
      />
      <Route
        path="/profile/:userId"
        element={<ProfilePage />}
      />
      <Route
        path="/edit-password/:userId"
        element={<EditPasswordPage />}
      />
      <Route
        path="/directmessage"
        element={<DirectMessagePage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default RouterManager;
