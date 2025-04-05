from rest_framework import serializers
from .models import *

class PatientSerializer(serializers.ModelSerializer):
    patient_id = serializers.IntegerField(source="user.id")
    full_name = serializers.CharField(source='user.get_full_name', required=False)
    email = serializers.EmailField(source='user.email', required=False)
    class Meta:
        model = Patient
        fields = ['patient_id','full_name', 'email', 'medical_history', 'date_of_birth', 'insurance_number']
        extra_kwargs = {
            'medical_history': {'required': False},
            'date_of_birth': {'required': False},
            'insurance_number': {'required': False}
        }
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        # Update Patient fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        # Update User fields
        user = instance.user
        if 'email' in user_data:
            user.email = user_data['email']
        if 'get_full_name' in user_data:
            # Implement name splitting logic if needed
            first_name, last_name = user_data['get_full_name'].split(' ', 1)
            user.first_name = first_name
            user.last_name = last_name
        user.save()
        instance.save()
        return instance

#######################################################################################""
class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)
    email_sender = serializers.CharField(source='sender.email', read_only=True)
    receiver_name = serializers.CharField(source='receiver.username', read_only=True)
    email_receiver = serializers.CharField(source='receiver.email', read_only=True)
    class Meta:
        model = Message
        fields = ['sender_name','email_sender','receiver_name','email_receiver','content','timestamp']
##############################################################################
# serializers.py
class DoctorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="user.id")
    full_name = serializers.CharField(source='user.get_full_name', required=False)
    email = serializers.EmailField(source='user.email', required=False)
    class Meta:
        model = Doctor
        fields = ['id', 'full_name', 'email', 'specialization', 'hospital_name', 'experience', 'license_number']
        extra_kwargs = {
            'email': {'required': True},
            'license_number': {'required': True}  
        }
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        # Update Doctor fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        # Update User fields
        user = instance.user
        if 'email' in user_data:
            user.email = user_data['email']
        if 'get_full_name' in user_data:
            # Implement name splitting logic if needed
            first_name, last_name = user_data['get_full_name'].split(' ', 1)
            user.first_name = first_name
            user.last_name = last_name
        user.save()
        instance.save()
        return instance
###################################################################################  
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        date_joined = serializers.DateTimeField(source='user.date_joined',format="%Y-%m-%d")
        fields = ["id", "first_name","last_name", "email", "role","date_joined"]
###################################################################################""        
class AssistantSerializer(serializers.ModelSerializer):
    ass_id = serializers.IntegerField(source="user.id")
    full_name = serializers.CharField(source='user.get_full_name')
    hosp_name = serializers.CharField(source='user.assistant.hospital_name')
    experience = serializers.IntegerField(source='user.assistant.experience')
    email = serializers.CharField(source='user.email')
    class Meta:
        model = Assistant
        fields = ['ass_id','first_name','last_name','hosp_name','experience',"email"]
###########################################################################""
class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='app_doctor.user.get_full_name')
    patient_name = serializers.CharField(source='app_patient.user.get_full_name') 

    class Meta:
        model = Appointment
        fields = ['id', 'doctor_name','app_doctor','app_patient', 'patient_name', 'app_date', 'app_time', 'app_aprv', 'app_done']
    def create(seld,validated_data):
        Appointment.objects.create(**validated_data)