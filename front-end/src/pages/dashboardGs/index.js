import React,{useEffect,useState} from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import api from '../../service/api'

import logo from '../../assets/logo/SiFa.png'
import downloadImg from '../../assets/icons/download.svg'
import logoutImg from '../../assets/icons/logout.svg'
import faceImg from '../../assets/icons/face-black-18dp.png'
import deleteImg from '../../assets/icons/delete-black-18dp.png'
import brushImg from '../../assets/icons/brush-black-18dp.png'

import PopupNiver from '../../popup/aniversario'
import {Cores} from '../../util/cores'

export default function DashboardGs(){
  const [ejcmembros,setEjcMembros] = useState([]);
  const [evento,setEvento] = useState([]);
  const [buscar,setBuscar] = useState('');
  const [resultadoPesquisa,setResultadoPesquisa] = useState([]);

  const numeroDeEventos = evento.length;

  useEffect(()=>{
    api.get('/ejcmembros/listacompletaejc').then(response=>setEjcMembros(response.data))

  },[])

  useEffect(()=>{
    api.get('/eventos').then(response=>setEvento(response.data))

  },[])

  useEffect(()=>{
    if(buscar === ''){
      let resultadoBuscar = ejcmembros.filter(resultado=>(resultado))

      setResultadoPesquisa(resultadoBuscar)
    }else{
      let resultadoBuscar = ejcmembros.filter(resultado=>(resultado.nome.toLowerCase().indexOf(buscar) !== -1 || resultado.circulo.toLowerCase().indexOf(buscar) !== -1))
      
      setResultadoPesquisa(resultadoBuscar)
    }
    }, [buscar, ejcmembros])

  return(
    <div id="dashboar">
      <div className="corpo-dash">
        <div className="bg-dash"></div>

        <div className="corpo-fundo">
          
          <div className="header-dash">
            <img className="logo" src={logo} />
            <PopupNiver >Aniversários</PopupNiver>
            <input type="text" placeholder="Buscar Jovem..." value={buscar} onChange={e=>setBuscar(e.target.value)}/>
            <Link to="/dashboardgs/cadastro" className="cadastro-button">Cadastro</Link>
            <a className="download" href="http://localhost:3333/download/somosapenasservos" download>
              <img src={downloadImg} alt=""/>
            </a>
            <button className="logout" >
              <img src={logoutImg} alt=""/>
            </button>
          </div>

          <div className="linha-dash"></div>

          <div className="corpo-conteudo-dash">

            <div className="perfil">

              {
              resultadoPesquisa.map(ejcmembro =>(
              <div className="perfil-conteudo" key={ejcmembro.id}>
                <div className="corCirculo" style={{backgroundColor:Cores(ejcmembro.circulo)}}></div>
                <div className="perfil-conteudo2">
                <div className="foto-conteudo">
                  <div className="foto">
                    <img src={`${ejcmembro.foto}`} className="fotoPerfil" />
                  </div>
                </div>
                <div className="perfil-conteudo-dados">
                      <ul>
                        <strong>Nome:</strong>
                        <button><img src={deleteImg}/></button>
                      </ul>
                      <ul>
                        <strong className="valores">{ejcmembro.nome}</strong>
                        <Link to="/dashboardgs/editar"><img src={brushImg}/></Link>
                      </ul>  
                      <ul>
                        <strong>Circulo:</strong>
                        <strong>Presença:</strong>
                      </ul>
                      <ul>
                        <strong className="valores">{ejcmembro.circulo}</strong>
                        <strong className="valores">{`${ejcmembro.presenca}/${numeroDeEventos}`}</strong>
                      </ul>  
                  </div>
                </div>
              </div>
              ))}

            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}