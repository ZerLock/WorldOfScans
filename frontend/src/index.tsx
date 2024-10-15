import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Router } from "./Router";
import * as serviceWorker from './serviceWorker';
import { PWA } from "./components/PWA";
import ReactPWAInstallProvider from './libs/pwa';

const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
    <>
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <ReactPWAInstallProvider enableLogging>
                    <Box mb="30px">
                        <Router />
                        <PWA />
                    </Box>
                </ReactPWAInstallProvider>
            </ChakraProvider>
        </React.StrictMode>
    </>
);

serviceWorker.register();
