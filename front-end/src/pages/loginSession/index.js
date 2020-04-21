import React,{useState} from 'react';
import './styles.css';
import logo from '../../assets/logo/SiFa.png';
import api from '../../service/api';
import jwt from 'jsonwebtoken';
import {useHistory} from 'react-router-dom'

export default function LoginID() {
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');

  const history = useHistory();

  async function acessadoEmailSenha(e){
    e.preventDefault();

    try{
      const response = await api.post('/sessions/login',{email, senha})

      if(response.status === 200){
       const token = jwt.decode(response.data.token)

       if(token.data.membro_gs === 1){
         history.push('/dashboardgs');
       }

      }
    }catch(err){
      alert('Dados invalidos. Por favor, verifique se os estão corretos e tente novamente!!')
    }
  }

  return (
    <div className="corpo">
      <div className="corpo-centro">

      <div className="form">

        <form onSubmit={acessadoEmailSenha}>
          <h3>Faça Login</h3>
          <input type="text" placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="Senha..." value={senha} onChange={e => setSenha(e.target.value)}/>
          <button type="submit">Acessar</button>
        </form>

      </div>

      <div className="header-logo">

        <div>
          <img src={logo}/>
        </div>

      </div>

      </div>
    </div>
  );
}
