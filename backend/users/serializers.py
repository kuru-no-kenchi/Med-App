from rest_framework import serializers
from .models import *

class PatientSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.get_full_name',read_only=True)
    medical_history = serializers.CharField(source='user.patient.medical_history',read_only=True)
    insurance_number = serializers.CharField(source='user.patient.insurance_number',read_only=True)
    date_of_birth = serializers.DateField(source='user.patient.date_of_birth',read_only=True)
    class Meta:
        model = Patient
        fields = ['full_name', 'medical_history', 'date_of_birth', 'insurance_number']  
        
class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.username', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'
        


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)
    email_sender = serializers.CharField(source='sender.email', read_only=True)
    receiver_name = serializers.CharField(source='receiver.username', read_only=True)
    email_receiver = serializers.CharField(source='receiver.email', read_only=True)

    class Meta:
        model = Message
        fields = ['sender_name','email_sender','receiver_name','email_receiver','content','timestamp']

class DoctorSerializer(serializers.Serializer):
    full_name = serializers.CharField(source='user.get_full_name', read_only=True)
    hosp_name = serializers.CharField(source='user.doctor.hospital_name', read_only=True)
    experience = serializers.IntegerField(source='user.doctor.experience', read_only=True)
    license_number = serializers.CharField(source='user.doctor.license_number',read_only=True)
    specialization = serializers.CharField(source='user.doctor.specialization',read_only=True)
    class Meta:
        model = CustomUser
        fields = ['full_name','hosp_name','experience','license_number','specialization']