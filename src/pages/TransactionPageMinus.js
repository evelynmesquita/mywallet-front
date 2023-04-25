import styled from "styled-components"
import axios from "axios"
import { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import AppContext from "../context/AppContext"
import { AiFillHome } from 'react-icons/ai'
import AddNewValue from "../components/AddNewValue"

export default function TransactionsPageMinus() {
    const url = process.env.REACT_APP_API_URL;
    const { setReload, token } = useContext(AppContext)
    const location = useLocation()
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const nagivate = useNavigate()
    let type

    if (location.pathname === "/new-exit") {
        type = "exit"
    } else {
        type = "entry"
    }

    function registerNewEntry(e) {
        setLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        e.preventDefault()
        axios.post(`${url}/newValueWallet`, { value, description, type }, config)
            .then(() => {
                setReload([])
                nagivate("/home")
                setLoading(false)
            }).catch(err => {
                alert(err.response.data)
                setLoading(false)
            })
    }

    return (
        <TransactionsContainer>
            <div>
                <h1>Nova entrada</h1>
                <Link to="/home">
                    <AiFillHome color="white" size='1.5em' />
                </Link>
            </div>
            <AddNewValue
                loading={loading}
                registerNewEntry={registerNewEntry}
                setValue={setValue}
                setDescription={setDescription} />
        </TransactionsContainer>
    )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }

  div {
    width: 346px;
    display: flex;
    justify-content: space-between;
  }
`

