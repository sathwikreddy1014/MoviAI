import React from "react";
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Browse from "./Browse";
import Wishlist from "./Wishlist";

const AppLayout = () => (
  <div className="min-h-screen flex flex-col bg-black text-white">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/browse", element: <Browse /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/browse" replace />, // 👈 Redirect here
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
