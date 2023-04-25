import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPagePlus from "./pages/TransactionPagePlus"
import TransactionsPageMinus from "./pages/TransactionPageMinus"
import AppProvider from "./context/Provider";
import { useContext, useState } from 'react'

export default function App() {
  const localData = JSON.parse(localStorage.getItem("session"))
  const [session, setSession] = useState(localData);
  return (
    <PagesContainer>
      <BrowserRouter>
        <AppProvider value={{ session, setSession }}>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/new-entry" element={<TransactionsPagePlus />} />
            <Route path="/new-exit" element={<TransactionsPageMinus />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
