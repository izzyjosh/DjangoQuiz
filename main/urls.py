#django import
from django.urls import path

#my import 
from . import views
from .views import Quizzes

app_name="main"
urlpatterns = [
        path("quizzes/",Quizzes.as_view(),name="home"),
        path("question/<int:quiz_id>/",views.question,name="question"),
        path("submit/<int:quiz_id>/",views.submit,name="submit")
        ]
