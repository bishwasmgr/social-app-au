from django.urls import path
from .views import CampaignListView, CampaignCreateView, CampaignListView, CampaignDetailView
from django.conf import settings
from django.conf.urls.static import static
from . import views


urlpatterns = [

    path('campaigns/register', views.UserRegister.as_view(), name='register'),
    path('campaigns/login', views.UserLogin.as_view(), name='login'),
    path('campaigns/logout', views.UserLogout.as_view(), name='logout'),
    path('campaigns/user', views.UserView.as_view(), name='user'),

    path('campaigns/create-campaign/', CampaignCreateView.as_view(), name='create-campaign'),
    path('campaigns/home-campaign/', CampaignListView.as_view(), name='home-campaign'),
    path('campaigns/update-campaign/<uuid:pk>/',
         views.update_campaign, name='update-campaign'),
    path('campaigns/campaign-detail/<uuid:pk>/',
         CampaignDetailView.as_view(), name='campaign-detail'),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
