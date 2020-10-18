from datetime import date, datetime, timedelta, time
from .models import WorkoutVideo, WorkoutSeries, WorkoutDay
from .youtube_search import SearchParameter
from .youtube_query import YoutubeQuery


class WorkoutCreator:
    date_to_int_map = {
        "M": 0,
        "T": 1,
        "W": 2,
        "Th": 3,
        "F": 4,
        "S": 5,
        "Sun": 6
    }

    def __init__(self, name, start_date, end_date, days_of_week, start_time, warmup_durations,
                 workout_durations, cooldown_durations, types, youtubers):
        self.name = name
        self.start_date = start_date
        self.end_date = end_date
        self.days_of_week = days_of_week
        self.start_time = start_time
        self.warmup_durations = warmup_durations
        self.workout_durations = workout_durations
        self.cooldown_durations = cooldown_durations
        self.types = types
        self.youtubers = youtubers
        self.end_time = self.__create_end_time()

    def create_workout(self):
        workout = WorkoutSeries()
        workout.name = self.name
        workout.start_date = self.start_date
        workout.end_date = self.end_date
        workout.save()

        workout_days = self.__create_days(workout)
        for d in workout_days:
            d.save()

        search_params = self.__process_searches()
        query = YoutubeQuery()
        results = query.runYoutubeSearchQueries(search_params)

        warmup_r, workout_r, cooldown_r = self.__process_results(results)
        warmup_map = self.__sort_videos(warmup_r, self.warmup_durations)
        workout_map = self.__sort_videos(workout_r, self.workout_durations)
        cooldown_map = self.__sort_videos(cooldown_r, self.cooldown_durations)

        self.__add_videos(workout_days, warmup_map, workout_map, cooldown_map)
        return workout

    def __create_end_time(self):
        total = 0
        for t in self.warmup_durations:
            total += t
        for t in self.workout_durations:
            total += t
        for t in self.warmup_durations:
            total += t

        units = total // 15
        if total % 15 > 0:
            units += 1
        total = units * 15
        end = datetime(1, 1, 1, self.start_time.hour, self.start_time.minute, 0)
        end += timedelta(minutes=total)
        return end.time()

    def __create_days(self, workout):
        workout_days = []
        date_counter = self.start_date
        while date_counter <= self.end_date:
            if date_counter.weekday() in self.days_of_week:
                day = WorkoutDay()
                day.workout_series = workout
                day.date = date_counter
                day.start_time = self.start_time
                day.end_time = self.end_time
                workout_days.append(day)
            date_counter += timedelta(days=1)
        return workout_days

    def __process_searches(self):
        keywords = self.types.copy()
        if self.warmup_durations:
            keywords.append("warm up")
        if self.cooldown_durations:
            keywords.append("cool down")
        ppl = self.youtubers.copy()
        if not ppl:
            ppl = [None]

        search_params = []
        for k in keywords:
            for p in ppl:
                search_params.append(SearchParameter(k, p))
        return search_params

    @staticmethod
    def __process_results(results):
        warmup_results = []
        workout_result = []
        cooldown_results = []

        for r in results:
            if r.search_parameters.keyword == "warm up":
                warmup_results.extend(r.videos)
            elif r.search_parameters.keyword == "cool down":
                cooldown_results.extend(r.videos)
            else:
                workout_result.extend(r.videos)
        return warmup_results, workout_result, cooldown_results

    def __sort_videos(self, videos, durations):
        duration_map = {}
        for d in durations:
            duration_map[d] = []

        for v in videos:
            result, dur = self.__duration_matches(duration_map, v.duration)
            if result:
                duration_map[dur].append(v)

        return duration_map

    @staticmethod
    def __duration_matches(target_map, check):
        for i in range(check-5, check+6):
            if i in target_map:
                return True, i
        return False, 0

    def __add_videos(self, days, warmup_map, workout_map, cooldown_map):
        index = 0
        for day in days:
            for dur in warmup_map.keys():
                if not warmup_map[dur]:
                    print("Could not find warmup of ", dur)
                    continue
                self.__add_video_to_day(day, warmup_map[dur][index % len(warmup_map[dur])], "warmup")
            for dur in workout_map.keys():
                if not workout_map[dur]:
                    print("Could not find workout of ", dur)
                    continue
                self.__add_video_to_day(day, workout_map[dur][index % len(workout_map[dur])], "workout")
            for dur in cooldown_map.keys():
                if not cooldown_map[dur]:
                    print("Could not find cooldown of ", dur)
                    continue
                self.__add_video_to_day(day, cooldown_map[dur][index % len(cooldown_map[dur])], "cooldown")
            index += 1
        return days

    @staticmethod
    def __add_video_to_day(day, video, type):
        video_query = WorkoutVideo.objects.filter(youtube_id=video.youtube_id)
        if len(video_query) == 0:
            actual_video = WorkoutVideo()
            actual_video.title = video.title
            actual_video.youtuber = video.youtuber
            actual_video.url = video.url
            actual_video.youtube_id = video.youtube_id
            actual_video.duration = time(minute=video.duration)
            actual_video.save()
        else:
            actual_video = video_query[0]

        if type == "warmup":
            day.warmup_videos.add(actual_video)
        elif type == "cooldown":
            day.cooldown_videos.add(actual_video)
        else:
            day.videos.add(actual_video)
