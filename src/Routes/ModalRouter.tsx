import { Route, Routes } from 'react-router-dom';
import { AddPostPage, EditPasswordPage, SearchPage } from '@/Pages';

const ModalRouter = () => {
  return (
    <Routes>
      <Route
        path="search"
        element={<SearchPage />}
      />
      <Route
        path="add-post"
        element={<AddPostPage />}
      />
      <Route
        path="edit-password/:userId"
        element={<EditPasswordPage />}
      />
    </Routes>
  );
};

export default ModalRouter;
