from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'jobs': reverse('job-list', request=request, format=format),
        'companies': reverse('company-list', request=request, format=format),
        'applications': reverse('application-list', request=request, format=format),
        'auth': {
            'login': reverse('login', request=request, format=format),
            'register': reverse('register', request=request, format=format),
        },
        'admin': reverse('admin:index', request=request, format=format),
    })

urlpatterns = [
    path('', api_root, name='api-root'),  # Add root API view
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/jobs/', include('jobs.urls')),
    path('api/companies/', include('company.urls')),
    path('api/applications/', include('application.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)