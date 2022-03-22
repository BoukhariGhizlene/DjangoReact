from django.db import models

class Todo(models.Model):
    Nom = models.CharField(max_length=120)
    Adresse = models.TextField()
    Demande = models.TextField()
    # livré property is the status of the task, and we will set the default to False.
    livré = models.BooleanField(default=False)

    def _str_(self):
        return self.Nom