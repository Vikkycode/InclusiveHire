from django.db import models
from users.models import CustomUser

class Job(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    employer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title