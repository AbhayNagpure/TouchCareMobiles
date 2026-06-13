import { useAuth } from '../context/AuthContext';
import AdminEasterEgg from '../pages/AdminEasterEgg';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If not logged in or not an admin, show Easter Egg minigame
  if (!user || user.role !== 'ADMIN') {
    return <AdminEasterEgg />;
  }

  return children;
};

export default AdminRoute;
