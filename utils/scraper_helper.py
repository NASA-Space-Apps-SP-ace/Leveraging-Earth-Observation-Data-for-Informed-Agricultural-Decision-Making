import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os

def create_driver():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--log-level=3")  
    chrome_options.add_argument("--remote-debugging-port=9222") 
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)
    return driver

def open_panel(driver):
    try:
        open_panel_btn = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-gtm-tag="Subset / Get Data"]'))
        )
        open_panel_btn.click()
        print('Open Panel Button "Subset / Get Data" clicked successfully!')
    except Exception as e:
        print(f"Error: {e}")
        return False
    finally:
        return True

def click_get_data(driver):
    try:
        get_data_btn = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.btn.btn-success.modal-footer-btn'))
        )
        get_data_btn.click()
        print("Get Data Button clicked successfully")
    except Exception as e:
        print(f"Error: {e}")
        return False
    finally:
        return True

def get_data(file_extension, driver):
    try:
        readme_link = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.XPATH,  "//a[contains(@download, 'README Document')]"))
        )

        if readme_link:
            print('README link found!')
        else:
            print('README link not found!')

        soup = BeautifulSoup(driver.page_source, 'html.parser')
        
        links = [link.get('href') for link in soup.find_all('a', {'class': ['word-wrap', 'ng-binding']}) if link.get('href') and link.get('href').endswith(file_extension)]

        if not links:
            print('No links found')
        latest_link = links[0]
        
        if latest_link:
            print("Latest file link:", latest_link)
        else:
            print('f"No {file_extension} file found"')
    except Exception as e:
        print(f"Error: {e}")

    finally:
        return latest_link

def download_data(link, token):
    download_folder = 'data'
    filename = os.path.join(download_folder, os.path.basename(link))
    agent = {
        "User-Agent":'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
        'Authorization': 'Bearer ' + token 
    }
    response = requests.get(link, allow_redirects=True, headers=agent)
    with open(filename, 'wb') as f:
        f.write(response.content)
    print('File downloaded successfully!')
    print(filename)
    return filename

def scrape(): # Parameters: url, token. Scrapes database and returns downloaded file
    token = os.getenv('EARTHDATA_TOKEN')
    driver = create_driver()
    
    url = 'https://disc.gsfc.nasa.gov/datasets?keywords=GLDAS&sort=endDate&page=1'
    driver.get(url)

    if open_panel(driver):
        if click_get_data(driver):
            link = get_data('.nc4', driver)
            filename = download_data(link, token)
            driver.quit()
            return filename