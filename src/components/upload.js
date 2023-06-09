import { useState, useEffect } from "react";
import axios from 'axios';
import style from "../assets/styles.module.css"; 
import ProgressBar from 'react-bootstrap/ProgressBar';
import ReactAudioPlayer from 'react-audio-player';


export const Upload = () => {
    const [file, setFile] = useState(null);
    const [fileImagePreview, setFileImagePreview] = useState();
    const [tempo, setTempo] = useState(100);
    const [guido,setGuido] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {

    
        // exit early when we reach 0
        if (!timeLeft) return;
    
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft + 1);
        }, 70);
    
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
      }, [timeLeft]);

    const uploadFile = () => {
      if (file)
      {
        var reader = new FileReader();
        reader.readAsDataURL(file);
  
        reader.onloadend = function () {
          console.log("sending image...");
          axios
            .post("https://4c08-157-159-39-17.ngrok-free.app/photo", {
              photo: reader.result,
              tempo: tempo
            })
            .then(() => {
              axios.get('https://4c08-157-159-39-17.ngrok-free.app/getGmn').then(function(response){
                  setGuido(response.data);
              });

              axios.get('https://4c08-157-159-39-17.ngrok-free.app/getMid', {
                responseType: 'arraybuffer',
              }).then(function(response){
                let blob = new Blob([response.data], { type: "audio/wav" }),
                downloadUrl = window.URL.createObjectURL(blob);
                //const audio = new Audio(downloadUrl)
                //audio.load()
                //audio.play()
                setAudioUrl(downloadUrl);
              });

            });
        };
        
      }
    };

    const downloadFiles = () => {
      var FileSaver = require("file-saver");
      FileSaver.saveAs(
        "https://4c08-157-159-39-17.ngrok-free.app/getGmn",
        "musicGmn.gmn"
      );
      FileSaver.saveAs(
        "https://4c08-157-159-39-17.ngrok-free.app/getMid",
        "musicWav.wav"
      );
    };

    const fileData = () => {
      if (file && !file) 
      {
        return (
          <div>
            <h4>File details:</h4>
            <p>File Name: {file.name}</p>
            <p>File Type: {file.type}</p>
            <p>Last Modified: {file.lastModifiedDate.toDateString()}</p>
          </div>
        );
      } 
      else 
      {
        return (
            <h4>Choose before pressing the upload button</h4>
        );
      }
    };

    const playAudio = () => {
      if (audioUrl) 
      {
        return (
          <div>{audioUrl && <ReactAudioPlayer src={audioUrl} controls autoPlay={false} />}
          <br></br>
          <br></br>
          <button className={style.bottone4} onClick={downloadFiles}>Download Files</button>
          </div>
          
        );
      } 
      else 
      {
        return (
            <p>Waiting for the conversion...</p>
        );
      }
    };

    const fileUpdate = (e) => {
      setFile(e.target.files[0]);
      setFileImagePreview(URL.createObjectURL(e.target.files[0]));
    }
      //
    return (
      <div className={style.outside}>
        <div className={style.bigblue}>
        <img 
          src={require('../assets/prantos.png')} 
          alt="logo" 
        />
        <br></br>
        <p>Preview:</p>
        <img src={fileImagePreview} className={style.previewImage}/>
          <br></br>
          <p>The GUIDO file generated:</p>
          <p>{guido}</p>
          <div className={style.features}>
            <div className={style.bloco}>
              <h3>Upload your music sheet!</h3>
              <br></br>
              <input type="file" onChange={fileUpdate} />
              <br></br>
              <br></br>
              {fileData()}
              <br></br>
              <ProgressBar now={timeLeft} />
            </div>
            <div className={style.bloco}>
              <h3>Choose the tempo: </h3>
              <p>The tempo is: {tempo} BPM</p>
              <button className={style.bottone5} onClick={() =>setTempo(60)}>60BPM</button>
              <button className={style.bottone5} onClick={() =>setTempo(100)}>100BPM</button>
              <button className={style.bottone5} onClick={() =>setTempo(140)}>140BPM</button>
              <p>Enter manually: </p>
              <input type="number"  onChange={(e) => setTempo(e.target.value)} />
              <br></br>
              <br></br>
              <button className={style.bottone4} onClick={() => {uploadFile();setTimeLeft(1)}}>Upload!</button>
            </div>

            <div className={style.bloco}>
              <h3>Play your music!</h3>
              <br></br>
              <br></br>
              {playAudio()}
            </div>
          </div>
        </div>
      </div>

      
    );
};