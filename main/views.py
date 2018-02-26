from django.shortcuts import render;

# Create your views here.
from django.http import HttpResponse;

def index(request):
  context_dict = {};
  return render(request, 'main/index.html', context=context_dict);
  
