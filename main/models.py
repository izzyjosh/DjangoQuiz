#django import 
from django.db import models
from django.contrib.auth.models import User

class Quiz(models.Model):
    name:str = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Quizzes"

    def __str__(self):
        return self.name

class Question(models.Model):
    quiz:Quiz = models.ForeignKey(Quiz,related_name="questions",on_delete=models.CASCADE)
    question:str = models.TextField()

    def __str__(self):
        return self.question

class Option(models.Model):
    question:User = models.ForeignKey(Question,related_name="options",on_delete=models.CASCADE)
    option:str = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.option

class UserAnswer(models.Model):
    user:User = models.ForeignKey(User,on_delete=models.CASCADE)
    question:Question = models.ForeignKey(Question,on_delete=models.CASCADE)
    selected_option:Option = models.ForeignKey(Option,on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "User's Answer"

    def __str__(selt):
        return self.user.username
