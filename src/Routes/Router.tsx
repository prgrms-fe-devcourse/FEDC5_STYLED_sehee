import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DetailPage, HomePage, NotFoundPage } from '@/Pages';

const RouterManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/detail"
          element={<DetailPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterManager;
