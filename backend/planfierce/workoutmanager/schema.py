import graphene
from graphene_django import DjangoObjectType
from .models import WorkoutVideo, WorkoutSeries, WorkoutDay


class WorkoutVideoType(DjangoObjectType):
    class Meta:
        model = WorkoutVideo
        fields = "__all__"

    duration = graphene.String()

    def resolve_duration(self, info):
        return str(self.duration)


class WorkoutSeriesType(DjangoObjectType):
    class Meta:
        model = WorkoutSeries
        fields = "__all__"


class WorkoutDayType(DjangoObjectType):
    class Meta:
        model = WorkoutDay
        fields = "__all__"


class Query(graphene.ObjectType):
    all_videos = graphene.List(WorkoutVideoType)
    all_days = graphene.List(WorkoutDayType)
    all_series = graphene.List(WorkoutSeriesType)

    def resolve_all_videos(root, info):
        return WorkoutVideo.objects.all()

    def resolve_all_days(root, info):
        return WorkoutDay.objects.all()

    def resolve_all_series(root, info):
        return WorkoutSeries.objects.all()


schema = graphene.Schema(query=Query)