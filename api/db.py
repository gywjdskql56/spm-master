import psycopg2

class Databases():
    def __init__(self):
        self.db = psycopg2.connect(host='localhost', dbname='test',user='postgres',password='591556',port=5432)
        self.cursor = self.db.cursor()

    def __del__(self):
        self.db.close()
        self.cursor.close()

    def execute(self,query,args={}):
        self.cursor.execute(query)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.cursor.commit()

    #
    # def insertDB(self, schema, table, colum, data):
    #     sql = " INSERT INTO {schema}.{table}({colum}) VALUES ('{data}') ;".format(schema=schema, table=table,
    #                                                                               colum=colum, data=data)
    #     try:
    #         self.cursor.execute(sql)
    #         self.db.commit()
    #     except Exception as e:
    #         print(" insert DB  ", e)


if __name__ =='__main__':
    conn = psycopg2.connect(host='localhost', dbname='test', user='postgres', password='591556', port=5432)
    cur = conn.cursor()
    # db = Databases()
    sql = '''CREATE TABLE CRICKETERS (
   First_Name VARCHAR(255),
   Last_Name VARCHAR(255),
   Age INT,
   Place_Of_Birth VARCHAR(255),
   Country VARCHAR(255)
    );'''
    cur.execute(sql)
    sql ='''INSERT INTO cricketers(FIRST_NAME, LAST_NAME, AGE, Place_Of_Birth,
   Country) VALUES ('Ramya', 'Rama priya', 27, 'F', 9000)'''
    cur.execute(sql)
    print(1)