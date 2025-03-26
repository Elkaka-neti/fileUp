import * as React from "react";
import {
  useState,
  useEffect,
  useRef,
  useContext
} from "react";


import "./styles/styles.css";
import Download from "./components/download.jsx";
import Upload from "./components/upload.jsx";
import { LayoutTag } from "./database.jsx";

export default function Main() {
  const {layout, setLayout} = useContext(LayoutTag);
  const star = useRef([]);
  const inputRef = useRef(null);
  const [fileInp, setFile] = useState(null);

  const stars = [
    {width: "10%", height: "5%", left: "70%"}, 
    {width: "5%", height: "2.5%", left: "65%"},
    {width: "7%", height: "3.5%", left: "68%", top: "35%"},
    {width: "10%", height: "5%", left: "20%", top: "45%"},
    {width: "5%", height: "2.5%", left: "30%", top: "49%"}
    ]
    

  const arqSelecionado = () => {
    const file = inputRef.current.files[0] ? inputRef.current.files[0] : false;
    if (file) {
      setFile(file);
    }
  };

useEffect(() => {
    const voltar = () => {
      
     setLayout("padrao");
    };

    window.onpopstate = voltar;

    return () => {
      window.onpopstate = null;
    };
  }, []);

  
  
  
  
  
  
  
  
  function color() {
    switch (layout) {
      case 'download':
        return {color: "#91a9ff"}
        break;
      case 'upload':
        return {color: "#fba8a6"}
        break;
      default:
        return {color: "#FF914D"};
    }
  }
  
  return (
    <div>
     <div className="col-12 head">
        <h1>E.E Jason de Morais</h1>
        <div>
         <i className="bi bi-emoji-laughing-fill"></i>
        </div>
     </div>
     <div className="col-12 main">
       <h1>Seus <span>trabalhos</span> <i className="bi bi-pencil-square" style={color()}></i>, <span>tarefas</span> <i className="bi bi-file-text" style={color()}></i><br/>‎‎     e <span>apresentações</span> <i className="bi bi-laptop" style={color()}></i> salvas.</h1>
       <p>Envie o arquivo, copie ou anote o código de autorização e use a qualquer</p>
       <p>momento em sua apresentação.</p>
       <br/><br/>
       <div className="plong">
        {layout === "padrao" && (
        <img src="src/Images/plong.jpg" className="face"/>
        )}
        {layout === "download" && (
          <img src="src/Images/plongblue.png" className="face"/>
        )}
        {layout === "upload" && (
          <img src="src/Images/plongred.png" className="face"/>
        )}
         
         <div className="faces" onClick={() => setLayout("padrao")}>
         <img src="src/Images/face.png" className={
           layout == "padrao" ? "rosto" : "rosto anim"
         }/>
         </div>
        
        <div>
        { stars.map((estrela, key) => {
          var d = "src/" + layout.replace("padrao", "Images/star.png").replace("download", "Images/starblue.png").replace("upload", "Images/starred.png")
          return (
           <img key={key} src={d}  className="star" style={estrela}/>
          )
        })}
         
        </div>
       </div>
       
        {layout === "padrao" && (
       <div className="options">
        <div className="download" onClick={() => {setLayout("download"); window.history.pushState({}, "", "/buscar")}}>
           <img src="src/Images/downloadBtn.png"/>
           <i className="bi bi-file-earmark-arrow-down-fill"></i>
           <p>Buscar</p>
        </div>
        
        <div className="upload" onClick={() => {setLayout("upload"); inputRef.current.click(); window.history.pushState({}, "", "/enviar")}} style={Date.now() < localStorage.getItem("timeout") ? {opacity: "0.5", pointerEvents:"none"} : {}}>
          
           <img src="src/Images/uploadBtn.png"/>
           <i className="bi bi-file-earmark-arrow-up-fill"></i>
           <p>Guardar</p>
           
        </div>
       </div>
       )}
       {layout === "download" && (<Download/>)}
       <input type="file" ref={inputRef} onChange={arqSelecionado} style={{ display: 'none' }} accept=".pptx, .pdf, .docx, .txt, .png, .jpg, .mp4, .pptx"/>
       {layout === "upload" && <Upload file={fileInp} input={inputRef}/>}
       
       {Date.now() < localStorage.getItem("timeout") && <div className="avisosC" style={{background: "red", top: "5%"}}>Você poderá enviar um arquivo novamente às     {new Date(+localStorage.getItem("timeout")).getHours()}:{new Date(+localStorage.getItem("timeout")).getMinutes()}</div>}
     </div>
    </div>
    )
}