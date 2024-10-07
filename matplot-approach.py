import netCDF4 as nc
import matplotlib.pyplot as plt


file_path = 'data/MERRA2_400.inst3_3d_asm_Np.20240901.nc4'
dataset = nc.Dataset(file_path)

print("Dimensions of the dataset:")
for dim_name, dim in dataset.dimensions.items():
    print(f"{dim_name}: {len(dim)}")

# Gather data
lat = dataset.variables['lat'][:]
lon = dataset.variables['lon'][:]
time = dataset.variables['time'][:]
EPV = dataset.variables['EPV'][:]  


time_index = 0
level_index = 0
time_max = dataset.dimensions['time'].size
level_max = dataset.dimensions['lev'].size

plt.ion()
fig, ax = plt.subplots(figsize=(12, 6))

for level_index in range(level_max):
    for time_index in range(time_max):
        data_slice = EPV[time_index, level_index, :, :]
        ax.clear()

        # Making contour plot
        contour = ax.contourf(lon, lat, data_slice, cmap='viridis', levels=100)
        
        if time_index == 0 and level_index == 0:
            cbar = fig.colorbar(contour, ax=ax, label='EPV')

        ax.set_xlabel('Longitude')
        ax.set_ylabel('Latitude')
        ax.set_title(f'EPV at Time Index {time_index} and Level Index {level_index}')
        
        fig.canvas.draw()
        plt.pause(0.01)

dataset.close()
