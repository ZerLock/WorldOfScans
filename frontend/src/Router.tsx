import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { App } from "./views/Home";
import { Reader } from "./views/Reader";
import { Chapters } from "./views/Chapters";
import { useEffect } from "react";

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
    },
    {
        path: '/desktop-not-supported',
        element: <h1>Sorry, this website is accessible only from mobile</h1>
    }
]);

export const Router = () => {

    useEffect(() => {
        if (document.referrer !== `${window.location.origin}/desktop-not-supported`) {
            window.onload = function() {
                if (!(/Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent))) {
                    window.location.href = "/desktop-not-supported";
                }
            };
        }
    }, []);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
