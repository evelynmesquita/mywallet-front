import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import AppContext from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'

export default function SignInPage() {
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()
  const { setUser, setToken } = useContext(AppContext)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)

  function login(e) {
    e.preventDefault()
    setLoading(true)
    axios.post(`${url}/sign-in`, { email, password })
      .then(res => {
        setUser(res.data.user)
        setToken(res.data.token)
        navigate("/home")
        setLoading(false)
      })
      .catch(err => {
        alert(err.response.data)
        window.location.reload()
      })
  }

  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='E-mail' required />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Senha' required />
        <button>{!loading ? 'Entrar' :
          <ThreeDots
            color="#FFFFFF"
            height="50"
            width="50"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true} />}</button>
      </form>
      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    margin-top: 35px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
  }

  button {
    display: flex;
    justify-content: center;
    margin: auto;
    width: 326px;
    height: 46px;
    align-items: center;
  }
`
