from django.urls import path, include
from rest_framework.routers import DefaultRouter
from jobs.views import JobViewSet
from company.views import CompanyViewSet
from application.views import ApplicationViewSet
from .views import RegisterView, LoginView, UserView, AdminUserManagementView, CustomTokenObtainPairView # Import your views
from rest_framework_simplejwt.views import TokenRefreshView




router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='job') # jobs
router.register(r'companies', CompanyViewSet, basename='company') # companies
router.register(r'applications', ApplicationViewSet, basename='application') #applications



urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', UserView.as_view(), name='user'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('employers/', EmployerView.as_view(), name='employer'),
    path('admin/users/', AdminUserManagementView.as_view(), name='admin-users'),
    path('admin/users/<int:user_id>/', AdminUserManagementView.as_view(), name='admin-user-detail'),
    path('', include(router.urls)),  # Include the API URLs

]

