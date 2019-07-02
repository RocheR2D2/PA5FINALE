# -*- coding: utf-8 -*-
import scrapy
import logging

class QuotesSpider(scrapy.Spider):
    name = "quotes"
    allowed_domains = ["investmentpolicyhub.unctad.org"]
    def start_requests(self):
        logging.debug(f"Start requests : {self.start_urls}")
        yield scrapy.Request(self.start_urls, self.parse)

    def parse(self, response):
  
        short_title = response.xpath('//*[@id="case-short-title"]/text()').extract_first()
        full_title = response.xpath('//*[@id="case-full-title"]/text()').extract_first()
        arbitration_rules = response.xpath('//*[@id="rules-institution-content"]/div[1]/div/text()').extract_first()
        decisions_rendered = response.xpath('//*[@id="decisions-content"]//div[last()]/a/text()').extract_first()

        yield{
        	'short_title': short_title,
        	'full_title': full_title,
        	'arbitration_rules': arbitration_rules,
        	'decisions_rendered': decisions_rendered,
                'url': self.start_urls}
