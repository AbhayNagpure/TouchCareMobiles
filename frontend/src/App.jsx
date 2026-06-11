import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';

import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Store from './pages/Store';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import AdminRoute from './components/AdminRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/store',
        element: <Store />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/admin',
        element: <AdminRoute><Admin /></AdminRoute>,
      },
    ],
  },
]);

import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './components/LanguageProvider';
import { AuthProvider } from './context/AuthContext';

const GOOGLE_CLIENT_ID = '366334733056-i2q9lr2d9ocfh6ct4e36gg77dh18s3bf.apps.googleusercontent.com';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="touchcare-theme">
      <LanguageProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <Toaster position="top-right" richColors />
            <RouterProvider router={router} />
          </AuthProvider>
        </GoogleOAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
