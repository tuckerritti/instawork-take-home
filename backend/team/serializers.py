from rest_framework import serializers
from .models import TeamMember
import re

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ["id", "first_name", "last_name", "email", "phone", "role"]

    def validate_first_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("First name must contain only alphabetic characters.")
        if len(value) < 2 or len(value) > 50:
            raise serializers.ValidationError("First name must be between 2 and 50 characters.")
        return value

    def validate_last_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("Last name must contain only alphabetic characters.")
        if len(value) < 2 or len(value) > 50:
            raise serializers.ValidationError("Last name must be between 2 and 50 characters.")
        return value

    def validate_email(self, value):
        instance = self.instance

        # If we're just editing a user, keeping the email is okay
        if instance is not None:
            if instance.email == value:
                return value

        if TeamMember.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def validate_phone(self, value):
        phone_regex = re.compile(r"^\+?1?\d{9,15}$")
        if not phone_regex.match(value):
            raise serializers.ValidationError(
                "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
        return value

    def validate_role(self, value):
        if value not in ["regular", "admin"]:
            raise serializers.ValidationError("Role must be either 'regular' or 'admin'.")
        return value