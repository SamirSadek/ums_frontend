import { Navigate } from "react-router-dom";
import { useUser } from "../provider/UserProvider";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser(); // Get user authentication status from context
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (!user) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the passed component
  return children;
};

export default ProtectedRoute;
