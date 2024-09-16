// components/ProtectedRoute.js
import CookiesService from '@/services/CookiesService';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
    children: ReactNode;
  }

  
const ProtectedRouteJwt = ({ children }:ProtectedRouteProps) => {
    const token = CookiesService.get('jwt')

  if (!token) {
    // Si le token n'existe pas, rediriger vers la page de connexion ou une autre page
    return <Navigate to="/Dashboard" replace />;
  }

  // Si le token existe, afficher la page demandée
  return children;
};

export default ProtectedRouteJwt;
