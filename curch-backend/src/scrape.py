import requests
from bs4 import BeautifulSoup
import json

def scrape_website(url: str):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    paragraphs = [p.text for p in soup.find_all('p')]
    
    
    with open('scraped_data.json', 'w', encoding='utf-8') as f:
        json.dump(paragraphs, f, ensure_ascii=False, indent=4)
    return paragraphs



