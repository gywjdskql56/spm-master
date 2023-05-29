from flask import Flask, request
from flask_cors import CORS
import warnings
import pandas as pd
from datetime import datetime
import random
warnings.filterwarnings("ignore")
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app, resources={r'*': {'origins': '*'}})

@app.route('/get_category', methods=['GET', 'POST'])
def get_category():
    data = pd.read_excel("data/CATEGORY.xlsx")
    return {'data': data['category_name'].tolist()}

@app.route('/get_ticket', methods=['GET', 'POST'])
def get_ticket():
    data = pd.read_excel("data/TICKET.xlsx")
    data = data.transpose().to_dict()
    data_list = list()
    for key in data.keys():
        data_list.append(data[key])
    return {'data': data_list}

@app.route('/get_ticket_by_id/<id>', methods=['GET', 'POST'])
def get_ticket_by_id(id):
    data = pd.read_excel("data/TICKET.xlsx")
    data = data[data['id']==id]
    data = data.transpose().to_dict()
    return {'data': data[list(data.keys())[0]]}

@app.route('/get_ticket_by_type/<type>', methods=['GET', 'POST'])
def get_ticket_by_type(type):
    data = pd.read_excel("data/TICKET.xlsx")
    data = data[data['to']==type].transpose().to_dict()
    data_list = list()
    for key in data.keys():
        data_list.append(data[key])
    return {'data': data_list}

@app.route('/get_cust', methods=['GET', 'POST'])
def get_cust():
    data = pd.read_excel("data/CUST.xlsx")
    return data.to_json(force_ascii=False).encode('utf-8')

@app.route('/get_cust_by_id/<email>', methods=['GET', 'POST'])
def get_cust_by_id(email):
    data = pd.read_excel("data/CUST.xlsx")
    data = data.set_index('email').loc[email].transpose().to_dict()
    # {'country': 'KR',
    #  'firstName': 'Hyojeong',
    #  'lastName': 'Kim',
    #  'oauthProvider': 'self',
    #  'password': 1234,
    #  'phoneNum': '010-7748-0152'}
    return data

@app.route('/get_product_all', methods=['GET', 'POST'])
def get_product_all():
    data = pd.read_excel("data/PRODUCT.xlsx")
    data = data.fillna('')
    data_dict = data.transpose().to_dict()
    data_list = []
    for i in data_dict.keys():
        data_list.append(data_dict[i])
    return data_list

@app.route('/get_product_by_category/<category>', methods=['GET', 'POST'])
def get_product_by_category(category):
    data = pd.read_excel("data/PRODUCT.xlsx")
    data = data.fillna('')
    if category!='all':
        data = data[data['category_name']==category]
    data_dict = data.transpose().to_dict()
    data_list = []
    for i in data_dict.keys():
        data_list.append(data_dict[i])
    return data_list

@app.route('/get_product_filter/<type>|<brand>', methods=['GET', 'POST'])
def get_product_filter(type, brand):

    product = pd.read_excel("data/PRODUCT.xlsx")
    vendor = pd.read_excel("data/VENDOR.xlsx")
    data = pd.merge(product, vendor, left_on='company_code', right_on='company_code', how='left')
    data = data[data[type]==brand]
    data = data.fillna('')
    data_dict = data.transpose().to_dict()
    data_list = []
    for i in data_dict.keys():
        data_list.append(data_dict[i])
    return data_list

@app.route('/get_product/<vendor_id>', methods=['GET', 'POST'])
def get_product(vendor_id):
    data = pd.read_excel("data/PRODUCT.xlsx")
    data = data[data['company_code']==vendor_id].fillna('')
    data_dict = data.transpose().to_dict()
    data_list = []
    for i in data_dict.keys():
        data_list.append(data_dict[i])
    return data_list #data.to_json(force_ascii=False).encode('utf-8')

@app.route('/get_product_by_id/<product_id>', methods=['GET', 'POST'])
def get_product_by_id(product_id):
    data = pd.read_excel("data/PRODUCT.xlsx")
    data = data[data['product_id']==product_id].fillna('').set_index('product_id')
    data_dict = data.transpose().to_dict()
    data_dict[product_id]['date_list'] = eval(data_dict[product_id]['date_list'])
    print(data_dict)
    return data_dict

@app.route('/get_product_detail_by_id/<product_id>', methods=['GET', 'POST'])
def get_product_detail_by_id(product_id):
    product = pd.read_excel("data/PRODUCT.xlsx")
    vendor = pd.read_excel("data/VENDOR.xlsx")
    review = pd.read_excel("data/REVIEW.xlsx")
    review = review[review['product_id']==product_id]
    review = review.set_index('id').transpose().to_dict()
    review_list = list()
    for key in review.keys():
        review_list.append(review[key])
    data = pd.merge(product, vendor, left_on='company_code', right_on='company_code', how='left')
    data = data.rename(columns={'product_id':'id','product_name':'name','price':'org_price','sale_price':'price'})
    data = data[data['id']==product_id].fillna('').set_index('id')
    data_dict = data.transpose().to_dict()
    data_dict[product_id]['date_list'] = eval(data_dict[product_id]['date_list'])
    data_dict[product_id]['id'] = product_id
    data_dict[product_id]['option'] = data_dict[product_id]['option'].split('|') if data_dict[product_id]['option']!="" else []
    data_dict[product_id]['title'] = data_dict[product_id]['name']
    data_dict[product_id]['images'] = ["/assets/images/products/Package/"+data_dict[product_id]['img']+".png"]*2
    data_dict[product_id]['review'] = review_list
    print(data_dict)
    return data_dict[product_id]

@app.route('/get_cart_by_id/<cust_id>', methods=['GET', 'POST'])
def get_cart_by_id(cust_id):
    cart = pd.read_excel("data/CART.xlsx")
    product = pd.read_excel("data/PRODUCT.xlsx")
    data = pd.merge(cart, product, left_on='product_id', right_on='product_id', how='left')
    data['slug'] = data['product_id']
    data['imgUrl'] = data['img'].apply(lambda x: '/assets/images/products/Package/{}.png'.format(x))
    data = data.rename(columns={'product_id':'id','product_name':'name','price':'org_price','sale_price':'price'})
    data_dict = data[data['email']==cust_id].fillna('').transpose().to_dict()
    data_list = list()
    for key in data_dict.keys():
        data_list.append(data_dict[key])
    return {"data":data_list}

@app.route('/get_region', methods=['GET', 'POST'])
def get_region():
    data = pd.read_excel("data/REGION.xlsx")
    return {"data": data['region_name'].tolist()}

@app.route('/get_reserve', methods=['GET', 'POST'])
def get_reserve():
    data = pd.read_excel("data/RESERVE.xlsx")
    return data.to_json(force_ascii=False).encode('utf-8')

@app.route('/get_vendor', methods=['GET', 'POST'])
def get_vendor():
    data = pd.read_excel("data/VENDOR.xlsx")
    return data.to_json(force_ascii=False).encode('utf-8')

@app.route('/do_login/<email>_<password>', methods=['GET', 'POST'])
def do_login(email, password):
    if email == 'admin@gmail.com' and str(password) == 'admin':
        return {'result': 'admin'}
    cust = pd.read_excel("data/CUST.xlsx")
    vendor = pd.read_excel("data/VENDOR.xlsx")
    # admin = pd.read_excel("data/ADMIN.xlsx")
    if email not in cust['email'].tolist()+vendor['email'].tolist():
        return {'result': 'fail'}
    else:
        pair_cust = cust[['email','password']].set_index('email').to_dict()['password']
        pair_vendor = vendor[['email','password']].set_index('email').to_dict()['password']
        if email in pair_cust.keys() and str(password) == str(pair_cust[email]):
            return {'result': 'cust'}
        elif email in pair_vendor.keys() and str(password) == str(pair_vendor[email]):
            return {'result': 'vendor'}
        else:
            return {'result': 'fail'}
@app.route('/insert_ticket_answer', methods=['GET', 'POST'])
def insert_ticket_answer():
    if request.method=='POST':
        data = request.get_json()
        print(data)
        ticket = pd.read_excel("data/TICKET.xlsx").set_index('id')
        ticket.loc[data['id'], 'answer'] = data['answer']
        ticket.loc[data['id'], 'date_answer'] = datetime.now()
        # max_id = max(list(map(lambda x: int(x.replace('R', '')), review['id']))) + 1
        # max_id = "R"+'0'*(5-len(str(max_id)))+str(max_id)
        # data['id'] = max_id
        # review = review.append(data, ignore_index=True)
        ticket.reset_index().to_excel("data/TICKET.xlsx", index=False)
        return {'response': "success"}
    else:
        return {'response': "fail"}

@app.route('/insert_ticket_question', methods=['GET', 'POST'])
def insert_ticket_question():
    if request.method=='POST':
        data = request.get_json()
        print(data)
        ticket = pd.read_excel("data/TICKET.xlsx")
        new_id = max(list(map(lambda x: int(x.replace("T", '')), ticket['id'])))+1
        new_id = 'P' + '0' * (5 - len(str(new_id))) + str(new_id)
        data['id'] = new_id
        data['answer'] = ""
        data['to'] = "admin" if data['to'] else "vendor"
        data['public'] = "Y" if data['public'] else "N"
        data['status'] = "답변대기"
        data['date'] = datetime.now()
        data['date_answer'] = ""
        ticket = ticket.append(data, ignore_index=True)
        # max_id = max(list(map(lambda x: int(x.replace('R', '')), review['id']))) + 1
        # max_id = "R"+'0'*(5-len(str(max_id)))+str(max_id)
        # data['id'] = max_id
        # review = review.append(data, ignore_index=True)
        ticket.reset_index().to_excel("data/TICKET.xlsx", index=False)
        return {'response': "success"}
    else:
        return {'response': "fail"}

@app.route('/insert_review', methods=['GET', 'POST'])
def insert_review():
    if request.method=='POST':
        data = request.get_json()
        data['product_id'] = data['product_id'][0]
        print(data)
        review = pd.read_excel("data/REVIEW.xlsx")
        max_id = max(list(map(lambda x: int(x.replace('R', '')), review['id']))) + 1
        max_id = "R"+'0'*(5-len(str(max_id)))+str(max_id)
        data['id'] = max_id
        review = review.append(data, ignore_index=True)
        review.to_excel("data/REVIEW.xlsx", index=False)
        return {'response': "success"}
    else:
        return {'response': "fail"}
@app.route('/insert_product', methods=['GET', 'POST'])
def insert_product():
    if request.method=='POST':
        data = request.get_json()
        print(data)
        print("insert_product")
        product_name = data['product_name']
        print(product_name)
        company_code = data['company_code']
        print(company_code)
        public = data['public']
        data['public'] = "Y" if data['public'] else "N"
        print(public)
        detail = data['detail']
        print(detail)
        price = data['price']
        print(price)
        category_name = data['category_name']
        print(category_name)
        region_name = data['region_name']
        print(region_name)
        option = data['option']
        print(option)
        org_data = pd.read_excel("data/PRODUCT.xlsx")
        max_id = max(list(map(lambda x: int(x.replace('P', '')), org_data['product_id'].tolist()))) + 1
        product_id = 'P'+'0'*(5-len(str(max_id)))+str(max_id)
        data['product_id'] = product_id
        data['date'] = datetime.now()
        data['img'] = 'img_'+str(random.randint(1, 8))
        org_data = org_data.append(data, ignore_index=True)
        org_data.to_excel("data/PRODUCT.xlsx", index=False)
        return {'response': "success"}
    else:
        return {'response': "fail"}
if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)
    print(1)