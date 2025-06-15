import React from 'react';
import '../css/camara.css';
import { useEffect } from 'react';

const Scaner = () => {
  useEffect(() => {
    const video = document.getElementById('videoInput');
    const canvas = document.getElementById('canvasCapture');

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(err => {
        console.error("No se pudo acceder a la cámara:", err);
      });
  }, []);

  return (
    // Tu componente como ya lo tenés
    <div>
      <button
        id="activarVoz"
        style={{ position: 'absolute', zIndex: 10, top: '10px', left: '10px' }}
      >
        Activar Voz
      </button>

        <div
            id="infoObjeto"
            style={{
                position: 'absolute',
                zIndex: 10,
                bottom: '10px',
                left: '10px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                padding: '10px',
            }}
        >
            Información aparecerá aquí...
        </div>

        <a-scene embedded arjs>
            <a-marker preset="hiro">
                <a-box position="0 0.5 0" material="color: yellow;"></a-box>
            </a-marker>
            <a-entity camera></a-entity>
        </a-scene>

        <video id="videoInput" autoPlay playsInline style={{ display: 'none' }}></video>
        <canvas id="canvasCapture" style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default Scaner;
