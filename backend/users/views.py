from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.

from .views_doctor import DoctorView
from .views_patient import PatientView
from .views_assistant import AssistantView
from .views_auth import AuthView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

class GoogleOAuthLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter  # Handles Google OAuth  # Serializes the OAuth token




@login_required
def doctor_dashboard(request):
    return render(request, 'templates/users/doc_dash.html')

@login_required
def patient_dashboard(request):
    return render(request, 'templates/users/pat_dash.html')

@login_required
def assistant_dashboard(request):
    return render(request, 'templates/users/ass_dash.html')