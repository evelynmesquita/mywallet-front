import axios from 'axios'
import { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import { ThreeDots } from 'react-loader-spinner'
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import AppContext from '../context/AppContext'
import { useNavigate } from 'react-router'

export default function SignUpPage() {
  const url = process.env.REACT_APP_API_URL;
  const { setUser } = useContext(AppContext)
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [registering, setRegistenring] = useState(false)

  async function register(e) {
    e.preventDefault()
    setRegistenring(true)

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    axios.post(`${url}/sign-up`, user)
      .then(res => {
        alert(res.data)
        setUser(user.name)
        navigate("/")
        setRegistenring(false)
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")

      })
      .catch(err => {
        alert(err.response.data)
        window.location.reload()
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={register}>
        <MyWalletLogo />
        <input required type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
        <input required type='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input required type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input required type='password' placeholder='Confirma a senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button>{!registering ? 'Cadastrar' :
          <ThreeDots
            color="#FFFFFF"
            height="60"
            width="60"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true} />}</button>
      </form>
      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
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
    height: 46px;
    align-items: center;
  }
`
