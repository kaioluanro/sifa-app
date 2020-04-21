import React,{useState} from 'react';
import './styles.css';
import './datestyles.css';
import {Link} from 'react-router-dom'
import api from '../../service/api'

import logo from '../../assets/logo/SiFa.png'
import voltarImg from '../../assets/icons/exit_to_app-black-18dp.svg'
import faceImg from '../../assets/icons/face-black-18dp.svg'

export default function Cadastro(){
  const [nome,setNome] = useState('');
  const [genero,setGenero] = useState('');
  const [circulo,setCirculo] = useState('');
  const [endereco,setEndereco] = useState('');
  const [ejc,setEjc] = useState('');
  const [telefone,setTelefone] = useState('');
  const [estado,setEstado] = useState('');
  const [cargos_ocupados,setCargos_ocupados] = useState('SEM CARGOS OCUPADOS');
  const [foto,setFoto] = useState('');

  const date = new Date();
  const anos = [];
  const dias = [];
  const [dia,setDia] = useState('dd');
  const [mes,setMes] = useState('mm');
  const [ano,setAno] = useState('yyyy');

  function carregarFoto() {
    var preview = document.getElementById('foto-preview');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      setFoto(reader.result)
      preview.src = reader.result;
      
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = faceImg;
    }
  }
  
  function cancelaFoto(){
    var preview = document.getElementById('foto-preview');
    preview.src = faceImg
  }

  Anos()
  function Anos(){
    let anosAntes = 1980;
    let anoAtual = date.getFullYear()-15;
      for(var i = anosAntes; i <  anoAtual; i++){
        anos.push(i);
      }
  }

  Dia()
  function Dia(){
    let anosAntes = 1;
    let anoAtual = 32;
      for(var i = anosAntes; i <  anoAtual; i++){
        dias.push(i);
      }
  }

  async function cadastraMembroEjc(e){
    e.preventDefault();

    const data = {
      nome,
      data_niver:`${dia}/${mes}`,
      data_nascimento:`${dia}/${mes}/${ano}`,
      genero,
      circulo,
      endereço:endereco,
      ejc,
      telefone,
      estado,
      cargos_ocupados,
      foto
    }
    console.log(data)
    try {
      await api.post('/ejcmembros', data);

      alert('Jovem Foi cadastrado');
    } catch (err) {
      alert('Error ao cadastrar, tente novamente, caso so erro pesista entre em contato com o desenvolvedor');
    }
  }

  return(
    <div id="cadastro">
      <div className="corpo-cadastro">
        <div className="bg-cadastro"></div>
        <div className="corpo-fundo-cadastro">
          <div className="header-cadastro">
            <img className="logo-cadastro" src={logo} />
            <h2>Cadastro</h2>
            <Link to="/dashboardgs" className="voltar-cadastro" >
              <img src={voltarImg}/>
            </Link>
          </div>

          <div className="linha-dash"></div>

          <form className="corpo-conteudo-cadastro" onSubmit={cadastraMembroEjc}>

            <div >
              <div className="foto-conteudo-cadastro" >
                <div className="foto-cadastro">
                  <img id='foto-preview'src={foto} alt=""/>
                </div>
                <section>
                  <label for="upload">Add uma Foto...</label>
                  <button type="button" onClick={cancelaFoto}>X</button>
                </section>
                  <input type="file" id='upload' onChange={carregarFoto}/>
              </div>

              <input className="w400" id="NOME" type="text" placeholder="Nome completo..." value={nome} onChange={e=>setNome(e.target.value)}/>

              <section className='datepicker'>
                <select id='selectPicker' value={dia} onChange={e=>setDia(e.target.value)}>
                  <option value="" disabled selected>Dia...</option>
                  {dias.map(dia=>(
                    <option value={dia}>{dia}</option>
                  ))}

                </select >
                
                <select className='selectPicker2' id="selectPicker" value={mes} onChange={e=>setMes(e.target.value)}>
                  <option value="" disabled selected>Mes...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="0">12</option>
                </select>
                
                <select className='selectPicker2' id="selectPicker" value={ano} onChange={e=>setAno(e.target.value)}>
                  <option value="" disabled selected>Ano...</option>
                  {anos.map(ano=>(
                    <option value={ano}>{ano}</option>
                  ))}  
                </select>
              </section>

              <select name="Genero..." id="GENERO" value={genero} onChange={e=>setGenero(e.target.value)}>
                <option value="" disabled selected>Genero...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
            
            <div className="linha-div-cadastro" ></div>
            
            <div className="coluna2" >

              <select className="circulo" id="CIRCULO" value={circulo} onChange={e=>setCirculo(e.target.value)}>
                <option value="" disabled selected>Circulo...</option>
                <option value="AMARELO">Amarelo</option>
                <option value="AZUL">Azul</option>
                <option value="LARANJA">Laranja</option>
                <option value="LILÁS">Lilás</option>
                <option value="VERDE">Verde</option>
                <option value="VERMELHO">Vermelho</option>
              </select>

              <input className="w400" id="ENDERECO" type="text" placeholder="Endereço..."value={endereco} onChange={e=>setEndereco(e.target.value)}/>

              <input className="w200" id="EJC" type="text" placeholder="EJC..." value={ejc} onChange={e=>setEjc(e.target.value)}/>

              <input className="w200" id="TELEFONE" type="tel" pattern="[0-9]{11}" placeholder="Telefone..." value={telefone} onChange={e=>setTelefone(e.target.value)}/>

              <select className="estado" id="ESTADO" value={estado} onChange={e=>setEstado(e.target.value)}>
                <option value="" disabled selected>Estado...</option>
                <option value="SOLTERIO">Solteiro</option>
                <option value="CASADO">Casado</option>
                <option value="JUNTO">Junto</option>
              </select>

              <textarea name="cargos" placeholder="Cargos Ocupados" id="CARGOS" cols="30" rows="10" value={cargos_ocupados} onChange={e=>setCargos_ocupados(e.target.value)}></textarea>

              <button type="submit">Cadastrar</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}