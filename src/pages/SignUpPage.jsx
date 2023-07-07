import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import dotenv from 'dotenv'
import axios from "axios"

export default function SignUpPage() {

  const navigate = useNavigate();

  //dotenv.config();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  function signUp (event){
    event.preventDefault();
    setIsDisabled(true);
    const url = `${import.meta.env.VITE_API_URL}/sign-up`;
    // body: {name: 'xxxx', email: ''aaa@ffff', password: 'xlcvbnipsaudebnj'}
    const body = {
      name,
      email,
      password
    }
    if(password === passwordConfirmation){
      axios.post(url, body)
      .then(resp => {
        console.log(resp);
        navigate('/');
      }) 
      .catch(err =>{
        console.log(err.response.data);
        alert(err.response.data)
        setIsDisabled(false);
      })
    }else{
      alert('senha e confirmação de senha são diferentes!');
      setIsDisabled(false);
    }
    
  }
  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input required 
        data-test="name"
        type='text' 
        id= 'campoNome'
        value = {name}
        onChange = {e => setName(e.target.value)}
        placeholder="Nome" 
        />
        <input required 
        data-test="email"
        type='email' 
        id= 'campoEmail'
        value = {email}
        onChange = {e => setEmail(e.target.value)}
        placeholder="E-mail" 
        />
        <input required 
        data-test="password"
        type='password' 
        id= 'campoSenha'
        value = {password}
        onChange = {e => setPassword(e.target.value)}
        placeholder="Senha" 
        autoComplete="new-password"
        />
        <input required 
        data-test="conf-password"
        type='password' 
        id= 'campoConfirmacaoDeSenha'
        value = {passwordConfirmation}
        onChange = {e => setPasswordConfirmation(e.target.value)}
        placeholder="Confirme a senha" 
        autoComplete="new-password"
        />
        <button data-test="sign-up-submit" type='submit' disabled={isDisabled}>Cadastrar</button>
      </form>

      <Link to = '/'>
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
`
