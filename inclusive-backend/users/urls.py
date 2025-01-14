from django.urls import path
from .views import RegisterView, LoginView, UserView, AdminUserManagementView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', UserView.as_view(), name='user'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('employers/', EmployerView.as_view(), name='employer'),
    path('admin/users/', AdminUserManagementView.as_view(), name='admin-users'),
    path('admin/users/<int:user_id>/', AdminUserManagementView.as_view(), name='admin-user-detail'),
]