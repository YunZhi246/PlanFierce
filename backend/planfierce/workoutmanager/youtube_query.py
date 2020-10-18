import os

import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors

import json
from youtube_search import SearchParameter, Result, Video, VideoDuration
import isodate

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl", "https://www.googleapis.com/auth/youtube.readonly"]

class YoutubeQuery:

    # Convert the durationString in the format PT#H#M#S or PT#M#S into an int duration in min
    def getDuration(self, durationString):
        duration = isodate.parse_duration(durationString)
        durationMin = round(duration.total_seconds() / 60)

        return durationMin

    # videoIds [string]: string of comma separated video ids
    def findVideoDuration(self, videoIds):
        # Disable OAuthlib's HTTPS verification when running locally.
        # *DO NOT* leave this option enabled in production.
        os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

        api_service_name = "youtube"
        api_version = "v3"
        client_secrets_file = "client_secret.json"

        # Get credentials and create an API client
        flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(client_secrets_file, scopes)
        credentials = flow.run_console()
        youtube = googleapiclient.discovery.build(api_service_name, api_version, credentials=credentials)

        request = youtube.videos().list(
            part="contentDetails",
            id=videoIds
        )
        response = request.execute()

        videoDurations = []
        videoId = ""
        duration = ""

        for videoResult in response["items"]:
            videoId = videoResult["id"]
            durationString = videoResult["contentDetails"]["duration"]
            duration = self.getDuration(durationString)
            videoDuration = VideoDuration(videoId, duration)
            videoDurations.append(videoDuration)

        return videoDurations

    # searchParameters [list of SearchParameter]
    def runYoutubeSearchQueries(self, searchParameters):
        results = []
        for sp in searchParameters:
            result = self.runYoutubeSearchQuery(sp)
            results.append(result)
        return results

    # searchParameter [SearchParameter]
    def runYoutubeSearchQuery(self, searchParameter):
        query = ""

        workoutType = searchParameter.keyword
        youtuber = searchParameter.youtuber

        query += workoutType
        query += " workout"
        if youtuber != None:
            query += " "
            query += youtuber

        # Disable OAuthlib's HTTPS verification when running locally.
        # *DO NOT* leave this option enabled in production.
        os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

        api_service_name = "youtube"
        api_version = "v3"
        client_secrets_file = "client_secret.json"

        # Get credentials and create an API client
        flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(client_secrets_file, scopes)
        credentials = flow.run_console()
        youtube = googleapiclient.discovery.build(api_service_name, api_version, credentials=credentials)

        request = youtube.search().list(
            part="snippet",
            order="relevance",
            q=query,
            relevanceLanguage="en",
            type="video"
        )
        response = request.execute()

        videoIds = ""

        videos = []
        title = ""
        youtuber = ""
        duration = 0
        url = ""
        youtube_id = ""
        video = ""

        for videoResult in response["items"]:
            title = videoResult["snippet"]["title"]
            youtuber = videoResult["snippet"]["channelTitle"]
            youtube_id = videoResult["id"]["videoId"]
            videoIds += "," + youtube_id
            url = "https://www.youtube.com/watch?v=" + youtube_id
            video = Video(title, youtuber, duration, url, youtube_id)
            videos.append(video)

        videoDurations = self.findVideoDuration(videoIds)

        # set all video durations in videos
        for v in videos:
            videoId = v.youtube_id
            for vd in videoDurations:
                if vd.video_id == videoId:
                    v.duration = vd.duration

        result = Result(searchParameter, videos)
        
        # TODO: automate authentication

        return result


# if __name__ == "__main__":
#     yq = YoutubeQuery()
#     sp = SearchParameter("arms", "Chloe Ting")

#     result = yq.runYoutubeSearchQuery(sp)
#     for v in result.videos:
#         print(v.title)
#         print(v.youtuber)
#         print(v.duration)
#         print(v.url)
#         print(v.youtube_id)
