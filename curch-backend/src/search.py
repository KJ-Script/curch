from serpapi import GoogleSearch
from dotenv import load_dotenv
import os
from scrape import scrape_website
import json
load_dotenv()

scraped_results = []

def search(query: str):
    params = {
        "api_key": os.getenv("SERPAPI_KEY"),
        "engine": "google",
        "q": query,
        "location": "Austin, Texas, United States",
        "google_domain": "google.co.uk",
        "gl": "uk",
        "hl": "en"
    }
    
    search = GoogleSearch(params)
    results = search.get_dict()
    
    urls = [result["link"] for result in results.get("organic_results", [])]
    print("Found URLs:", urls)


    for url in urls:
        print(f"\n🔗 Scraping: {url}")
        r = scrape_website(url)
        scraped_results.append(r)
 
    return scraped_results
