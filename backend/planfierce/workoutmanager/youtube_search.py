# Information needed about videos:
#   title
#   youtuber
#   duration
#   release_date (optional)
#   url (can create ourselves if needed)
#   youtube_id


# SearchParameter that define a single search
#   keyword: String or None
#   youtuber: String or None
class SearchParameter:
    def __init__(self, keyword, youtuber):
        self.keyword = keyword
        self.youtuber = youtuber


# A list of results for a single search, should correspond to one SearchParameter
#   search_parameter: SearchParameter
#   results: list of video information
class Result:
    def __init__(self, sp, videos):
        self.search_parameters = sp
        self.videos = videos

class Video:
    def __init__(self, title, youtuber, duration, url, youtube_id):
        self.title = title
        self.youtuber = youtuber
        self.duration = duration
        self.url = url
        self.youtube_id = youtube_id

class VideoDuration:
    def __init__(self, video_id, duration):
        self.video_id = video_id
        self.duration = duration