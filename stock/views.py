import csv
import os
from django.conf import settings
from django.contrib import messages
from django.db.models import Q
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from .form import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse

# Create your views here.


def new_register(request):
    form = UserCreationForm
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/accounts/login/')
    context = {'form': form}
    return render(request, 'stock/register.html', context)


@login_required
def get_client_ip(request):
    labels = []
    label_item = []
    data = []
    issue_data = []
    receive_data = []
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    u = User(user=ip)
    result = User.objects.filter(Q(user__icontains=ip))
    if len(result) == 1:
        pass
    else:
        u.save()
        return ip
    queryset = Stock.objects.all()
    querys = Category.objects.all()
    for chart in queryset:
        label_item.append(chart.item_name)
        data.append(chart.quantity)
        issue_data.append(chart.issue_quantity)
        receive_data.append(chart.receive_quantity)
    for chart in querys:
        labels.append(str(chart.group))

    count = User.objects.all().count()
    body = Category.objects.values('stock').count()
    mind = Category.objects.values('stockhistory').count()
    soul = Category.objects.values('group').count()
    context = {
        'count': count,
        'body': body,
        'mind': mind,
        'soul': soul,
        'labels': labels,
        'data': data,
        'issue_data': issue_data,
        'receive_data': receive_data,
        'label_item': label_item
    }
    return render(request, 'stock/home.html', context)


@login_required
def view_stock(request):
    title = "VIEW STOCKS"
    everything = Stock.objects.all()
    form = StockSearchForm(request.POST or None)

    context = {'everything': everything, 'form': form}
    if request.method == 'POST':
        category = form['category'].value()
        everything = Stock.objects.filter(item_name__icontains=form['item_name'].value())
        if category != '':
            everything = everything.filter(category_id=category)

        if form['export_to_CSV'].value() == True:
            resp = HttpResponse(content_type='text/csv')
            resp['Content-Disposition'] = 'attachment; filename = "Invoice.csv"'
            writer = csv.writer(resp)
            writer.writerow(['CATEGORY', 'ITEM NAME', 'QUANTITY'])
            instance = everything
            for stock in instance:
                writer.writerow([stock.category, stock.item_name, stock.quantity])
            return resp
        context = {'title': title, 'everything': everything, 'form': form}
    return render(request, 'stock/view_stock.html', context)


@login_required
def scrum_list(request):
    title = 'Add List'
    add = ScrumTitles.objects.all()
    sub = Scrums.objects.all()
    if request.method == 'POST':
        form = AddScrumListForm(request.POST, prefix='banned')
        if form.is_valid():
            form.save()
    else:
        form = AddScrumListForm(prefix='banned')
    if request.method == 'POST' and not form:
        task_form = AddScrumTaskForm(request.POST, prefix='expected')
        form = AddScrumListForm(prefix='banned')
        if task_form.is_valid():
            task_form.save()
    else:
        task_form = AddScrumTaskForm(prefix='expected')
    context = {'add': add, 'form': form, 'task_form': task_form, 'sub': sub, 'title': title}
    return render(request, 'stock/scrumboard.html', context)





@login_required
def scrum_view(request):
    title = 'View'
    viewers = ScrumTitles.objects.all()
    context = {'title': title, 'view': viewers}
    return render(request, 'stock/scrumboard.html', context)


@login_required
def add_stock(request):
    title = 'Add Stock'
    add = Stock.objects.all()
    form = StockCreateForm
    if request.method == 'POST':
        form = StockCreateForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Successful')
            return redirect('/view_stock')
    context = {'add': add, 'form': form, 'title': title}
    return render(request, 'stock/add_stock.html', context)


@login_required
def update_stock(request, pk):
    title = 'Update Stock'
    update = Stock.objects.get(id=pk)
    form = StockUpdateForm(instance=update)
    if request.method == 'POST':
        form = StockUpdateForm(request.POST, request.FILES, instance=update)
        if form.is_valid():
            image_path = update.image.path
            if os.path.exists(image_path):
                os.remove(image_path)
            form.save()
            messages.success(request, 'Successfully Updated!')
            return redirect('/view_stock')
    context = {'form': form, 'update': update, 'title': title}
    return render(request, 'stock/add_stock.html', context)


@login_required
def delete_stock(request, pk):
    Stock.objects.get(id=pk).delete()
    messages.success(request, 'Your file has been deleted.')
    return redirect('/view_stock')


@login_required
def stock_detail(request, pk):
    detail = Stock.objects.get(id=pk)
    context = {
        'detail': detail
    }
    return render(request, 'stock/stock_detail.html', context)


@login_required
def issue_item(request, pk):
    issue = Stock.objects.get(id=pk)
    form = IssueForm(request.POST or None, instance=issue)
    if form.is_valid():
        value = form.save(commit=False)
        value.receive_quantity = 0
        value.quantity = value.quantity - value.issue_quantity
        value.issued_by = str(request.user)
        if value.quantity >= 0:
            messages.success(request, "Issued Successfully, " + str(value.quantity) + " " + str(
                value.item_name) + "s now left in Store")
            value.save()
        else:
            messages.error(request, "Insufficient Stock")

        return redirect('/stock_detail/' + str(value.id))

    context = {
        "title": 'Issue ' + str(issue.item_name),
        "issue": issue,
        "form": form,
        "username": 'Issued by: ' + str(request.user),
    }
    return render(request, "stock/add_stock.html", context)


@login_required
def receive_item(request, pk):
    receive = Stock.objects.get(id=pk)
    form = ReceiveForm(request.POST or None, instance=receive)
    if form.is_valid():
        value = form.save(commit=False)
        value.issue_quantity = 0
        value.quantity = value.quantity + value.receive_quantity
        value.received_by = str(request.user)
        value.save()
        messages.success(request, "Received Successfully, " + str(value.quantity) + " " + str(
            value.item_name) + "s now in Store")

        return redirect('/stock_detail/' + str(value.id))
    context = {
        "title": 'Receive ' + str(receive.item_name),
        "receive": receive,
        "form": form,
        "username": 'Received by: ' + str(request.user),
    }
    return render(request, "stock/add_stock.html", context)


@login_required
def re_order(request, pk):
    order = Stock.objects.get(id=pk)
    form = ReorderLevelForm(request.POST or None, instance=order)
    if form.is_valid():
        value = form.save(commit=False)
        value.save()
        messages.success(request, 'Reorder level for ' + str(value.item_name) + ' is updated to ' + str(value.re_order))
        return redirect('/view_stock')
    context = {
        'value': order,
        'form': form
    }
    return render(request, 'stock/add_stock.html', context)


@login_required()
def view_history(request):
    title = "STOCK HISTORY"
    history = StockHistory.objects.all()
    form = StockHistorySearchForm(request.POST or None)
    context = {
        'title': title,
        'history': history,
        'form': form
    }
    if request.method == 'POST':
        category = form['category'].value()
        history = StockHistory.objects.filter(item_name__icontains=form['item_name'].value(),

                                              last_updated__range=[
                                                                form['start_date'].value(),
                                                                form['end_date'].value()
                                              ]
                                              )
        if category != '':
            history = history.filter(category_id=category)

        if form['export_to_CSV'].value() == True:
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="Stock History.csv"'
            writer = csv.writer(response)
            writer.writerow(
                ['CATEGORY',
                 'ITEM NAME',
                 'QUANTITY',
                 'ISSUE QUANTITY',
                 'RECEIVE QUANTITY',
                 'RECEIVE BY',
                 'ISSUE BY',
                 'LAST UPDATED'])
            instance = history
            for stock in instance:
                writer.writerow(
                    [stock.category,
                     stock.item_name,
                     stock.quantity,
                     stock.issue_quantity,
                     stock.receive_quantity,
                     stock.received_by,
                     stock.issued_by,
                     stock.last_updated])
            return response
        context = {
            'form': form,
            'title': title,
            'history': history,
        }
    return render(request, 'stock/view_history.html', context)


@login_required
def dependent_forms(request):
    title = 'Dependent Forms'
    form = DependentDropdownForm()
    if request.method == 'POST':
        form = DependentDropdownForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, str(form['name'].value()) + ' Successfully Added!')
            return redirect('/depend_form_view')
    context = {'form': form, 'title': title}
    return render(request, 'stock/add_stock.html', context)


@login_required
def dependent_forms_update(request, pk):
    title = 'Update Form'
    dependent_update = Person.objects.get(id=pk)
    form = DependentDropdownForm(instance=dependent_update)
    if request.method == 'POST':
        form = DependentDropdownForm(request.POST, instance=dependent_update)
        if form.is_valid():
            form.save()
            messages.success(request, 'Successfully Updated!')
            return redirect('/depend_form_view')
    context = {
        'title': title,
        'dependent_update': dependent_update,
        'form': form
    }
    return render(request, 'stock/add_stock.html', context)


@login_required
def dependent_forms_view(request):
    title = 'Dependent Views'
    viewers = Person.objects.all()
    context = {'title': title, 'view': viewers}
    return render(request, 'stock/depend_form_view.html', context)


@login_required
def delete_dependant(request, pk):
    Person.objects.get(id=pk).delete()
    messages.success(request, 'Your file has been deleted.')
    return redirect('/depend_form_view')


def load_stats(request):
    country_idm = request.GET.get('country_id')
    states = State.objects.filter(country_id=country_idm)
    context = {'states': states}
    return render(request, 'stock/state_dropdown_list_options.html', context)


def load_cities(request):
    state_main_id = request.GET.get('state_id')
    cities = City.objects.filter(state_id=state_main_id)
    context = {'cities': cities}
    return render(request, 'stock/city_dropdown_list_options.html', context)


@login_required
def contact(request):
    title = 'Contacts'
    people = Contacts.objects.all()
    form = ContactsForm(request.POST or None)
    if request.method == 'POST':
        form = ContactsForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Successfully Added')
            return redirect('/contacts')
    context = {'people': people, 'form': form, 'title': title}
    return render(request, 'stock/contacts.html', context)

