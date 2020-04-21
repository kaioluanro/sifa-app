import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom'

import logo from '../../assets/logo/SiFa.png'
import voltarImg from '../../assets/icons/exit_to_app-black-18dp.svg'
import faceImg from '../../assets/icons/face-black-18dp.png'

export default function Editar(){

  return(
    <div id="editar">
      <div className="corpo-editar">
        <div className="bg-editar"></div>
        <div className="corpo-fundo-editar">
          <div className="header-editar">
            <img className="logo-editar" src={logo} />
            <h2>Editar</h2>
            <Link to="/dashboard" className="voltar-editar" >
              <img src={voltarImg}/>
            </Link>
          </div>
          <div className="linha-dash"></div>
          <form className="corpo-conteudo-editar">
            <div >

              <div className="foto-conteudo-editar" >
                <div className="foto-editar">
                  <img src={faceImg} alt=""/>
                </div>
                <button type="button">Adicionar foto...</button>
              </div>

              <input className="w400" id="NOME" type="text" placeholder="Nome completo..."/>
              <input className="w200" id="DATANASCIMENTO" type="date" />
              <select name="Genero..." id="GENERO">
                <option value="" disabled selected>Genero...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
            
            <div className="linha-div-editar" ></div>
            
            <div className="coluna2" >

              <select className="circulo" id="CIRCULO">
                <option value="" disabled selected>Circulo...</option>
                <option value="AMARELO">Amarelo</option>
                <option value="AZUL">Azul</option>
                <option value="LARANJA">Laranja</option>
                <option value="LILÁS">Lilás</option>
                <option value="VERDE">Verde</option>
                <option value="VERMELHO">Vermelho</option>
              </select>

              <input className="w400" id="ENDERECO" type="text" placeholder="Endereço..."/>
              <input className="w200" id="EJC" type="text" placeholder="EJC..."/>
              <input className="w200" id="TELEFONE" type="tel" pattern="[0-9]{11}" placeholder="Telefone..."/>

              <select className="estado" id="ESTADO">
                <option value="" disabled selected>Estado...</option>
                <option value="SOLTERIO">Solteiro</option>
                <option value="CASADO">Casado</option>
                <option value="JUNTO">Junto</option>
              </select>

              <textarea name="cargos" placeholder="Cargos Ocupados" id="CARGOS" cols="30" rows="10"></textarea>

              <button type="submit">Cadastrar</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}