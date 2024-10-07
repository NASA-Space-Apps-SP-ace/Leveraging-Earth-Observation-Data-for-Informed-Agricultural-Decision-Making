import matplotlib.pyplot as plt
import xarray as xr

file_path = 'data/GLDAS_NOAH025_3H_EP.A20240601.0000.021.nc4'
data = xr.open_dataset(file_path)

# Plot rain data
rain = data['Rainf_tavg']
rain_plot = rain.isel(time = 0)
rain_plot.plot(cmap = 'plasma')
plt.title("Total Precipitation Rate")

plt.savefig('precipitation.png', dpi=700)  

plt.show()  
