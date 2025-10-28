from rest_framework import serializers
from models import DataReading

class ProjectSerializers(serializers.ModelSerializer):
    class Meta:
        model = DataReading
        fields = ("id","bpm","spo2","temp","presion","latitud","longitud")