from django.db import models


class WorkoutVideo(models.Model):
    title = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    youtuber = models.CharField(max_length=100)
    duration = models.DurationField()
    youtube_id = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class WorkoutSeries(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name


class WorkoutDay(models.Model):
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    shared_with = models.TextField(blank=True)
    workout_series = models.ForeignKey(WorkoutSeries, related_name="days", on_delete=models.CASCADE)
    videos = models.ManyToManyField(WorkoutVideo, related_name="videos", blank=True)
    warmup_videos = models.ManyToManyField(WorkoutVideo, related_name="warmups", blank=True)
    cooldown_videos = models.ManyToManyField(WorkoutVideo, related_name="cooldowns", blank=True)

    def __str__(self):
        return str(self.workout_series) + " (" + str(self.date) + ")"
