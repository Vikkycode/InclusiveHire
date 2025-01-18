from rest_framework import viewsets, permissions
from .models import Company
from .serializers import CompanySerializer
from users.permissions import IsEmployer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update','destroy']:
            permission_classes = [permissions.IsAuthenticated, IsEmployer]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):

        serializer.save(user=self.request.user)