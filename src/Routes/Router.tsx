import { Routes, Route } from 'react-router-dom';

import {
  DetailPage,
  HomePage,
  NotFoundPage,
  LoginPage,
  SignUpPage,
  DirectMessagePage,
  ProfilePage,
} from '@/Pages';
import AddChannelModal from '@/Pages/HomePage/AddChannelModal';
import ModalRouter from './ModalRouter';

const RouterManager = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      >
        <Route
          path="add-channel"
          element={<AddChannelModal />}
        />
        <Route
          path="*"
          element={<ModalRouter />}
        />
        <Route
          path="modal-detail/:postId"
          element={<DetailPage />}
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
        path="/profile/:userId"
        element={<ProfilePage />}
      >
        <Route
          path="*"
          element={<ModalRouter />}
        />
      </Route>
      <Route
        path="/directmessage"
        element={<DirectMessagePage />}
      >
        <Route
          path="*"
          element={<ModalRouter />}
        />
      </Route>
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default RouterManager;
