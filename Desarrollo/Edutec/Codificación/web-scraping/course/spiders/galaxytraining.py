import scrapy
from ..items import CourseItem


class GalaxytrainingSpider(scrapy.Spider):
    name = 'galaxytraining'
    allowed_domains = ['online.galaxy.edu.pe']
    start_urls = ['https://online.galaxy.edu.pe/']

    def parse(self, response):
        courses = response.xpath('//article/div/a')

        for course in courses:
            course_link = course.xpath('.//@href').get()
            yield response.follow(url=course_link, callback=self.parse_course, meta={'url': course_link})

    def parse_course(self, response):
        item = CourseItem()

        schedule = response.xpath("//div/div/p/span[text()='date_range']/../text()").get()
        price = response.xpath("//span[@itemprop='price']/text()").get()

        item['institutionName'] = 'Galaxy Training'
        item['name'] = response.xpath("//h1[@itemprop='name']/text()").get().strip()
        item['description'] = response.xpath("//div[@class='product-description']/p[1]/text()").get().strip()
        item['image'] = response.xpath("//img[@class='js-modal-product-cover product-cover-modal']/@src").get().strip()
        item['price'] = price[2:].strip()
        item['currency'] = 'PEN'
        item['start'] = schedule[9:14].strip()  # 15/01
        item['duration'] = response.xpath("//div/div/p/span[text()='watch_later']/../text()").get().strip()
        item['schedule'] = (schedule[15].upper() + schedule[16:]).strip()
        item['url'] = response.request.meta['url'].strip()

        yield item
