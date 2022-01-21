# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from scrapy import Item, Field


class CourseItem(Item):
    # define the fields for your item here like:
    institutionName = Field()
    name = Field()
    description = Field()
    image = Field()
    price = Field()
    currency = Field()
    start = Field()
    duration = Field()
    schedule = Field()
    url = Field()
