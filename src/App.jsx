import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applayout from "./ui/Applayout";
import Error from "./ui/Error";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRouteAdmin from "./ui/ProtectedRouteAdmin";
import AdminPageLayout from "./pages/AdminPageLayout";
import AdminPagePosters from "./pages/AdminPagePosters";
import PosterDetailPage from "./pages/PosterDetailPage";
import PosterLayoutPage from "./pages/PosterLayoutPage";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/", element: <HomePage /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/posterler", element: <PosterLayoutPage /> }, // Unfiltered posters
      {
        path: "/posterler/:categoryType/:categoryValue",
        element: <PosterLayoutPage />,
      }, // Filtered posters
      { path: "/posterler/:posterId", element: <PosterDetailPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRouteAdmin>
        <AdminPageLayout />
      </ProtectedRouteAdmin>
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <AdminPagePosters /> },
      { path: "products", element: <AdminPagePosters /> },
    ],
  },
  { path: "*", element: <PageNotFound />, errorElement: <Error /> },
  { path: "/login", element: <LoginPage />, errorElement: <Error /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
