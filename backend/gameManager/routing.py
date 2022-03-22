from django.urls import path
from .consumsers import gameSocketConsumer

websocket_urlpatterns = [
    path('ws/game/<str:gameId>/',gameSocketConsumer.as_asgi()),
]