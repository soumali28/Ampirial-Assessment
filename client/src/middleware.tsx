import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./components/ui/alert-dialog";

interface SessionAuthProps {
  children: React.ReactNode;
}

const SessionAuth: React.FC<SessionAuthProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  const fetchRefreshToken = async (): Promise<boolean> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Token refreshed successfully");
        return true;
      } else {
        console.error("Failed to refresh token:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      return false;
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/auth/validate-token`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          setAuthenticated(true);
        } else if (response.status === 401) {
          const refreshSuccess = await fetchRefreshToken();
          if (refreshSuccess) {
            const retryResponse = await fetch(
              `${import.meta.env.VITE_REACT_APP_API_URL}/auth/validate-token`,
              {
                method: "GET",
                credentials: "include",
              }
            );
            setAuthenticated(retryResponse.ok);
          } else {
            setAuthenticated(false);
            setSessionExpired(true);
          }
        }
      } catch (error) {
        setAuthenticated(false);
        console.error("Error validating token:", error);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Not authenticated", authenticated);
  if (!authenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (sessionExpired) {
    return (
      <AlertDialog
        isOpen={true}
        onClose={() => (window.location.href = "/signin")}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Expired</AlertDialogTitle>
            <AlertDialogDescription>
              Your session has expired. Please log in again.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              className="mt-4"
              onClick={() => (window.location.href = "/signin")}
            >
              Login
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return <>{children}</>;
};

export default SessionAuth;
