from django.db import models
from users.models import CustomUser
from jobs.models import Job

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='applications')
    cover_letter = models.TextField()
    resume = models.FileField(upload_to='resumes/')
    application_date = models.DateTimeField(auto_now_add=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=[
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
    ])
    preferred_communication_method = models.CharField(max_length=20, choices=[
        ('EMAIL', 'Email'),
        ('MESSAGE', 'Message'),
        ('SIGN_LANGUAGE_INTERPRETER', 'Sign Language Interpreter'),
    ]),
    required_assitive_technology = models.BooleanField(default=False)
    other_accessibility_requirements = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Application for {self.job.title} by {self.user.username}"

    class Meta:
        ordering = ['-created_at']