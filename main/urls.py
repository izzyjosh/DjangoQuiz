#django import
from django.urls import path

#my import 
from . import views

app_name="main"
urlpatterns = [
        path("quizzes/",views.quiz,name="home"),
        path("question/<int:quiz_id>/",views.question,name="question"),
        path("submit/<int:quiz_id>/",views.submit,name="submit")
        ]
