import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout, ChatLayout, ProtectedLayout, LoginLayout, RegisterLayout, AuthLayout } from "../../layouts";
import { Redirect } from "../../components";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path ="/">
        <Route index element={<Redirect to="chats/@me" />} />

        <Route element={<ProtectedLayout />}>
          <Route path = "chats" element={<RootLayout />}>
              <Route index element={<Redirect to="@me" />} />
              <Route path="@me" >
                  <Route index />
                  <Route path=":id" element={<ChatLayout />}/>
              </Route>
          </Route>
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginLayout/>} />
        <Route path="/register" element={<RegisterLayout/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);