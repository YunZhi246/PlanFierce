import os

import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]

class YoutubeQuery:

    #def findVideoDuration():


    # baseType [string]: one of "warmup", "cooldown", or "workout"
    # workoutType [string]: a subcategory of workout, eg. "arms", "legs", "core", etc
    # youtuber [string]
    # duration [int]
    def runYoutubeSearchQuery(baseType, workoutType, youtuber, duration):
        query = ""

        if baseType == "warmup":
            query += "warm up workout"
        elif baseType == "cooldown":
            query += "cool down workout"
        elif baseType == "workout":
            if workoutType != None:
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

        #print(response)

        return response
