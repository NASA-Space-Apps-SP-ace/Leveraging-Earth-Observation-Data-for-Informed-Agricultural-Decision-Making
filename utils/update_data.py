from scraper_helper import scrape
from graph_helper import save_graph

def download_graph(image_path):
    data_file = scrape()
    save_graph(image_path, data_file)

def image_to_bytes(image_path):
    with open(image_path, 'rb') as image_file:
        image_bytes = image_file.read()
    return image_bytes

def images_are_different(img1, img2):
    # Compare images using hash
    img1_bytes = image_to_bytes(img1)
    img2_bytes = image_to_bytes(img2)
    if (image_to_bytes(img1) == image_to_bytes(img2)):
        print('These are the same images')
    return img1_bytes != img2_bytes

download_graph('soilmoisture.png')