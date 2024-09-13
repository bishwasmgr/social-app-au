from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from campaigns.models import AppUser, Campaign

class UserTests(APITestCase):
    
    def test_user_registration(self):
        """Test the user registration endpoint"""
        url = reverse('register')
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'Testpassword123!',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        """Test the user login endpoint"""
        # Create a user using the custom user model
        user = AppUser.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='Testpassword123!'
        )
        
        url = reverse('login')
        data = {
            'email': 'testuser@example.com',
            'password': 'Testpassword123!'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CampaignTests(APITestCase):

    def setUp(self):
        """Create a user and authenticate"""
        self.user = AppUser.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='Testpassword123!'
        )
        self.client.login(username='testuser', password='Testpassword123!')
    
    def test_create_campaign(self):
        """Test campaign creation endpoint"""
        url = reverse('create-campaign')
        data = {
            'title': 'Campaign Title',
            'description': 'Campaign Description',
            'start_date': '2024-09-01',
            'end_date': '2024-09-15',
            'status': 'active'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Campaign.objects.count(), 1)
