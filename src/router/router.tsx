import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import { routerPaths } from "./routerPaths";
import { RouteGuard } from "@/components/RouteGuard";
import { lazy, Suspense } from "react";
import { Loader } from "@/components/ui/Loader";
import { Flex } from "@chakra-ui/react";
import { NotFoundPage } from "@/pages/notFound";

const AuthPage = lazy(() =>
  import("@/pages/auth").then((module) => ({
    default: module.AuthPage,
  }))
);

const NotesPage = lazy(() =>
  import("@/pages/notes").then((module) => ({
    default: module.NotesPage,
  }))
);

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: routerPaths.auth,
        element: (
          <Suspense
            fallback={
              <Flex w="100vw" height="100vh" justify="center" align="center">
                <Loader />
              </Flex>
            }
          >
            <RouteGuard type="auth">
              <AuthPage />
            </RouteGuard>
          </Suspense>
        ),
      },
      {
        path: routerPaths.notes,
        element: (
          <Suspense
            fallback={
              <Flex w="100vw" height="100vh" justify="center" align="center">
                <Loader />
              </Flex>
            }
          >
            <RouteGuard type="private">
              <NotesPage />
            </RouteGuard>
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
