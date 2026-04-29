
  import { createRoot } from "react-dom/client";
  import { BrowserRouter } from "react-router";
  import RoutesApp from "./app/RoutesApp.tsx";
  import { AuthProvider } from "./context/AuthContext.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
