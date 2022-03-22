from django.urls import path
from . import views

urlpatterns = [
    path('create-or-verify/',views.CreateOrVerify,name='CreateOrVerify'),
]