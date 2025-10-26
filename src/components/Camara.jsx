import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import camara_css from "../css/Camara.module.css";
import logo from "../img/logo.png";
import girar from "../img/girar.png";
import ojoabierto from "../img/ojoabierto.png";
import ojocerrado from "../img/ojocerrado.png";
import home from "../img/home.png";
import camapagada from "../img/cam_apagada.png";

export default function CameraScan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const modelRef = useRef(null);
  const animationFrameRef = useRef(null); 
  const [cameraOn, setCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cameraOn) startCamera();
    else stopCamera();
    return () => stopCamera();

  }, [cameraOn, facingMode]);

  async function startCamera() {
    try {
      stopCamera(); // detener cualquier stream previo
      const constraints = { video: { facingMode } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      if (!modelRef.current) {
        setLoading(true);
        modelRef.current = await cocoSsd.load();
        setLoading(false);
      }

      detectObjects();
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      alert("No se pudo acceder a la cámara.");
      setCameraOn(false);
    }
  }

  function stopCamera() {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current); 
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  function rotateCamera() {
    setFacingMode((f) => (f === "environment" ? "user" : "environment"));
  }

  async function detectObjects() {
    if (!videoRef.current || !canvasRef.current || !modelRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loop = async () => {
      if (!cameraOn) return;

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.warn("Video sin dimensiones válidas. Loop detenido.");
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const predictions = await modelRef.current.detect(video);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      predictions.forEach((p) => {
        const [x, y, width, height] = p.bbox;
        const text = `${p.class} (${Math.round(p.score * 100)}%)`;

        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = "rgba(0,0,0,0.6)";
        const textWidth = ctx.measureText(text).width;
        ctx.fillRect(x, y - 20, textWidth + 10, 20);

        ctx.fillStyle = "#00ff88";
        ctx.font = "16px Arial";
        ctx.fillText(text, x + 5, y - 5);
      });

      animationFrameRef.current = requestAnimationFrame(loop); 
    };

    loop();
  }
  return (
    <div className={camara_css.shell}>
      <div className={camara_css.card}>
        <div className={camara_css.logo}>
          <img src={logo} alt="Logo" />
        </div>

        <div className={camara_css.center}>
          {!cameraOn && (
            <div className={camara_css.eyeWrapper}>
              <img
                src={camapagada}
                alt="Camara Apagada"
                className={camara_css.camIcon}
              />
            </div>
          )}

          <video
            ref={videoRef}
            className={cameraOn ? camara_css.videoOn : camara_css.videoOff}
            playsInline
            muted
          />
          <canvas ref={canvasRef} className={camara_css.overlay} />

          {loading && (
            <div className={camara_css.loading}>
              Cargando modelo de detección...
            </div>
          )}
        </div>

        <div className={camara_css.controls}>
          <button
            className={camara_css.controlBtn}
            title="Menú"
            onClick={() => navigate("/home")}
          >
            <img src={home} alt="Home" />
          </button>

          <button
            className={camara_css.controlBtn}
            title="Rotar cámara"
            onClick={rotateCamera}
          >
            <img src={girar} alt="Girar" />
          </button>

          <button
            className={camara_css.captureBtn}
            title={cameraOn ? "Apagar cámara" : "Encender cámara"}
            onClick={() => setCameraOn((prev) => !prev)}
          >
            <img
              src={cameraOn ? ojocerrado : ojoabierto}
              alt={cameraOn ? "Ojo cerrado" : "Ojo abierto"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
