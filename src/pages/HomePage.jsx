import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import dayjs from "dayjs";

export default function HomePage() {

  const [userTransactions, setUserTransactions] = useState([])

  const [soma, setSoma] = useState('');

  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const {user} = useContext(UserContext);

  useEffect(() => {
    if(!user.token){
      return navigate('/');
    }
    const url = `${import.meta.env.VITE_API_URL}/my-transactions`;
    const headers = {headers: {'Authorization': `Bearer ${user.token}`}};
    axios.get(url, headers)
    .then(resp => {
      console.log(resp);
      let s = 0;
      resp.data.forEach( trans => {
        if(trans.type === 'income'){
          s = s + Number(trans.value);
        }else{
          s = s - Number(trans.value);
        }
      })
      console.log(s);
      console.log(typeof(s));
      setTotal(s);
      setSoma(Math.abs(s).toFixed(2).toString().replace('.',','));
      resp.data.map( trans => trans.value = trans.value.replace('.',','));
      setUserTransactions(resp.data);
    })
    .catch (err => {
      console.log(err.response.data)
      navigate('/')
    })
  }, []);

  console.log(total);

  function logout(){
    const url = `${import.meta.env.VITE_API_URL}/sign-out`;
    const headers = {headers: {'Authorization': `Bearer ${user.token}`}};
    axios.delete(url, headers)
      .then(resp => {
        console.log(resp);
        localStorage.removeItem("user");
        navigate('/');
      })
      .catch(err => {
        console.log(err.response.data);
      })
  }
  
  //headers: {'Authorization': `Bearer ${infProfi[0].token}`}
  
  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user.name}</h1>
        <BiExit data-test="logout" onClick={logout}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {userTransactions.map(transaction => (
            <ListItemContainer key = {transaction._id}>
            <div>
              <span>{dayjs(transaction.date).format('DD/MM')}</span>
              <strong data-test="registry-name" >{transaction.description}</strong>
            </div>
            <Value data-test="registry-amount" color={transaction.type}>{transaction.value}</Value>
          </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Saldo data-test="total-amount" color={total}>{soma}</Saldo>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
          <button data-test="new-income" onClick = {() => navigate("/nova-transacao/entrada")}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
          <button data-test="new-expense" onClick = {() => navigate("/nova-transacao/saida")}>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

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
`
const TransactionsContainer = styled.div`
  box-sizing: content-box;
  flex-grow: 1;
  background-color: #fff;
  color: ${props => props.color};
  border-radius: 5px;
  padding: 16px 16px 0px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  position: relative;
  article {
    box-sizing: content-box;
    padding-bottom: 8px;
    padding-top: 3px;
    box-sizing: content-box;
    background-color:white;
    width: 100%;
    display: flex;
    justify-content: space-between;  
    position: sticky;
    bottom: 0px;
    right: 0px; 
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const Saldo = styled.p`
  padding-right: 10px;
  font-size: 16px;
  text-align: right;
  color: ${props => props.color >= 0 ? 'green' : 'red'};
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
    }
  }
`
const Value = styled.div`
  box-sizing: border-box;
  //padding-right: 20px;
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "income" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`