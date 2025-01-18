from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'logo', 'website', 'location', 'industry', 'sign_language_friendly', 'accessibility_statement', 'workplace_accessibility_features', 'created_at', 'updated_at')