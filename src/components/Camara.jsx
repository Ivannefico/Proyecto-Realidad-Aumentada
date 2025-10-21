import React, { useEffect, useRef, useState } from "react";
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
  const [cameraOn, setCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const navigate = useNavigate();

  useEffect(() => {
    if (cameraOn) startCamera();
    else stopCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraOn, facingMode]);

  async function startCamera() {
    try {
      stopCamera();
      const constraints = { video: { facingMode } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      alert("No se pudo acceder a la cámara.");
      setCameraOn(false);
    }
  }

  function stopCamera() {
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

  async function captureAndScan() {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((res) =>
      canvas.toBlob(res, "image/jpeg", 0.9)
    );

    if (!blob) {
      alert("Error al capturar la imagen");
      return;
    }

    const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
    await scanImage(file);
  }

  async function scanImage(file) {
    try {
      const form = new FormData();
      form.append("image", file);
      const API_URL = "https://tu-api/scan";

      const res = await fetch(API_URL, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        alert("La API devolvió un error");
        return;
      }

      const data = await res.json();
      console.log("Resultado del escaneo:", data);
      alert("Escaneo completado (ver consola)");
    } catch (err) {
      console.error("Error en scanImage:", err);
      alert("No se pudo conectar con la API.");
    }
  }

  return (
    <div className={camara_css.shell}>
      <div className={camara_css.card}>
        {/* Logo */}
        <div className={camara_css.logo}>
          <img src={logo} alt="Logo" />
        </div>

        {/* Zona central */}
        <div className={camara_css.center}>
          {!cameraOn && (
            <div className={camara_css.eyeWrapper}>
              <img src={camapagada} alt="Camara Apagada" className={camara_css.camIcon} />
            </div>
          )}

          <video
            ref={videoRef}
            className={cameraOn ? camara_css.videoOn : camara_css.videoOff}
            playsInline
          />

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        {/* Controles */}
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
