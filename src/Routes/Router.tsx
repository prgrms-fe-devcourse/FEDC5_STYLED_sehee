import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from '@/Components/Base/Spinner';

const DetailPage = lazy(() => import('@/Pages/DetailPage'));
const HomePage = lazy(() => import('@/Pages/HomePage'));
const NotFoundPage = lazy(() => import('@/Pages/NotFoundPage'));
const LoginPage = lazy(() => import('@/Pages/LoginPage'));
const SignUpPage = lazy(() => import('@/Pages/SignUpPage'));
const DirectMessagePage = lazy(() => import('@/Pages/DirectMessagePage'));
const ProfilePage = lazy(() => import('@/Pages/ProfilePage'));
const AddChannelModal = lazy(() => import('@/Pages/HomePage/AddChannelModal'));
const ModalRouter = lazy(() => import('./ModalRouter'));

const RouterManager = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner />
        </div>
      }
    >
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
          <Route
            path="modal-detail/:postId"
            element={<DetailPage />}
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
          <Route
            path="modal-detail/:postId"
            element={<DetailPage />}
          />
        </Route>
        <Route
          path="/*"
          element={<NotFoundPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default RouterManager;
