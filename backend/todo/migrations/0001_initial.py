# Generated by Django 4.0.3 on 2022-03-16 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Nom', models.CharField(max_length=120)),
                ('Adresse', models.TextField()),
                ('Demande', models.TextField()),
                ('livré', models.BooleanField(default=False)),
            ],
        ),
    ]