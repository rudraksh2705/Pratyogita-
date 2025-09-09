import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

const GoogleSignInButton = () => {
  const { loginWithGoogle } = useAuth();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response) => {
    const id_token = response.credential;

    const res = loginWithGoogle(id_token); //  use AuthContext method
  };

  return <div id="googleSignInDiv" style={{ padding: "10px" }}></div>;
};

export default GoogleSignInButton;
