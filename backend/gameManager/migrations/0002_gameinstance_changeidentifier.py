# Generated by Django 4.0.5 on 2022-06-23 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gameManager', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gameinstance',
            name='changeIdentifier',
            field=models.FloatField(default=0.2675859542663169),
        ),
    ]
