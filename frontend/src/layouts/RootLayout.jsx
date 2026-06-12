
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 relative">
      <Navbar />
      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default RootLayout;
