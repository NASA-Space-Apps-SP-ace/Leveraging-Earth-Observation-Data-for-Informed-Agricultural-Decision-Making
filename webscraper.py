import matplotlib.pyplot as plt
import xarray as xr 
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os

token = os.getenv('EARTHDATA_TOKEN')

url = 'https://disc.gsfc.nasa.gov/datasets?keywords=GLDAS&sort=endDate&page=1'

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--log-level=3")  
chrome_options.add_argument("--remote-debugging-port=9222") 
driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

driver.get(url)

try:
    button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-gtm-tag="Subset / Get Data"]'))
    )

    button.click()

    print("Button clicked successfully!")

except Exception as e:
    print(f"Error: {e}")

finally:
    try:
        """
        getDataButton = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Get Data')]"))
        )
        """
        getDataButton = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.btn.btn-success.modal-footer-btn'))
        )
        getDataButton.click()
        print("Secondary Get Data Button clicked successfully")
    finally:
        try:
            element = WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.XPATH,  "//a[contains(@download, 'README Document')]"))
            )

            if element:
                print('README link found!')
            else:
                print('README link not found!')

            soup = BeautifulSoup(driver.page_source, 'html.parser')
            
            links = [link.get('href') for link in soup.find_all('a', {'class': ['word-wrap', 'ng-binding']}) if link.get('href') and link.get('href').endswith('.nc4')]

            if not links:
                print('No links found')
            latest_nc4_link = links[0]
            
        
            if latest_nc4_link:
                print("Latest .nc4 file link:", latest_nc4_link)
            else:
                print("No .nc4 file found.")
            
            download_folder = 'data'
            filename = os.path.join(download_folder, os.path.basename(latest_nc4_link))
            agent = {
                "User-Agent":'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'Authorization': 'Bearer ' + token 
            }
            response = requests.get(latest_nc4_link, allow_redirects=True, headers=agent)
            with open(filename, 'wb') as f:
                f.write(response.content)
            print('File downloaded successfully!')
            print(filename)

        except Exception as e:
            print(f"Error: {e}")

        finally:
            driver.quit()

file_path = 'data/GLDAS_NOAH025_3H_EP.A20240601.0000.021.nc4'
data = xr.open_dataset(file_path)
for var_name in data.data_vars:
    print(var_name)


soil = data['SoilMoi0_10cm_inst']
soil_plot = soil.isel(time=0)


plt.figure() 
soil_plot.plot(cmap='plasma')
plt.title("Soil Moisture")


plt.savefig('soilmoisture.png', dpi=700)

plt.show() 