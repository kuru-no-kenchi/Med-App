from django.urls import path, include
from rest_framework.routers import DefaultRouter
from dj_rest_auth.registration.views import SocialLoginView
from .views import *
from .views_doctor import *
urlpatterns = [
    # Authentication Endpoints
    path('auth/google/',GoogleOAuthLogin.as_view(), name='google_login'),
    path('auth/', include('dj_rest_auth.urls')),  # Login/logout
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/register', AuthView.as_view(), name='register'),

    # Doctor Endpoints
    path('doctor/accept_appointment/<int:appointment_id>/', DoctorView.as_view(), name='accept_appointment'),
    path('doctor/reject_appointment/<int:appointment_id>/', DoctorView.as_view(), name='reject_appointment'),
    path('doctor/patient/<int:patient_id>/', DoctorView.as_view(), name='patient_info'),
    path('doctor/appointment/<int:appointment_id>/', DoctorView.as_view(), name='app_details'),
    path('doctor/<str:action>/',DoctorView.as_view(), name='doctor-action'),

    # Patient Endpoints
    path('patient/<str:action>/', PatientView.as_view(), name='patient-action'),

    # Assistant Endpoints
    path('assistant/<str:action>/', AssistantView.as_view(), name='assistant-action'),
    
    path('dashboard/doctor/', doctor_dashboard, name='doctor_dashboard'),
    path('dashboard/patient/', patient_dashboard, name='patient_dashboard'),
    path('dashboard/assistant/', assistant_dashboard, name='assistant_dashboard'),
]
