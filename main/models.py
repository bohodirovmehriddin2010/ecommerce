from django.db import models

class HomePage(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='homepage_images/')

    def __str__(self):
        return self.name
