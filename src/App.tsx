import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "work/:slug", Component: ProjectPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
