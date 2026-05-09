import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function OAuthSuccessPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (!accessToken || !refreshToken) {
      navigate("/login");
      return;
    }

    setAuth(
      {
        id: "",
        email: "",
      },
      accessToken,
      refreshToken
    );

    // small async delay helps Zustand persist first
    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 50);
  }, [navigate, setAuth]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg font-medium">Signing you in...</p>
    </div>
  );
}