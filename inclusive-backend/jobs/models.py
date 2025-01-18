from django.db import models
from users.models import CustomUser
from company.models import Company

class Job(models.Model):
    JOB_TYPE_CHOICES = (
        ('FULL_TIME', 'Full Time'),
        ('PART_TIME', 'Part Time'),
        ('CONTRACT', 'Contract'),
        ('INTERNSHIP', 'Internship'),
    )

    EXPERIENCE_LEVEL_CHOICES = (
        ('ENTRY', 'Entry Level'),
        ('MID', 'Mid Level'),
        ('SENIOR', 'Senior Level'),
        ('LEAD', 'Lead'),
    )

    SIGN_LANGUAGE_ENVIRONMENT = (
        ('DEAF_CENTRIC', 'Deaf-Centric Workplace'),
        ('MIXED', 'Mixed Deaf/Hearing Environment'),
        ('INTERPRETERS', 'Interpreters Available'),
        ('LEARNING', 'Sign Language Learning Supported'),
    )

    # Basic Job Information
    title = models.CharField(max_length=200)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, related_name='jobs')
    location = models.CharField(max_length=200)
    description = models.TextField()
    requirements = models.TextField()
    salary_range = models.CharField(max_length=100)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES)
    experience_level = models.CharField(max_length=20, choices=EXPERIENCE_LEVEL_CHOICES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Accessibility Features
    is_remote_friendly = models.BooleanField(default=False)
    sign_language_environment = models.CharField(
        max_length=20, 
        choices=SIGN_LANGUAGE_ENVIRONMENT,
        blank=True
    )
    has_sign_language_interpreters = models.BooleanField(default=False)
    has_visual_alerts = models.BooleanField(default=False)
    has_caption_devices = models.BooleanField(default=False)
    has_video_relay = models.BooleanField(default=False)
    has_assistive_technology = models.BooleanField(default=False)
    has_deaf_friendly_training = models.BooleanField(default=False)
    
    # Additional Accommodations
    workplace_accommodations = models.TextField(blank=True)
    accessibility_notes = models.TextField(blank=True)
    deaf_employee_support = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} at {self.company.username}"