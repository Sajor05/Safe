from django.db import models


# Create your models here.

class DataReading(models.Model):
    bpm = models.FloatField()
    spo2 = models.FloatField()
    temp_BMP = models.FloatField()
    presion_BMP = models.FloatField()
    latitud = models.FloatField()
    longitud = models.FloatField()