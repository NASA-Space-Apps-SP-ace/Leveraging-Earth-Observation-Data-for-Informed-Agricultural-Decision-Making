from flask import Flask
from flask import send_file
from flask import render_template_string
import hashlib
import sys
import os
from PIL import Image

import update_data
from update_data import download_graph, images_are_different

app = Flask(__name__)

# Image constants
IMAGE_PATH = 'sp_ace/public/soilmoisture.png'
LOCAL_IMAGE_PATH = 'soilmoisture.png'

@app.route('/')
def index():
    # Download the latest image
    download_graph(LOCAL_IMAGE_PATH)

    # Compare images
    new_image = IMAGE_PATH
    if new_image:
        if os.path.exists(LOCAL_IMAGE_PATH):
            # Open the local image for comparison
            local_image = Image.open(LOCAL_IMAGE_PATH)
            if images_are_different(new_image, local_image):
                new_image == LOCAL_IMAGE_PATH  # Update the local image
                print("Image updated.")
            else:
                print("Image is the same.")
        else:
            new_image.save(LOCAL_IMAGE_PATH)
            print("Image downloaded for the first time.")
    else:
        print("Failed to download image.")

index()
images_are_different(IMAGE_PATH, LOCAL_IMAGE_PATH)