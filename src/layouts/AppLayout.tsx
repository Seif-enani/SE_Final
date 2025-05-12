import { ReactNode, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AppHeader from '../components/navigation/AppHeader';
import Sidebar from '../components/navigation/Sidebar';
import { Menu } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <div className="pt-16 min-h-screen flex">
        {isAuthenticated && (
          <>
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
            
            {/* Mobile sidebar toggle button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg z-50"
            >
              <Menu size={24} />
            </button>
          </>
        )}
        
        <main className={`flex-1 transition-all duration-300 ${isAuthenticated ? 'md:ml-64' : ''}`}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;