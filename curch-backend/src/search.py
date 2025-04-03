from serpapi import GoogleSearch
from dotenv import load_dotenv
import os
from scrape import scrape_website

load_dotenv()

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


    for url in urls[:3]:
        print(f"\n🔗 Scraping: {url}")
        print(scrape_website(url)[:500], "...") 
 

search("What is the capital of the moon?")