import { createBrowserRouter } from "react-router-dom";
import { LazyMainPage } from "../pages/Main";
import { LazyContestPage } from "../pages/Contest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyMainPage />,
  },
  {
    path: "/contest",
    element: <LazyContestPage />,
  },
]);
