import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationContextProvider } from "./components/NotificationContext";
import { AuthenticationProvider } from "./components/AuthenticationContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
