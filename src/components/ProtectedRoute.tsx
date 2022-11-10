import { FC } from 'react';
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../config/consts';
import { useAuthContext } from "../hooks/useAuthContext";



const ProtectedRoute: FC = ({ children }) => {
        const { token } = useAuthContext();
      
        if (!token) {
          return <Navigate to={ROUTES.login} />;
        } 
      
      return <>{children}</>;
      };

export default ProtectedRoute