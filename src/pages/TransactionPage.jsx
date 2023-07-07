import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext";

export default function TransactionsPage() {
  const { tipo } = useParams();
  const {user} = useContext(UserContext);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();


  function addTransaction (event){
    event.preventDefault();
    setIsDisabled(true);
    let type = '';
    if(tipo === 'entrada'){
      type = 'income';
    } 
    if(tipo === 'saída'){
      type = 'outcome';
    }
    const url = `${import.meta.env.VITE_API_URL}/new-transaction/${type}`;
    const body = {value, description};
    const headers = {headers: {'Authorization': `Bearer ${user.token}`}};
    axios.post(url, body, headers)
      .then(resp => {
        console.log(resp);
        navigate('/home');
      })
      .catch(err => {
        console.log(err);
        setIsDisabled(false);
      })
    // const requisicao = axios.post(`${BASE_URL}/habits`, body, config);
    //headers: {'Authorization': `Bearer ${infProfi[0].token}`}
    //body: {value: 53.56, description: 'dinheiro para pagar a comida das criança'}
    //params: {type: 'income' ou 'outcome'}
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={addTransaction}>
        <input 
        data-test="registry-amount-input"
        placeholder="Valor" 
        type="number" 
        step="0.01" 
        min="0"
        value = {value}
        onChange = {e => setValue(e.target.value)} 
        required/> 
        <input 
        data-test="registry-name-input"
        required
        placeholder="Descrição" 
        type="text" 
        value = {description}
        onChange = {e => setDescription(e.target.value)}
        />
        <button data-test="registry-save" disabled={isDisabled} type='submit'>Salvar {tipo}</button>
      </form>
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
`
