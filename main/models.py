#django import 
from django.db import models
from django.contrib.auth.models import User


LEVEL = (
        ("Hard","Hard"),
        ("Easy","Easy"),
        ("Normal","Normal"),
        )
class Quiz(models.Model):
    name:str = models.CharField(max_length=100)
    time = models.TimeField(help_text="Time for quiz in minutes")
    number_of_question = models.IntegerField()
    level = models.CharField(max_length=6,choices=LEVEL)

    class Meta:
        verbose_name_plural:str = "Quizzes"

    def __str__(self):
        return self.name

    def get_questions(self):
        return self.questions.all().order_by("-created")

class Question(models.Model):
    quiz:Quiz = models.ForeignKey(Quiz,related_name="questions",on_delete=models.CASCADE)
    question:str = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

    def get_answers(self):
        return self.answers.all()

class Answer(models.Model):
    question:Question = models.ForeignKey(Question,related_name="answers",on_delete=models.CASCADE)
    option:str = models.CharField(max_length=200)
    correct:bool = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.option



class Result(models.Model):
    user:User = models.ForeignKey(User,on_delete=models.CASCADE)
    quiz:Quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE)
    score:float = models.FloatField()

    def __str__(self):
        return self.user.username
