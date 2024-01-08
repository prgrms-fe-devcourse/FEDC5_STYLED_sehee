import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  DetailPage,
  HomePage,
  NotFoundPage,
  LoginPage,
  DirectMessagePage,
} from '@/Pages';

const RouterManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
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
