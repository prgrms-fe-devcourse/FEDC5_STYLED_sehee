import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const EditPasswordPage = lazy(() => import('@/Pages/EditPasswordPage'));
const SearchPage = lazy(() => import('@/Pages/SearchPage'));
const AddOrEditPostPage = lazy(() => import('@/Pages/AddOrEditPostPage'));

const ModalRouter = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <Routes>
        <Route
          path="search"
          element={<SearchPage />}
        />
        <Route
          path="add-post"
          element={<AddOrEditPostPage />}
        />
        <Route
          path="edit-post/:postId"
          element={<AddOrEditPostPage />}
        />
        <Route
          path="edit-password/:userId"
          element={<EditPasswordPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default ModalRouter;
