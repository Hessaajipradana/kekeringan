import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RuteTerproteksi({ children }) {
  const { token } = useSelector((state) => state.auth);
  
  if (!token) {
    return <Navigate to="/masuk" replace />;
  }

  return children;
}