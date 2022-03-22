from django.contrib import admin

from .models import Todo  # add this


class TodoAdmin(admin.ModelAdmin):  # add this
    list_display = ('Nom', 'Adresse', 'Demande','livré')  # add this


# Register your models here.
admin.site.register(Todo, TodoAdmin) 