import { useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components"

export default function TransactionsPage() {
  const { tipo } = useParams();
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  function addTransaction (event){
    event.preventDefault();
    console.log(value.split(''));
    let corectValue = '';
      if(value.split('').includes(',')){
        corectValue = 'Tem virgula!';
      }else{
        corectValue = 'Não tem virgula!';
      } 
    console.log(corectValue)
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={addTransaction}>
        <input 
        required
        placeholder="Valor" 
        type="text"
        value = {value}
        onChange = {e => setValue(e.target.value)}
        />
        <input 
        required
        placeholder="Descrição" 
        type="text" 
        value = {description}
        onChange = {e => setDescription(e.target.value)}
        />
        <button type='submit'>Salvar {tipo}</button>
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
