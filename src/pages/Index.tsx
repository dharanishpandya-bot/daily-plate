import { Navigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

const Index = () => {
  const { isOnboarded, isLoggedIn } = useApp();

  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/home" replace />;
};

export default Index;
