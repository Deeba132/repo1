import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();

  // 1. While loading, show a spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 2. If not authenticated, redirect immediately
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. If authenticated, render children
  return children;
}

export default ProtectedRoute;
