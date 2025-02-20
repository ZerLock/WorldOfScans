import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { App } from "./views/Home";
import { Manga } from "./views/Manga";
import { Reader } from "./views/Reader";

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
        element: <Manga />
    },
    {
        path: '/manga/:manga/chapter/:chapter',
        element: <Reader />,
    },
]);

export const Router = () => (
    <RouterProvider router={router} />
);
