from rest_framework import viewsets, permissions
from .models import Job
from .serializers import JobSerializer
from users.permissions import IsEmployer
from jobs.permissions import IsJobOwner


class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.all() # Set the default queryset here


    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:  # Only for these actions
            permission_classes = [permissions.IsAuthenticated, IsEmployer, IsJobOwner]
        else:
            permission_classes = [permissions.IsAuthenticated, IsEmployer]  # For create, list, retrieve
        return [permission() for permission in permission_classes]


    def get_queryset(self):
        queryset = Job.objects.filter(is_active=True)
        
        employer_id = self.request.query_params.get('employer_id')
        if employer_id is not None:
            queryset = queryset.filter(company_user_id=employer_id)
            
        return queryset


    def perform_create(self, serializer):
        serializer.save(company=self.request.user) # This is correct
