from rest_framework import permissions

class IsJobOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.company == request.user