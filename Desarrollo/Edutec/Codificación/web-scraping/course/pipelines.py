# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import requests
import logging as log


class CoursePipeline:
    API_URL = "http://localhost:3000/api/course"

    def open_spider(self, spider):
        url = f"{self.API_URL}/institution/{spider.institution}"
        requests.delete(url)
        log.info('Courses removed')

    def process_item(self, item, spider):
        requests.post(self.API_URL, data=item)
        return item
