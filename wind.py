import matplotlib.pyplot as plt
import xarray as xr 

file_path = 'data/GLDAS_NOAH025_3H_EP.A20240601.0000.021.nc4'
data = xr.open_dataset(file_path)

for var_name in data.data_vars:
    print(var_name)

wind = data['Wind_f_inst']
wind_plot = wind.isel(time = 0)
wind_plot.plot(cmap = 'inferno')
plt.title("Wind Speed")

plt.savefig('wind.png', dpi=700)  

plt.show()  
