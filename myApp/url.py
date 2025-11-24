from django.urls import path
from . import views


urlpatterns = [
    path('loading/', views.loading, name='loading'),
    path('', views.home, name='home'),
]