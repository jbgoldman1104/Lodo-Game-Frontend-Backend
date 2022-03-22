from django.db import models

# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length=255,unique=True,null=False,blank=False)
    password = models.CharField(max_length=255,null=False,blank=False)
    red = models.CharField(max_length=255,null=True,blank=True)
    green = models.CharField(max_length=255,null=True,blank=True)
    yellow = models.CharField(max_length=255,null=True,blank=True)
    blue = models.CharField(max_length=255,null=True,blank=True)

    def __str__(self):
        return self.name

    # methods
    def roomFull(self):
        if self.red and self.green and self.yellow and self.blue:
            return True
        return False
    def nameExists(self,name):
        if(self.red == name  or self.green == name or self.yellow == name or self.blue == name):
            return True
        return False
    def noOfUserInRoom(self):
        count = 0
        if(self.red):
            count = count +1
        if(self.green):
            count = count +1
        if(self.yellow):
            count = count +1
        if(self.blue):
            count = count +1
        return count
