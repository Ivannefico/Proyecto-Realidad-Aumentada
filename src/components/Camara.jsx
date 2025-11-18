import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

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
  const animationFrameRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");

  const navigate = useNavigate();

  // ------------------------
  // BOTÓN: APAGAR CÁMARA
  // ------------------------
  const stopCamera = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

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

  // ------------------------
  // CAPTURAR FRAME → BLOB
  // ------------------------
  async function captureFrame() {
    const video = videoRef.current;
    if (!video) return null;

    const canvasTmp = document.createElement("canvas");
    canvasTmp.width = video.videoWidth;
    canvasTmp.height = video.videoHeight;

    const ctx = canvasTmp.getContext("2d");
    ctx.drawImage(video, 0, 0);

    return new Promise((resolve) =>
      canvasTmp.toBlob(resolve, "image/jpeg", 0.9)
    );
  }

  // ------------------------
  // DETECCIÓN POR BACKEND
  // ------------------------
  const detectObjects = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");

    const loop = async () => {
      if (!cameraOn || !video.srcObject) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const frameBlob = await captureFrame();
      let detections = [];

      if (frameBlob) {
        const formData = new FormData();
        formData.append("image", frameBlob, "frame.jpg");

        try {
          const res = await fetch("http://127.0.0.1:5000/scan", {
            method: "POST",
            body: formData,
          });
          const json = await res.json();
          detections = json.detecciones || [];
        } catch (err) {
          console.warn("Error enviando frame al backend:", err);
        }
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      detections.forEach((d) => {
        if (!d.box) return;

        const { x, y, w, h } = d.box;
        const text = `${d.objeto} (${Math.round(d.confianza * 100)}%)`;

        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);

        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(x, y - 20, ctx.measureText(text).width + 10, 20);

        ctx.fillStyle = "#00ff88";
        ctx.font = "16px Arial";
        ctx.fillText(text, x + 5, y - 5);
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    loop();
  }, [cameraOn]);

  // ------------------------
  // ENCENDER CÁMARA
  // ------------------------
  const startCamera = useCallback(async () => {
    try {
      stopCamera();

      let stream = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(() => {});
            resolve();
          };
        });
      }

      detectObjects();
    } catch (err) {
      alert(`No se pudo acceder a la cámara: ${err.message}`);
      setCameraOn(false);
    }
  }, [facingMode, stopCamera, detectObjects]);

  // ------------------------
  // EFECTOS
  // ------------------------
  useEffect(() => {
    if (cameraOn) startCamera();
    else stopCamera();

    return () => stopCamera();
  }, [cameraOn, startCamera, stopCamera]);

  useEffect(() => {
    if (cameraOn) startCamera();
  }, [facingMode]);

  const rotateCamera = () => {
    setFacingMode((f) => (f === "environment" ? "user" : "environment"));
  };

  // -----------------------------------------------------
  // INTERFAZ
  // -----------------------------------------------------
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