import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
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

  // --- Detener cámara ---
  const stopCamera = useCallback(() => {
    // Cancelar la animación de detección
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Detener transmisión de video
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    // Limpiar video y canvas
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      videoRef.current.load();
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, []);

  // --- Detectar objetos ---
  const detectObjects = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !modelRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loop = async () => {
      // Si se apagó la cámara, salir del bucle
      if (!cameraOn || !video.srcObject) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      try {
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
          ctx.fillRect(x, y - 20, ctx.measureText(text).width + 10, 20);

          ctx.fillStyle = "#00ff88";
          ctx.font = "16px Arial";
          ctx.fillText(text, x + 5, y - 5);
        });
      } catch (err) {
        console.warn("Error en detección:", err);
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    loop();
  }, [cameraOn]);

  // --- Iniciar cámara ---
  const startCamera = useCallback(async () => {
    try {
      stopCamera();
      let stream = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
      } catch (err) {
        console.warn(
          `No se pudo usar facingMode="${facingMode}", intentando cámara por defecto...`,
          err
        );
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current
              .play()
              .catch((err) => console.log("Error al reproducir video:", err));
            resolve();
          };
        });
      }

      // Backend de TensorFlow
      setLoading(true);
      if (!tf.getBackend()) {
        await tf.setBackend("webgl");
      }
      await tf.ready();

      if (!modelRef.current) {
        modelRef.current = await cocoSsd.load();
      }
      setLoading(false);

      detectObjects();
    } catch (err) {
      console.error("Error al acceder a la cámara:", err.name, err.message);
      alert(`No se pudo acceder a la cámara: ${err.message}`);
      setCameraOn(false);
    }
  }, [facingMode, stopCamera, detectObjects]);

  // --- Efectos ---
  useEffect(() => {
    if (cameraOn) startCamera();
    else stopCamera();

    return () => stopCamera();
  }, [cameraOn, startCamera, stopCamera]);

  useEffect(() => {
    if (cameraOn) startCamera();
  }, [facingMode]);

  // --- Rotar cámara ---
  const rotateCamera = () => {
    setFacingMode((f) => (f === "environment" ? "user" : "environment"));
  };

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
                alt="Cámara apagada"
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
