from django.forms import ValidationError
from rest_framework import serializers
from .models import Campaign
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj
      
class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user
	

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')
		
        

class CampaignSerializer(serializers.ModelSerializer):
	
	main_image = serializers.ImageField(use_url=True) 
    
	class Meta:
		model = Campaign
		fields = ('id', 'title', 'main_image', 'description', 'start_date', 'end_date', 'status')



class CreateCampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = ('id', 'title', 'main_image', 'description', 'start_date', 'end_date', 'status')
