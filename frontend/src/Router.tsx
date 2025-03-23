import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { App } from "./views/Home";
import { Manga } from "./views/Manga";
import { Reader } from "./views/Reader";
import { Sitemap } from "./views/Sitemap";
import { Image } from "@chakra-ui/react";

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
    {
        path: '/sitemap',
        element: <Sitemap />
    },
    {
        path: '/test',
        element: <Image h="100%" src="https://anime-sama.fr/s2/scans/One%20Piece/1142/1.jpg" />
    }
]);

export const Router = () => (
    <RouterProvider router={router} />
);
