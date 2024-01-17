import { Route, Routes } from 'react-router-dom';
import { EditPasswordPage, SearchPage, AddOrEditPostPage } from '@/Pages';

const ModalRouter = () => {
  return (
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
  );
};

export default ModalRouter;
