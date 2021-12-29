import scrapy
from ..items import CourseItem


class AcademiamovilesSpider(scrapy.Spider):
    institution = 'Academia Móviles'
    name = 'academiamoviles'
    allowed_domains = ['academiamoviles.com/view']
    start_urls = ['https://academiamoviles.com/view/']

    MONTH_SWITCHER = {
        'ENE': '01',
        'FEB': '02',
        'MAR': '03',
        'ABR': '04',
        'MAY': '05',
        'JUN': '06',
        'JUL': '07',
        'AGO': '08',
        'SET': '09',
        'OCT': '10',
        'NOV': '11',
        'DIC': '12',
    }

    def parse(self, response):
        courses = response.xpath("//button[contains(text(), 'descargar')]/../../a")

        for course in courses:
            course_link = course.xpath('.//@href').get()
            yield response.follow(url=course_link, callback=self.parse_course, meta={'url': course_link},
                                  dont_filter=True)

    def parse_course(self, response):
        item = CourseItem()

        price = response.xpath("//h3[@style='color:#F50606']/text()").get(default='')
        start = response.xpath("//span[contains(text(), 'Fecha de inicio')]/text()").get(default='')

        item['institutionName'] = 'Academia Móviles'
        item['name'] = response.xpath("//div[@class='entry-title']/h1/text()").get(default='').strip()
        item['description'] = response.xpath("//div[@class='entry-content']/p/text()").get(default='').strip()
        item['image'] = response.xpath("//img[@class='image_fade']/@src").get(default='').strip()
        item['price'] = price[3:].strip()
        item['currency'] = 'PEN'
        item['start'] = self.__format_date(start[18:].strip())
        item['schedule'] = response.xpath("//span[contains(text(), 'Fecha de inicio')]/../span[2]/text()").get(default='').strip()
        item['url'] = response.request.meta['url'].strip()

        yield item

    def __format_date(self, date):
        values = date.split()
        values[1] = self.MONTH_SWITCHER.get(values[1])

        return f"{values[2]}/{values[1]}/{values[0]}"


