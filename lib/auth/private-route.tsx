import { useAuth } from '@/components/providers/auth-provider'
import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();
  return auth && auth.userIsAuthenticated() ? children : <Navigate to="/login" />;
}

export default PrivateRoute