import graphene
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

    def resolve_all_videos(root, info):
        return WorkoutVideo.objects.all()

    def resolve_all_days(root, info):
        return WorkoutDay.objects.all()

    def resolve_all_series(root, info):
        return WorkoutSeries.objects.all()


class CreateWorkoutMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        # TODO: require the start and end date
        start_date = graphene.Date()  # required
        end_date = graphene.Date()  # required
        days_of_week = graphene.List(graphene.String, required=True)
        start_time = graphene.Time(required=True)
        warmup_durations = graphene.List(graphene.Int)
        workout_durations = graphene.List(graphene.Int)
        cooldown_durations = graphene.List(graphene.Int)
        types = graphene.List(graphene.String)
        youtubers = graphene.List(graphene.String)

    workout = graphene.Field(WorkoutSeriesType)

    def mutate(self, info, name, days_of_week, start_time, **kwargs):
        start_date = kwargs.get('start_date', None)
        end_date = kwargs.get('end_date', None)
        warmup_durations = kwargs.get('warmup_durations', [])
        workout_durations = kwargs.get('workout_durations', [])
        cooldown_durations = kwargs.get('cooldown_durations', [])
        youtubers = kwargs.get('youtubers', [])
        types = kwargs.get('types', [])
        creator = WorkoutCreator(name, start_date, end_date, days_of_week, start_time, warmup_durations,
                                 workout_durations, cooldown_durations, types, youtubers)
        workout = creator.create_workout()
        return CreateWorkoutMutation(workout=workout)


class Mutation(graphene.ObjectType):
    create_workout = CreateWorkoutMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
