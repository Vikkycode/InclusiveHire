from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'auth': {
            'login': reverse('login', request=request, format=format),
            'register': reverse('register', request=request, format=format),
        },
        'admin': reverse('admin:index', request=request, format=format),
    })

urlpatterns = [
    path('', api_root, name='api-root'),  # Add root API view
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/jobs/', include('jobs.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)