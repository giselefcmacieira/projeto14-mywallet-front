import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import { UserContext } from "../contexts/UserContext"

export default function SignInPage() {
  const navigate = useNavigate();

  const {user, setUser} = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  function signIn (event){
    event.preventDefault();
    setIsDisabled(true);
    const url = `${import.meta.env.VITE_API_URL}/sign-in`;
    //body; {email: 'xxx@email.com', password: 'ixzdfbhzdsjbnf'}
    const body = {
      email,
      password
    }
    axios.post(url,body)
      .then(resp => {
        console.log(resp);
        console.log(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data)
        
        navigate('/home');
      })
      .catch(err =>{
        console.log(err);
        alert(err.response.data)
        setIsDisabled(false);
      })
  }
  
  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
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
        <button data-test="sign-in-submit" type='submit' disabled = {isDisabled}>Entrar</button>
      </form>

      <Link to = '/cadastro'>
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
`
