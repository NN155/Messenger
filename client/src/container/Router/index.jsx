import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout, ChatLayout } from "../../layouts";
import { Redirect } from "../../components";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path ="/">
        <Route index element={<Redirect to="chats/@me" />} />
        <Route path = "chats" element={<RootLayout />}>
            <Route index element={<Redirect to="@me" />} />
            <Route path="@me" >
                <Route index />
                <Route path=":id" element={<ChatLayout />}/>
            </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);