from django.urls import path
from .consumers import room_consumer

websocket_urlpatterns = [
    path('ws/room/<str:roomName>/<str:userName>/',room_consumer.as_asgi()),
]