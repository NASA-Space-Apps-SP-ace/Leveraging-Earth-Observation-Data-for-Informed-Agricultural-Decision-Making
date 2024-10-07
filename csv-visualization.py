import pandas as pd
import geoviews as gv
import geoviews.feature as gf
import cartopy.crs as ccrs
import holoviews as hv
from bokeh.io import show
from bokeh.io import output_file, save, show

hv.extension('bokeh')


df = pd.read_csv('data/SUOMI_VIIRS_C2_Global_VNP14IMGTDL_NRT_2024279.csv')

# Gather points
points = gv.Points(df, kdims=['longitude', 'latitude'], vdims=['bright_ti4', 'bright_ti5', 'frp', 'daynight'])

points_plot = points.opts(
        size = hv.dim('frp') * 0.3,
        color='bright_ti4',
        fill_alpha= '0.3',
        cmap='coolwarm',
        tools=['hover'],
        title="Thermal Anomalies (Fires) Detected by Satellite",
        colorbar=True
)

# Plot
base_map = gf.coastline.opts(scale='10m', projection=ccrs.PlateCarree())
plot = base_map * points_plot

graph = plot.opts(width=800, height=600, projection=ccrs.PlateCarree())
bokeh = hv.render(graph, backend='bokeh')

output_file("thermal_anomalies_plot.html")
save(bokeh)

show(bokeh)