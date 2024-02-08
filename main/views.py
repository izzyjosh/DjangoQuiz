#third party import 
import json

#django imports
from django.shortcuts import (render,get_object_or_404)
from django.http import HttpRequest,JsonResponse
from django.core.paginator import (Paginator,EmptyPage,PageNotAnInteger)
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView

#my import 
from .models import (Quiz,Question,Answer)


class Quizzes(ListView):
    model = Quiz
    template_name = "main/home.html"


def question(request:HttpRequest,quiz_id):
    quiz = get_object_or_404(Quiz,id=quiz_id)

    questions = quiz.get_questions()

    #questions = Question.objects.filter(quiz=quiz).order_by("question")

    paginator = Paginator(questions,1)
    page_number = request.GET.get("page")
    try:
        page_obj = paginator.get_page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.get_page(1)
    except EmptyPage:
        page_obj = paginator.get_page(num_pages)

    context = {
            "quiz":quiz,
            "page_obj":page_obj,
            }
    return render(request,"main/question.html",context)

#for displaying result
@csrf_exempt
def submit(request:HttpRequest,quiz_id):

    client_answer = json.loads(request.body)
    print(client_answer)

    quiz = get_object_or_404(Quiz,id=quiz_id)
    questions = Question.objects.filter(quiz=quiz)

    server_answer = []

    for question in questions:
        ans = Answer.objects.get(question=question,correct=True)
        server_answer.append(ans.option)

    result = 0
    for i in range(len(client_answer)):
        if client_answer[i] in server_answer:
            result += 1

    data = {"answer":result}

    return JsonResponse(data,content_type="application/json") 
