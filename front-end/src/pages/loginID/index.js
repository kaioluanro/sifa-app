import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo/SiFa.png'
import api from '../../service/api'

export default function LoginID() {
  const[id,setId] = useState('');
  const histoy = useHistory();


  async function acessandoComId(e){
    e.preventDefault();
    
    try{
      const response = await api.post('/sessions', { id });

      if(response.status === 200){
        histoy.push('/login');
      }
    
    }catch(err){
      alert('Id invalido, tente novamente!!');
    }
  }

  return (
    <div className="corpo">
      <div className="corpo-centro">

      <div className="form">

        <form onSubmit={acessandoComId}>
          <h3>Informe ID</h3>
          <input type="text" placeholder="Seu ID..." value={id} onChange={e => setId(e.target.value)}/>
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
