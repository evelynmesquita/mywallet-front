import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Oval } from 'react-loader-spinner'

export default function HomePage() {
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()
  const { user, reload, token, setReload } = useContext(AppContext)
  const [wallet, setWallet] = useState([])
  const [loading, setLoading] = useState(false)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  useEffect(() => {
    setLoading(true)

    axios.get(`${url}/wallet`, config)
      .then(res => {
        const newWallet = res.data
        setWallet(newWallet)
        setLoading(false)
      })
      .catch(err => {
        alert(err.response.data)
        navigate("/")
      })

  }, [reload])

  let userName = user.charAt(0).toUpperCase() + user.slice(1)
  let balance

  balanceCalculator()
  function balanceCalculator() {
    const balanceArray = wallet.map((item) => {
      if (item.type === "entry") {
        return Number((item.value).replace(",", "."))
      } else {
        return Number(-item.value.replace(",", "."))
      }
    })

    balance = (balanceArray.reduce((acc, current) => acc + current, 0)).toFixed(2).toString()
    balance.replace(".", ",")
    return balance
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {userName}</h1>
        <Link to="/">
          <BiExit />
        </Link>
      </Header>

      <TransactionsContainer loading={loading}>
        <Transactions>
          {loading ? <Oval
            color="#8C11BE"
            secondaryColor="#A328D6"
            height="80"
            width="80"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true} /> : wallet.length === 0 ? <h4>Não há registros de  <br /> entrada ou saída</h4> :
            wallet.map((item) => (
              <ul>
                <ListItemContainer key={item._id}>
                  <div>
                    <span>{item.date}</span>
                    <strong>{item.description}</strong>
                  </div>
                  <Value type={item.type} >R$ {
                    (Number(item.value).toFixed(2)).toString().replace(".", ",")
                  }</Value>
                </ListItemContainer>
              </ul>

            ))
          }
        </Transactions>

        {wallet.length > 0 ?
          <Balance>
            <article>
              <strong>Saldo</strong>
              <BalanceValue type={balance.toString()} >R$ {(balance.replace(".", ","))}</BalanceValue>
            </article>
          </Balance>
          :
          <div><article></article></div>
        }
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <Link to={"/new-entry"}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </Link>

        </button>
        <button>
          <Link to={"/new-exit"}>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </Link>
        </button>
      </ButtonsContainer>

    </HomeContainer >
  )
}
const Transactions = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  margin-top: 10px;

  ul {
    margin-bottom: 10px;
  }
`

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;

  a {
    font-size: 30px;
  }
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
    
  }

  h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    margin-top: 180px;
  }

  
`

const Balance = styled.div`
  margin-top: 10px;
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
      margin-top: 30px;
    }
    a {
      font-size: 24px;
      margin-top: 10px;
      margin-left: 5px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${props => props.type === "entry" ? "#03AC00" : "#C70000"}
`
const BalanceValue = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${props => props.type.includes("-") ? "#C70000" : "#03AC00"}
`

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
