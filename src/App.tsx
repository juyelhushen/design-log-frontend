import { useEffect } from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      setAuth(
        {
          id: "",
          email: "",
        },
        accessToken,
        refreshToken,
      );
    }
  }, [setAuth]);

  return <AppRouter />;
}
