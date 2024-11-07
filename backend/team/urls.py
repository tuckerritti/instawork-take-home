from django.urls import path
from .views import TeamMemberListCreateView, TeamMemberDetailView

urlpatterns = [
    path("members/", TeamMemberListCreateView.as_view(), name="team-member-list-create"),
    path("members/<int:pk>/", TeamMemberDetailView.as_view(), name="team-member-detail"),
]