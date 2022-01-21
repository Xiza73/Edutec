import scrapy
from ..items import CourseItem


class GalaxytrainingSpider(scrapy.Spider):
    institution = 'Galaxy Training'
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

        schedule = response.xpath("//div/div/p/span[text()='date_range']/../text()").get(default='')
        start = schedule[9:14].strip() + '/2022'  # 15/01
        price = response.xpath("//span[@itemprop='price']/text()").get(default='')

        item['institutionName'] = 'Galaxy Training'
        item['name'] = response.xpath("//h1[@itemprop='name']/text()").get(default='')
        item['description'] = response.xpath("//div[@class='product-description']/p[1]/text()").get(default='')
        item['image'] = response.xpath("//img[@class='js-modal-product-cover product-cover-modal']/@src").get(default='')
        item['price'] = (price[2:]).replace(',', '')
        item['currency'] = 'PEN'
        item['start'] = self.__format_date(start)
        item['duration'] = response.xpath("//div/div/p/span[text()='watch_later']/../text()").get(default='')
        item['schedule'] = (schedule[15].upper() + schedule[16:])
        item['url'] = response.request.meta['url']
        item['status'] = 1

        yield item

    def __format_date(self, date):
        values = date.split('/')

        return f"{values[2]}/{values[1]}/{values[0]}"

