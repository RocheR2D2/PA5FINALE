# Generated by Django 2.2.2 on 2019-06-29 11:29

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('docxs', '0002_docx_created_by'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Docx',
            new_name='DocxFile',
        ),
    ]
