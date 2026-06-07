import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Store from './pages/Store';
import Admin from './pages/Admin';

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
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
]);

import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './components/LanguageProvider';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="light" storageKey="touchcare-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
