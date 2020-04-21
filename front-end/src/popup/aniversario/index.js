import React,{useEffect,useState} from 'react';
import { Header, Button, Popup, Grid } from 'semantic-ui-react';
import './styles.css';
import api from '../../service/api';
import base64 from 'base-64';
import {Cores} from '../../util/cores';

import fotoImg from '../../assets/icons/face-black-18dp.png'

function PopupExampleFlowing(){
  const [aniversariantes,setAniversariantes] = useState([]);

  useEffect(()=>{
    api.get('/aniversarios').then(response=>setAniversariantes(response.data))
  },[]) 
  return(
  <Popup className="popup" trigger={<button>Aniversários</button>} flowing hoverable>

    <Header as='h3'>Aniversariantes do Dia</Header>
    {aniversariantes.map(aniversariante =>(
      <div className="corpo-popup">
        <div className="corCirculo-popup" style={{backgroundColor:Cores(aniversariante.circulo)}}></div>
          <div className="orientacao-conteudo-popup">
            <div className="foto-conteudo-popup">
              <div className="foto-popup">
                <img src={`data:image/png;base64,${aniversariante.foto}`}/>
              </div>
            </div>

            <div className="dadosNiver">
              <strong>Nome:</strong>
              <strong className="nome-popup">{aniversariante.nome}</strong>
              <strong className="circulo-popup">Circulo: {aniversariante.circulo}</strong>
            </div>

            <div className="bolo"></div>

          </div>
      </div>
    ))}
  </Popup>)
}

export default PopupExampleFlowing