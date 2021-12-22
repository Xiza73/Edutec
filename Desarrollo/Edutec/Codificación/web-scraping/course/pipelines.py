# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import requests


class CoursePipeline:
    API_URL = "http://localhost:3000/api/course"

    def process_item(self, item, spider):
        response = requests.post(self.API_URL, data=item)
        return item
