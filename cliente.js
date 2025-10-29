// Iniciar cámara HTML5 (no A-Frame)
const video = document.getElementById('videoInput');
const canvas = document.getElementById('canvasCapture');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("No se pudo acceder a la cámara:", err);
  });

// Captura y devuelve una imagen base64 del fotograma actual
function capturarFrameDeLaCamara() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, width, height);

  // Retorna la imagen como base64 (puede usarse en backend o IA)
  return canvas.toDataURL('image/png');
}