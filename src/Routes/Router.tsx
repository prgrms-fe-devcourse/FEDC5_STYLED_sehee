import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DetailPage, HomePage, NotFoundPage } from '@/Pages';
import DirectMessagePage from '@/Pages/DirectMessagePage';

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
          path="/directmessage"
          element={<DirectMessagePage />}
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
