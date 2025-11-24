from django.shortcuts import render

def loading(request):
    return render(request, 'myApp/loading.html')

def home(request):
    return render(request, 'myApp/home.html')