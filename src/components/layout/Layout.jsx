import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

export default function Layout({ children }) {
  const { pengguna } = useSelector((state) => state.auth);
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/masuk');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-primary">
                  Monitoring Kekeringan
                </Link>
              </div>
            </div>

            {/* Menu Desktop */}
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              {pengguna && (
                <>
                  <span className="text-gray-700">
                    Halo, {pengguna.nama}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </Button>
                </>
              )}
            </div>

            {/* Tombol Menu Mobile */}
            <div className="flex items-center sm:hidden">
              <Button
                variant="ghost"
                onClick={() => setMenuTerbuka(!menuTerbuka)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {menuTerbuka && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {pengguna && (
                <div className="px-4 py-2 space-y-2">
                  <span className="block text-gray-700">
                    Halo, {pengguna.nama}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

