import { ReactNode, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/contexts/auth.context';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('PATIENT' | 'DOCTOR' | 'ADMIN')[];
  requireEmailVerification?: boolean;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles,
  requireEmailVerification = false 
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated - redirect to login
      if (!isAuthenticated) {
        navigate({ to: '/login' });
        return;
      }

      // Email verification required but not verified
      if (requireEmailVerification && user && !user.isEmailVerified) {
        navigate({ to: '/verify-email-prompt' });
        return;
      }

      // Role-based access control
      if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on actual role
        if (user.role === 'PATIENT') {
          navigate({ to: '/patient' });
        } else if (user.role === 'DOCTOR') {
          navigate({ to: '/doctor' });
        } else if (user.role === 'ADMIN') {
          navigate({ to: '/admin' });
        }
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, requireEmailVerification, navigate]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Email not verified
  if (requireEmailVerification && user && !user.isEmailVerified) {
    return null;
  }

  // Role check failed
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  // All checks passed - render children
  return <>{children}</>;
}
