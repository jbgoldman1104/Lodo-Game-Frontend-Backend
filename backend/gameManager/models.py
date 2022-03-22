import uuid
import random
from django.db import models

# Create your models here.
class GameInstance(models.Model):
    id = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
    changeIdentifier = models.FloatField(default=random.uniform(0,1))

    def __str__(self):
        return str(self.id)