from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer
from users.permissions import IsEmployer

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployer]

    def get_queryset(self):
        if self.action == 'list':
            return Job.objects.filter(is_active=True)
        return Job.objects.all()

    def perform_create(self, serializer):
        serializer.save(company=self.request.user)