import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter,URLRouter
from channels.auth import AuthMiddlewareStack
from main.routing import websocket_urlpatterns as room_urlpatters
from gameManager.routing import websocket_urlpatterns as gameManager_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ludo.settings')

websocket_urlpatterns = room_urlpatters + gameManager_urlpatterns


application = ProtocolTypeRouter({
    'http':get_asgi_application(),
    'websocket':AuthMiddlewareStack(URLRouter(websocket_urlpatterns)),
})


