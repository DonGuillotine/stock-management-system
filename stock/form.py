from django import forms
from .models import *


# fields = '__all__' to display all


class StockCreateForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = ['category', 'item_name', 'quantity', 'image', 'date']

    # def clean_category(self):
    #     category = self.cleaned_data.get('category')
    #     if not category:
    #         raise forms.ValidationError('This Field should not be empty')
    #     for something in Stock.objects.all():
    #         if something.category == category:
    #             raise forms.ValidationError(category + " Already Exists")
    #     return category
    #
    # def clean_item(self):
    #     item = self.cleaned_data.get('item_name')
    #     if not item:
    #         raise forms.ValidationError('This Field should not be empty')
    #     for something in Stock.objects.all():
    #         if something.category == item:
    #             raise forms.ValidationError(item + " Already Exists")
    #     return item


class StockHistorySearchForm(forms.ModelForm):
    export_to_CSV = forms.BooleanField(required=False)
    start_date = forms.DateTimeField(required=False)
    end_date = forms.DateTimeField(required=False)

    class Meta:
        model = StockHistory
        fields = ['category', 'item_name', 'start_date', 'end_date']


class StockSearchForm(forms.ModelForm):
    export_to_CSV = forms.BooleanField(required=False)

    class Meta:
        model = Stock
        fields = ['category', 'item_name']


class StockUpdateForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = ['category', 'item_name', 'quantity', 'image']


class IssueForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = ['issue_quantity', 'issued_to']


class ReceiveForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = ['receive_quantity']


class ReorderLevelForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = ['re_order']


class DependentDropdownForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['state'].queryset = State.objects.none()
        if 'country' in self.data:
            try:
                country_idm = int(self.data.get('country'))
                self.fields['state'].queryset = State.objects.filter(country_id=country_idm).order_by('name')
            except(ValueError, TypeError):
                pass
        elif self.instance.pk:
            self.fields['state'].queryset = self.instance.country.state_set.order_by('name')

        self.fields['city'].queryset = City.objects.none()
        if 'state' in self.data:
            try:
                state_idm = int(self.data.get('state'))
                self.fields['city'].queryset = City.objects.filter(state_id=state_idm).order_by('name')
            except(ValueError, TypeError):
                pass
        elif self.instance.pk:
            self.fields['city'].queryset = self.instance.state.city_set.order_by('name')


class AddScrumListForm(forms.ModelForm):
    class Meta:

        model = ScrumTitles
        fields = ['lists']


class AddScrumTaskForm(forms.ModelForm):
    class Meta:
        model = Scrums
        fields = ['task', 'task_description', 'task_date']


class ContactsForm(forms.ModelForm):
    class Meta:
        model = Contacts
        fields = '__all__'
