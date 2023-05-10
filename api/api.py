from flask import Flask
from flask_cors import CORS
import warnings
import pandas as pd

warnings.filterwarnings("ignore")
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/get_category', methods=['GET', 'POST'])
def get_category():
    data = pd.read_excel("data/CATEGORY.xlsx")
    return data.to_json(force_ascii=False).encode('utf-8')

@app.route('/get_cust', methods=['GET', 'POST'])
def get_cust():
    data = pd.read_excel("data/CUST.xlsx")
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


@app.route('/get_product', methods=['GET', 'POST'])
def get_product():
    data = pd.read_excel("data/PRODUCT.xlsx")
    return data.to_json(force_ascii=False).encode('utf-8')

@app.route('/get_region', methods=['GET', 'POST'])
def get_region():
    data = pd.read_excel("data/REGION.xlsx")
    return data.to_json(force_ascii=False).encode('utf-8')

@app.route('/get_reserve', methods=['GET', 'POST'])
def get_reserve():
    data = pd.read_excel("data/RESERVE.xlsx")
    return data.to_json(force_ascii=False).encode('utf-8')

@app.route('/get_vendor', methods=['GET', 'POST'])
def get_vendor():
    data = pd.read_excel("data/VENDOR.xlsx")
    return data.to_json(force_ascii=False).encode('utf-8')

if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)
    print(1)