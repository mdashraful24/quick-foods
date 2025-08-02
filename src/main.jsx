import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router.jsx";
import CateringProviders from "./Provider/CateringProviders.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient()


createRoot(document.getElementById("root")).render(
  <div className="font-lora">
    <StrictMode>
      <HelmetProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <CateringProviders>
              <RouterProvider router={router}></RouterProvider>
              <ToastContainer position="top-center" autoClose={1700} />
            </CateringProviders>
          </QueryClientProvider>
        </AuthProvider>
      </HelmetProvider>
    </StrictMode>
  </div>
);