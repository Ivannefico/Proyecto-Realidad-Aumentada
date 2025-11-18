import os
import random
import shutil
from ultralytics import YOLO

# Modelo YOLO preentrenado
model = YOLO("yolov8s.pt")

# Carpetas
ALL_IMAGES = "dataset/images/all"
TRAIN_IMAGES = "dataset/images/train"
VAL_IMAGES = "dataset/images/val"
TRAIN_LABELS = "dataset/labels/train"
VAL_LABELS = "dataset/labels/val"

# Crear carpetas si no existen
for folder in [TRAIN_IMAGES, VAL_IMAGES, TRAIN_LABELS, VAL_LABELS]:
    os.makedirs(folder, exist_ok=True)

# Mapeo COCO → clases personalizadas
COCO_TO_CUSTOM = {
    63: 0,   # laptop → 0
    67: 1,   # cellphone → 1
    64: 2,   # mouse → 2
    66: 3    # keyboard → 3
}

# Obtener lista de imágenes
images = [f for f in os.listdir(ALL_IMAGES) if f.lower().endswith((".jpg", ".jpeg", ".png"))]

# Barajar
random.shuffle(images)

# Dividir 80/20
split_idx = int(len(images) * 0.8)
train_files = images[:split_idx]
val_files = images[split_idx:]

print(f"Total imágenes: {len(images)}")
print(f"Train: {len(train_files)}")
print(f"Val: {len(val_files)}\n")

def process_images(image_list, img_out_folder, label_out_folder):
    for img_file in image_list:
        src = os.path.join(ALL_IMAGES, img_file)
        dst = os.path.join(img_out_folder, img_file)

        # Copiar imagen a su carpeta
        shutil.copy(src, dst)

        # Detectar objetos
        results = model(src, conf=0.35)

        # Crear archivo de etiqueta
        label_path = os.path.join(
            label_out_folder, img_file.rsplit(".", 1)[0] + ".txt"
        )

        with open(label_path, "w") as f:
            for r in results:
                for box in r.boxes:
                    coco_id = int(box.cls[0])
                    if coco_id not in COCO_TO_CUSTOM:
                        continue
                    
                    class_id = COCO_TO_CUSTOM[coco_id]
                    x, y, w, h = box.xywhn[0]

                    f.write(f"{class_id} {float(x)} {float(y)} {float(w)} {float(h)}\n")

        print(f"Etiquetado: {img_file}")

print("Procesando TRAIN...\n")
process_images(train_files, TRAIN_IMAGES, TRAIN_LABELS)

print("\nProcesando VAL...\n")
process_images(val_files, VAL_IMAGES, VAL_LABELS)

print("\n🚀 Dataset preparado y etiquetado con éxito.")