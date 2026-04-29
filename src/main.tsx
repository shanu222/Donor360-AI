
  import { createRoot } from "react-dom/client";
  import { BrowserRouter } from "react-router";
  import RoutesApp from "./app/RoutesApp.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
