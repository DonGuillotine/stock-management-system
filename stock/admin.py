from django.contrib import admin
from .form import *


# Register your models here.


class StockCreateAdmin(admin.ModelAdmin):
    list_display = ['category', 'item_name', 'quantity']
    form = StockCreateForm
    list_filter = ['category']
    search_fields = ['category', 'item_name']


admin.site.register(Stock, StockCreateAdmin)
admin.site.register(Category)
admin.site.register(User)
admin.site.register(Country)
admin.site.register(State)
admin.site.register(City)
admin.site.register(Person)
admin.site.register(Contacts)
