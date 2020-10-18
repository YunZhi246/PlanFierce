import graphene
from datetime import datetime
from graphene_django import DjangoObjectType
from .models import WorkoutVideo, WorkoutSeries, WorkoutDay
from .workout_creator import WorkoutCreator


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
    day_by_id = graphene.Field(WorkoutDayType, day_id=graphene.ID(required=True))
    series_by_id = graphene.Field(WorkoutSeriesType, workout_id=graphene.ID(required=True))

    def resolve_all_videos(root, info):
        return WorkoutVideo.objects.all()

    def resolve_all_days(root, info):
        return WorkoutDay.objects.all()

    def resolve_all_series(root, info):
        return WorkoutSeries.objects.all()

    def resolve_day_by_id(root, info, day_id):
        try:
            return WorkoutDay.objects.get(id=day_id)
        except WorkoutDay.DoesNotExist:
            return None

    def resolve_series_by_id(root, info, workout_id):
        try:
            return WorkoutSeries.objects.get(id=workout_id)
        except WorkoutSeries.DoesNotExist:
            return None


class CreateWorkoutMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        start_date = graphene.String(required=True)
        end_date = graphene.String(required=True)
        days_of_week = graphene.List(graphene.Int, required=True)
        start_time = graphene.Time(required=True)
        warmup_durations = graphene.List(graphene.Int)
        workout_durations = graphene.List(graphene.Int)
        cooldown_durations = graphene.List(graphene.Int)
        types = graphene.List(graphene.String)
        youtubers = graphene.List(graphene.String)

    workout = graphene.Field(WorkoutSeriesType)

    def mutate(self, info, name, start_date, end_date, days_of_week, start_time, **kwargs):
        start_date_d = datetime.strptime(start_date, '%Y-%m-%dT%H:%M:%S.%fZ').date()
        end_date_d = datetime.strptime(end_date, '%Y-%m-%dT%H:%M:%S.%fZ').date()
        warmup_durations = kwargs.get('warmup_durations', [])
        workout_durations = kwargs.get('workout_durations', [])
        cooldown_durations = kwargs.get('cooldown_durations', [])
        youtubers = kwargs.get('youtubers', [])
        types = kwargs.get('types', [])
        creator = WorkoutCreator(name, start_date_d, end_date_d, days_of_week, start_time, warmup_durations,
                                 workout_durations, cooldown_durations, types, youtubers)
        workout = creator.create_workout()
        return CreateWorkoutMutation(workout=workout)


class DeleteWorkoutMutation(graphene.Mutation):
    class Arguments:
        workout_id = graphene.ID(required=True)

    info = graphene.Field(graphene.String)

    def mutate(self, info, workout_id):
        series = WorkoutSeries.objects.get(id=workout_id)
        info = str(series.delete())
        return DeleteWorkoutMutation(info=info)


class Mutation(graphene.ObjectType):
    create_workout = CreateWorkoutMutation.Field()
    delete_workout = DeleteWorkoutMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
