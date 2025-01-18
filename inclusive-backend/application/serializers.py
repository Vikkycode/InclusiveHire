from rest_framework import serializers
from jobs.models import Job
from .models import Application
from jobs.serializers import JobSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    job_id = serializers.PrimaryKeyRelatedField(queryset=Job.objects.all(), write_only=True, source='job')
    
    class Meta:
        model = Application
        field = '__all__'