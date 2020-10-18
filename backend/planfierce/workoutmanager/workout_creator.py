from datetime import date, datetime, timedelta
from .models import WorkoutVideo, WorkoutSeries, WorkoutDay
from .youtube_search import SearchParameter


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
        # TODO: actually use start and end date (aka remove following lines)
        self.start_date = date.today()
        self.end_date = date.today() + timedelta(days=7)

    def create_workout(self):
        workout = WorkoutSeries()
        workout.name = self.name
        workout.start_date = self.start_date
        workout.end_date = self.end_date
        workout.save()

        workout_days = self.__create_days(workout)
        print(workout_days)

        # print(self.warmup_durations)
        # print(self.cooldown_durations)
        # print(self.workout_durations)
        # print(self.types)
        # print(self.youtubers)
        # TODO: search for videos

        for d in workout_days:
            d.save()
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
        int_days = {}
        for d in self.days_of_week:
            if d in self.date_to_int_map:
                int_days[self.date_to_int_map[d]] = True

        workout_days = []
        date_counter = self.start_date
        while date_counter <= self.end_date:
            if date_counter.weekday() in int_days:
                day = WorkoutDay()
                day.workout_series = workout
                day.date = date_counter
                day.start_time = self.start_time
                day.end_time = self.end_time
                workout_days.append(day)
            date_counter += timedelta(days=1)
        return workout_days

    def __process_searches(self):
        pass