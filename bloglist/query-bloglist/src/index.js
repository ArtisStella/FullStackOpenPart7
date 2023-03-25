import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes";

import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationContextProvider } from "./components/NotificationContext";
import { AuthenticationProvider } from "./components/AuthenticationContext";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <AuthenticationProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthenticationProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
