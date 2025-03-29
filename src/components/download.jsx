import * as React from "react";
import { useRef, useState, useContext } from "react";

import {LayoutTag} from "../database"
import "../styles/styles.css";
export default function Download() {
  const inputsRef = useRef([]);
  const [modo, setModo] = useState(true);
  const [res, setRes] = useState({})
  const {layout, setLayout} = useContext(LayoutTag);
  
 const CodeInput = () => {
 
  const handleInput = (e, index) => {
    const { value } = e.target;

    if (value.length === 1) {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
        
      }else{
        inputsRef.current[index].blur();
      }
    }else if(value.length === 0) {
      if(index < inputsRef.current.length - 1){
        inputsRef.current[index - 1].focus();
      }else{
        inputsRef.current[index].blur();
      }
    }
  };

  return (
    <div className="inputs">
      {[...Array(5)].map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          ref={(el) => (inputsRef.current[i] = el)}
          onInput={(e) => handleInput(e, i)}
        />
      ))}
    </div>
  );
};

async function pesquisar() {
  
  
  
  var code = "";
  [...Array(5)].map((_,i) => {
   code += inputsRef.current[i].value.toUpperCase();
  })
  if(code.length < 5) {
    inputsRef.current[code.length].style.border = "2px solid red";
    setTimeout(() => {
      inputsRef.current[code.length].style.border = "2px solid white";
    }, 2000)
  }else if(code.length >= 5) {
    setModo(false);
  
  
  var arqJson = await fetch("https://achieved-prickly-heliotrope.glitch.me/buscar/" + code);
  
  if(arqJson.status === 404) {
    setRes({code:404})
  }else if(arqJson.ok) {
    var arq = await arqJson.json();
    setRes({code: 200,url: arq.url})

  }
  
  
  
  }
}
  
  
   return (
         <div className="options">
         
         {modo ? (
          <div className="codeLayout">
            
            
             {CodeInput()}
             
             <p>Insira o código do arquivo</p>
             <button type="submit" onClick={() => pesquisar()}>Buscar</button>
          </div>
          
         ) : (
         <div className="FindFile">
          {Object.keys(res).length === 0 && (
         <div className="noFile fondTheme">
         <i className="bi bi-search"></i>
       <p>Procurando...</p>
      
         </div>)}
          
           
         {res.code === 404 && (
         <div className="noFile fondTheme" onClick={() => setLayout("padrao")}> 
          <i className="bi bi-file-earmark-x-fill"></i>
       <p>Não encontrado</p>
      
         </div>
         )
         }
         {res.code === 200 && (
         <a href={res.url} target="_blank" rel="noopener noreferrer">
         <div className="noFile blueTheme">
         
       <i className="bi bi-cloud-arrow-down-fill"></i>
       <p>Baixar</p>
       
    </div>
    </a>
    )}
    {Object.keys(res).length === 0 && <p className="p-Down">Este processo pode demorar um pouco</p>}       
    {res.code === 404 && <p className="p-Down" style={{top: "-5vh"}}>Verifique o código ou, caso esteja correto,<br/>a data de expiração do arquivo.</p>}
    {res.code === 200 && <p className="p-Down">Arquivo pronto para download</p>}
    
    </div>
    
         )}
         </div>
       )
};
  