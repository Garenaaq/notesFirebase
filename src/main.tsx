import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "@/styles/global.css";
import "@/services/firebase.ts";
import { AuthProvider } from "./containers/authProvider";
import { Provider } from "./components/ui/chakra/provider";
import { Toaster } from "./components/ui/chakra/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Toaster />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
