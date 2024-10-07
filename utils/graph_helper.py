import matplotlib.pyplot as plt
import xarray as xr
from scraper_helper import scrape

def print_data_vars(data):
    for var_name in data.data_vars:
        print(var_name)

def save_graph(image_path, data_path): # Saves image of graph to directory. Currently only works for soil moisture.
    data = xr.open_dataset(data_path)

    soil = data['SoilMoi0_10cm_inst']
    soil_plot = soil.isel(time=0)

    plt.figure() 
    soil_plot.plot(cmap='plasma')
    plt.title("Soil Moisture")

    plt.draw()
    plt.savefig(image_path, dpi=700)
    plt.show()

def download_graph():
    data_file = scrape()
    save_graph('soilmoisture.png', data_file)