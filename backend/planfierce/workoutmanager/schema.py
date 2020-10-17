import graphene
from graphene_django import DjangoObjectType
from .models import WorkoutVideo, WorkoutSeries, WorkoutDay


class WorkoutVideoType(DjangoObjectType):
    class Meta:
        model = WorkoutVideo
        fields = ("id", "title", "url", "youtuber", "release_date")

    duration = graphene.String()

    def resolve_duration(self, info):
        return str(self.duration)


class WorkoutSeriesType(DjangoObjectType):
    class Meta:
        model = WorkoutSeries
        fields = ("id", "name", "start_date", "end_date")


class WorkoutDayType(DjangoObjectType):
    class Meta:
        model = WorkoutDay
        fields = ("id", "date", "start_time", "end_time", "shared_with", "workout_series", "videos")


class Query(graphene.ObjectType):
    all_videos = graphene.List(WorkoutVideoType)

    def resolve_all_videos(root, info):
        return WorkoutVideo.objects.all()


schema = graphene.Schema(query=Query)