import React from 'react'
import Login from "./Login.js"
import Browse from "./Browse.js"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import About from './About';
import Header from './Header';

const Body = () => {
    const appRouter = createBrowserRouter([
       {
    path: "/",
    element: (
      <div>
        <Header />
        <Login />
      </div>
    )
  },
  {
    path: "/browse",
    element: (
      <div>
        <Header />
        <Browse />
      </div>
    )
  },
  {
    path: "/about",
    element: (
      <div>
        <Header />
        <About />
      </div>
    )
  }
    ])
    
  return (
    <div>
      <RouterProvider router = {appRouter}/>
    </div>
  )
}

export default Body