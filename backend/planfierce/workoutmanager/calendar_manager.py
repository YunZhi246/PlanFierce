from googleapiclient.discovery import build
from oauth2client import file, client
from datetime import datetime, timedelta


class CalendarAdmin:
    api_service_name = "calendar"
    api_version = "v3"
    access_file = 'workoutmanager/access.txt'
    url_root = "www.planfierce.com/videos/"
    timezone = "America/New_York"

    def update_calendar(self, workout):
        service = self.__create_service()

        for day in workout.days.all():
            event = self.create_event(day)
            res = service.events().insert(calendarId='primary', body=event).execute()
            print('Event created: %s' % (res.get('htmlLink')))

    def create_event(self, day):
        summary = str(day)
        description = self.__create_url(day)
        start_dt = datetime(day.date.year, day.date.month, day.date.day, day.start_time.hour, day.start_time.minute, day.start_time.second)
        end_dt = datetime(day.date.year, day.date.month, day.date.day, day.end_time.hour, day.end_time.minute, day.end_time.second)

        event = {
            "summary": summary,
            "description": description,
            "start": {
                "dateTime": start_dt.isoformat(),
                "timeZone": self.timezone
            },
            "end": {
                "dateTime": end_dt.isoformat(),
                "timeZone": self.timezone
            }
        }
        return event

    def __create_url(self, day):
        date = day.date.strftime("%d%m%Y")
        url = "{}date={}&id={}".format(self.url_root, date, day.id)
        return url

    def __read_token(self):
        f = open(self.access_file, "r")
        token = f.read()
        return token

    def __create_service(self):
        token = self.__read_token()
        credentials = client.AccessTokenCredentials(token, 'plan-fierce')
        service = build(self.api_service_name, self.api_version, credentials=credentials)
        return service
