from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import tempfile
import os

app = Flask(__name__)
CORS(app)

# Cargar el modelo YOLO
model = YOLO("yolov8s.pt")  # descarga automática si no lo tienes

@app.route("/scan", methods=["POST"])
def scan_image():
    if "image" not in request.files:
        return jsonify({"error": "No se recibió ninguna imagen"}), 400

    image_file = request.files["image"]

    # Guardar la imagen temporalmente
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        image_file.save(temp_file.name)
        temp_path = temp_file.name

    try:
        # Ejecutar detección
        results = model(temp_path, conf=0.35)
        detections = []
        for result in results:
            for box in result.boxes:
                cls_id = int(box.cls[0])
                name = result.names[cls_id]
                conf = float(box.conf[0])
                detections.append({"objeto": name, "confianza": round(conf, 2)})

        os.remove(temp_path)
        return jsonify({"detecciones": detections})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
