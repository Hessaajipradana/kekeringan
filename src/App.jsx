import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import FormMasuk from "./components/auth/FormMasuk";
import FormDaftar from "./components/auth/FormDaftar";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import RuteTerproteksi from "./components/auth/RuteTerproteksi";
import { Toaster } from "./components/ui/toaster";
import { ToastProvider } from "./components/ui/use-toast";

// Membuat router dengan future flags
const router = createBrowserRouter(
  [
    {
      path: "/masuk",
      element: <FormMasuk />,
    },
    {
      path: "/daftar",
      element: <FormDaftar />,
    },
    {
      path: "/",
      element: (
        <RuteTerproteksi>
          <Layout>
            <Dashboard />
          </Layout>
        </RuteTerproteksi>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <RuteTerproteksi>
          <Layout>
            <Dashboard />
          </Layout>
        </RuteTerproteksi>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ToastProvider>
    </Provider>
  );
}

export default App;
