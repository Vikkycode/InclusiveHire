from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Job
from .serializers import JobSerializer

# We'll add views later