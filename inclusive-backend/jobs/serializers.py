from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.username', read_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company', 'company_name', 'location',
            'description', 'requirements', 'salary_range',
            'job_type', 'experience_level', 'is_active',
            'created_at', 'updated_at',
            # Accessibility fields
            'is_remote_friendly', 'sign_language_environment',
            'has_sign_language_interpreters', 'has_visual_alerts',
            'has_caption_devices', 'has_video_relay',
            'has_assistive_technology', 'has_deaf_friendly_training',
            'workplace_accommodations', 'accessibility_notes',
            'deaf_employee_support'
        ]
        read_only_fields = ['company', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['company'] = self.context['request'].user
        return super().create(validated_data)