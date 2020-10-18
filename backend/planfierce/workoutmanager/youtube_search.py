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
