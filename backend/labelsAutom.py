from ultralytics import YOLO
import os

# Modelo YOLO preentrenado
model = YOLO("yolov8s.pt")

# Carpetas
input_folder = "dataset/images/train"
output_folder = "dataset/labels/train"
os.makedirs(output_folder, exist_ok=True)

# Mapeo de clases COCO → Tus clases
COCO_TO_CUSTOM = {
    63: 0,   # laptop → 0
    67: 1,   # cellphone → 1
    64: 2,   # mouse → 2
    66: 3    # keyboard → 3
}

print("Autoetiquetado iniciado...\n")

for img_file in os.listdir(input_folder):
    if not img_file.lower().endswith((".jpg", ".jpeg", ".png")):
        continue

    img_path = os.path.join(input_folder, img_file)
    results = model(img_path, conf=0.35)

    label_path = os.path.join(
        output_folder,
        img_file.rsplit(".", 1)[0] + ".txt"
    )

    with open(label_path, "w") as f:
        for r in results:
            for box in r.boxes:
                coco_id = int(box.cls[0])

                # Filtrar solo nuestras clases
                if coco_id not in COCO_TO_CUSTOM:
                    continue

                custom_id = COCO_TO_CUSTOM[coco_id]

                # Coordenadas normalizadas formato YOLO
                x, y, w, h = box.xywhn[0]

                f.write(f"{custom_id} {float(x)} {float(y)} {float(w)} {float(h)}\n")

    print(f"Etiquetas creadas para: {img_file}")

print("\nAutoetiquetado completado.")