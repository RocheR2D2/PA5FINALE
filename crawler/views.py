from django.shortcuts import render
from django.http import JsonResponse
from crawler import crawl
import logging
from scrapyd_api import ScrapydAPI

logging.getLogger().setLevel(logging.DEBUG)
scrapyd = ScrapydAPI('http://ec2-34-243-179-141.eu-west-1.compute.amazonaws.com:6800')

def crawling(request, research):
    list_result = crawl.crawl_research(research)
    task = {"status":"Failed"}
    if list_result:
        try:
            logging.debug(list_result)
            for url in list_result:
                task = scrapyd.schedule('default', 'quotes', start_urls=[url], allowed_domains=["investmentpolicy.unctad.org"])
            task={'task_id': task, 'status': 'started' }
            logging.info(task)
        except Exception as e:
            logging.exception(e)
    else:
        logging.debug(f"Nothing to crawl for {research}")
    return JsonResponse({"urls_crawled":list_result})
