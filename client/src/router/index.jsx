import * as React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { io } from 'socket.io-client';
import Toastify from 'toastify-js';
import BaseLayout from "../layouts/BaseLayout.jsx";
import ChatPage from "../views/ChatPage.jsx";
import LoginPage from "../views/LoginPage.jsx";
import TemporaryPage from "../views/Temp.jsx";

const url = "https://server.cozyb.me"
const socket = io("https://server.cozyb.me", {
    autoConnect: false
});
const router = createBrowserRouter([
    {
        path: "/chat-redirect",
        element: < TemporaryPage />
    },
    {
        path: "/",
        element: < LoginPage url={url} />,
        loader: () => {
            if(localStorage.access_token) return redirect("/chat")
                
            return null
        }
    },
    {
        element: <BaseLayout />,
        loader: () => {
            if (!localStorage.access_token) {
                Toastify({
                    text: "Please login first",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#EF4C54",
                        color: "#17202A",
                        boxShadow: "0 5px 10px black",
                        fontWeight: "bold"
                    }
                }).showToast();
                return redirect('/')
            }

            return null
        },
        children: [
            {
                path: "/chat",
                element: < ChatPage socket={socket} url={url} />
            }
        ]
    }
]);
export default router