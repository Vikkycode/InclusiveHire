from rest_framework import viewsets, permissions
from application.models import Application
from .serializers import ApplicationSerializer

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_permissions(self):
        if self.action in ['create']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]


    def get_queryset(self):

        user = self.request.user
        if user.is_authenticated:
            return Application.objects.filter(application=user)
        return Application.objects.none()
    
    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)