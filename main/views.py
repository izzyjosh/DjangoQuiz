#third party import 
import json

#django imports
from django.shortcuts import (render,get_object_or_404)
from django.http import HttpRequest,JsonResponse
from django.core.paginator import (Paginator,EmptyPage,PageNotAnInteger)

#my import 
from .models import (Quiz,Question)


def quiz(request:HttpRequest):
    quizzes = Quiz.objects.all()

    context = {
            "quizzes":quizzes,
            }
    return render(request,"main/home.html",context)


def question(request:HttpRequest,quiz_id):
    quiz = get_object_or_404(Quiz,id=quiz_id)

    questions = Question.objects.filter(quiz=quiz).order_by("question")

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


def submit(request:HttpRequest,quiz_id):
    quiz = get_object_or_404(Quiz,id=quiz_id)
    questions = Question.objects.filter(quiz=quiz)

    answer = []

    for question in questions:
        ans = Option.objects.get(question=question,is_correct=True)
        answer.append(ans.option)

    data = {"answers":answer}
    json_data = json.dumps(data)

    return JsonResponse(json_data,content_type="application/json") 
