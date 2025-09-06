import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import HomePage from "./Pages/Home";
import ListPage from "./Pages/List";

const router = createBrowserRouter([
  {
    path: "/map",
    element: (
      <RootLayout>
        <HomePage />
      </RootLayout>
    ),
  },
  {
    path: "/",
    element: (
      <RootLayout>
        <ListPage />
      </RootLayout>
    ),
  },
  {
    path: "*",
    element: (
      <RootLayout>
        <Navigate to="/" replace />
      </RootLayout>
    ),
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
