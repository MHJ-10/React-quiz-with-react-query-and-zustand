import { Navigate, createBrowserRouter } from "react-router-dom";
import Form from "./components/form";
import NotFound from "./components/not-found";
import Quiz from "./components/quiz";
import Result from "./components/result";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },

  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/not-found" replace />,
  },
]);

export default routes;
