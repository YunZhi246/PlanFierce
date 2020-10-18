from googleapiclient.discovery import build
from oauth2client import file, client
from datetime import datetime, timedelta


class CalendarAdmin:
    api_service_name = "calendar"
    api_version = "v3"
    access_file = 'access.txt'

    def calender(self):
        token = self.__read_token()
        credentials = client.AccessTokenCredentials(token, 'plan-fierce')
        service = build(self.api_service_name, self.api_version, credentials=credentials)

        event = {
            "summary": "Hello World2",
            "description": "https://www.youtube.com/watch?v=VKIiCOZ2Eo4",
            "start": {
                "dateTime": (datetime.now() + timedelta(minutes=60)).isoformat(),
                "timeZone": "America/New_York"
            },
            "end": {
                "dateTime": (datetime.now() + timedelta(minutes=120)).isoformat(),
                "timeZone": "America/New_York"
            }
        }
        event = service.events().insert(calendarId='primary', body=event).execute()
        print('Event created: %s' % (event.get('htmlLink')))

    def __read_token(self):
        f = open(self.access_file, "r")
        token = f.read()
        return token


if __name__ == '__main__':
    CalendarAdmin().calender()
