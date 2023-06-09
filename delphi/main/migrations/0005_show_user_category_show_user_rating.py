# Generated by Django 4.0.4 on 2023-04-09 14:50

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_movie_user_category_movie_user_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='show',
            name='user_category',
            field=models.CharField(choices=[('WATCHING', 'Watching'), ('PLAN_TO_WATCH', 'Planning to watch'), ('WATCHED', 'Watched')], default='PLAN_TO_WATCH', max_length=100),
        ),
        migrations.AddField(
            model_name='show',
            name='user_rating',
            field=models.FloatField(default=1.0, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(5.0)]),
        ),
    ]
