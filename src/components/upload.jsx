import * as React from "react";
import { useRef, useState, useContext, useEffect } from "react";
import {LayoutTag} from "../database.jsx"
import "../styles/styles.css";
export default function Upload({file, input}) {
  console.log(file)
  const [modo, setModo] = useState(false);
  const {layout, setLayout} = useContext(LayoutTag);
  const [resposta, setResposta] = useState("XXXXX");
  const isMounted = useRef(true);
  const [clip,setClip] = useState(false);
  const [alert, setAlert] = useState(null);
  
  function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false; 
    };
  }, []);

useEffect(() => {
  if(modo) {
    
    send();
  }
  if(file) {
  alert("h")
  }
   if( file?.size > 1 * 1024 * 1024) {
      alert("g")
    }

  
}, [modo]);

async function send() {
  const formData = new FormData();
    formData.append('arquivo', file);

    try {
      const response = await fetch('https://achieved-prickly-heliotrope.glitch.me/enviar', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data)
      if(isMounted.current) {
      setResposta(data.codigo)
      }
      
    } catch (err) {
      console.error('Erro ao enviar o arquivo:', err);
    }
 
 
}

 
  
function files() {
  return (
    <div className="verifyFile">
    
    
       <div className="v-file">
       {[".pdf"].includes("." + file.name.match(/\.([a-zA-Z0-9]+)$/)[1]) && (
           <img style={{border: "2px solid red", width: "70%", height: "70%", background: "white"}} src="https://img.icons8.com/?size=100&id=1GYw3hjmA6mH&format=png&color=000000"/>
           ) }
           {[".pptx", ".ppt"].includes("." + file.name.match(/\.([a-zA-Z0-9]+)$/)[1]) && (
           <img style={{border: "2px solid orange", width: "60%", height: "60%", background: "white"}} src="https://img.icons8.com/?size=100&id=81726&format=png&color=000000"/>
           ) }
           {[".docx", ".txt", ".doc"].includes("." + file.name.match(/\.([a-zA-Z0-9]+)$/)[1]) && (
           <img style={{border: "2px solid blue", width: "60%", height: "60%", background: "white"}} src="https://img.icons8.com/?size=100&id=117563&format=png&color=000000"/>
           ) }
        {[".jpeg", ".png", ".jpg"].includes("." + file.name.match(/\.([a-zA-Z0-9]+)$/)[1]) && <img src={URL.createObjectURL(file)}/>}
       
            <h5>{file.name.match(/^(.*)\.[^.]+$/)[1]}</h5>
            <span>{"." + file.name.match(/\.([a-zA-Z0-9]+)$/)[1]}</span>
            <p>{formatFileSize(file.size)}</p>
       </div>
        {/*alert && <div className="avisosC" style={{background:"red"}}>Arquivo maior que 50Mb</div>*/}
       <a className="v-escolher" onClick={() => input.current.click()}>Escolher outro arquivo</a>
       <button className="v-btn" onClick={() => enviado()} disabled>Selecionar</button>
    </div>
    
    )
}

function enviado() {
  setModo(true);
  var date = new Date();
  date.setMinutes(date.getMinutes() + 20);
  
  localStorage.setItem("timeout", date.getTime())
}


function clipboard() {
  setClip(true);
  navigator.clipboard.writeText(resposta);
  setTimeout(() => {
    setClip(false)
  },2000)
}

function verify() {
  if(modo) {
return (
    <div className="verifyFile">
    {resposta && (
         <div className="inputsCode" onClick={() => clipboard()}>
         {[...Array(5)].map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          value={resposta[i]}
          readOnly
        />
      ))}
        <i className="bi bi-copy"></i>
         </div>
         )}
         {clip && <div className="avisosC">Copiado para a área de transferência</div>}
         <p className="v-aviso">{resposta != "XXXXX" ? "Guarde este código em um caderno, em uma folha ou em qualquer outro meio que facilite sua lembrança para que possa inseri-lo posteriormente." : "Por favor, aguarde um momento enquanto o sistema processa e salva seus dados."}</p>
         <p style={{fontWeight: "bold"}} className="v-aviso">{resposta != "XXXXX" ? "O arquivo tem duração de 2 dias." : "Carregando..."}</p>
         <button className="v-btn" onClick={() => setLayout("padrao")}>OK</button>
       </div>
  
    )
 
  }
  if(!modo) return files();
}

  return (
    
    <div>
    {file ? verify() : (
    <div className="noFile" onClick={() => input.current.click()}>
       <i className="bi bi-file-earmark-slides-fill"></i>
       <p>Selecione um arquivo</p>
    </div>
    )}
    
    </div>
    
    )
 
 
 
}