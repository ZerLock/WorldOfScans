import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { App } from "./views/Home";
import { Reader } from "./views/Reader";
import { Chapters } from "./views/Chapters";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: '/manga',
        element: <App />,
    },
    {
        path: '/manga/:manga/chapter',
        element: <Chapters />,
    },
    {
        path: '/manga/:manga/chapter/:chapter',
        element: <Reader />,
    },
    {
        path: '/about',
        element: <h1>Author: @ZerLock</h1>
    }
]);

export const Router = () => (
    <>
        <RouterProvider router={router} />
    </>
);
