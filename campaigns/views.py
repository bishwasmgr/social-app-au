from rest_framework.generics import ListAPIView
from .serializers import CampaignSerializer, CreateCampaignSerializer
from rest_framework.pagination import PageNumberPagination
from .models import Campaign
from django.contrib.auth import login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics






class UserRegister(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class CampaignPagination(PageNumberPagination):
    page_size = 15  # Customize the number of campaigns per page


class CampaignListView(ListAPIView):
    queryset = Campaign.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = CampaignSerializer
    pagination_class = CampaignPagination



class CampaignCreateView(APIView):
    serializer_class = CreateCampaignSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = CreateCampaignSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # This will create a campaign without the creator field.
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['PUT', 'GET'])
@permission_classes([permissions.AllowAny])
def update_campaign(request, pk):
    try:
        campaign = Campaign.objects.get(pk=pk)
    except Campaign.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = CampaignSerializer(campaign, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CampaignDetailView(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer