from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('EMPLOYER', 'Employer'),
        ('JOBSEEKER', 'Job Seeker'),
    )
    
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=10, 
        choices=ROLE_CHOICES, 
        default='JOBSEEKER'
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email
    
    @property
    def is_admin(self):
        return self.role == 'ADMIN'

    @property
    def is_employer(self):
        return self.role == 'EMPLOYER'

    @property
    def is_jobseeker(self):
        return self.role == 'JOBSEEKER'