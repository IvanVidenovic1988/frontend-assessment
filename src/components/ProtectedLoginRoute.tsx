import { Navigate } from 'react-router-dom'
import { ROUTES } from '../config/consts';
import { useAuthContext } from "../hooks/useAuthContext";

type ChildrenProps = {
  children: JSX.Element; 
}

const ProtectedLoginRoute = ({ children }: ChildrenProps) => {
        const { token } = useAuthContext();
      
        if (token) {
          return <Navigate to={ROUTES.events} />;
        }
      
        return children;
      };

export default ProtectedLoginRoute