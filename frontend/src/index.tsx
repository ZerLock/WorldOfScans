import { ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Router } from "./Router";
import * as serviceWorker from './serviceWorker';
import PWAPrompt from 'react-ios-pwa-prompt';

const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
    <>
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <Router />
            </ChakraProvider>
            <PWAPrompt
                promptOnVisit={1}
                timesToShow={3}
                copyAddToHomeScreenStep="Sur l'écran d'accueil"
            />
        </React.StrictMode>
    </>
);

serviceWorker.register();
