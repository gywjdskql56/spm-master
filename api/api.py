from flask import Flask, request, jsonify
from flask_cors import CORS
import warnings
import pandas as pd
from datetime import datetime
import random
warnings.filterwarnings("ignore")
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/get_category', methods=['GET', 'POST'])
def get_category():
    data = pd.read_excel("data/CATEGORY.xlsx")
    return {'data': data['category_name'].tolist()}

@app.route('/get_cust', methods=['GET', 'POST'])
def get_cust():
    data = pd.read_excel("data/CUST.xlsx")
    return data.to_json(force_ascii=False).encode('utf-8')


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
    print(data_dict)
    return data_dict

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