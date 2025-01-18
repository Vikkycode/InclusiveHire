from rest_framework import permissions

class IsJobOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.company is None:  # Handle the case where company is null
            return False        # Or handle it differently based on your logic
        return obj.company == request.user
