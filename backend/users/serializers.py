from rest_framework import serializers
from .models import *

class PatientSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), write_only=True)
    full_name = serializers.CharField(source='user.get_full_name',read_only=True)
    email = serializers.CharField(source='user.email',read_only=True)
    medical_history = serializers.CharField(source='user.patient.medical_history',read_only=True)
    insurance_number = serializers.CharField(source='user.patient.insurance_number',read_only=True)
    date_of_birth = serializers.DateField(source='user.patient.date_of_birth',read_only=True)
    class Meta:
        model = Patient
        fields = ['user','full_name', 'medical_history', 'date_of_birth', 'insurance_number','email']  
    def create(self, validated_data):
        """Create a new patient instance."""
        user = validated_data.pop('user')
        return Patient.objects.create(user=user,**validated_data)
#######################################################################################""
class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)
    email_sender = serializers.CharField(source='sender.email', read_only=True)
    receiver_name = serializers.CharField(source='receiver.username', read_only=True)
    email_receiver = serializers.CharField(source='receiver.email', read_only=True)

    class Meta:
        model = Message
        fields = ['sender_name','email_sender','receiver_name','email_receiver','content','timestamp']

class DoctorSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    hosp_name = serializers.CharField(source='hospital_name', read_only=True)
    doc_experience = serializers.IntegerField(source='experience', read_only=True)
    doc_license_number = serializers.CharField(source='license_number', read_only=True)
    doc_specialization = serializers.CharField(source='specialization', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    class Meta:
        model = Doctor
        fields = [ 'full_name', 'hosp_name', 'doc_experience', 'doc_license_number', 'doc_specialization', 'email']
        
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        date_joined = serializers.DateTimeField(source='user.date_joined',format="%Y-%m-%d",read_only=True)
        fields = ["id", "username","first_name","last_name", "email", "role","date_joined"]
        
class AssistantSerializer(serializers.Serializer):
    full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    hosp_name = serializers.CharField(source='user.assistant.hospital_name', read_only=True)
    experience = serializers.IntegerField(source='user.assistant.experience', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    class Meta:
        model = CustomUser
        fields = ['first_name','last_name','hosp_name','experience',"email"]
class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(read_only=True)
    patient_name = serializers.CharField(read_only=True) 

    class Meta:
        model = Appointment
        fields = ['id', 'doctor_name', 'patient_name', 'app_date', 'app_time', 'app_aprv', 'app_done']