import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  DetailPage,
  HomePage,
  NotFoundPage,
  LoginPage,
  SignUpPage,
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
          path="/signup"
          element={<SignUpPage />}
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
