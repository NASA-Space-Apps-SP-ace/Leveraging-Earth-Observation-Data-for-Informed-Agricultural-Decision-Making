import matplotlib.pyplot as plt
import xarray as xr 

file_path = 'data/GLDAS_NOAH025_3H_EP.A20240601.0000.021.nc4'
data = xr.open_dataset(file_path)

soil = data['SoilMoi0_10cm_inst']
soil_plot = soil.isel(time=0)

plt.figure() 
soil_plot.plot(cmap='plasma')
plt.title('Soil Moisture')
plt.savefig('soilmoisture.png', dpi=700)

plt.show()