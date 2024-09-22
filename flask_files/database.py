import pyodbc

class Database:
    def __init__(self, connection_string):
        self.connection = pyodbc.connect(connection_string) #Establish connection
        self.cursor = self.connection.cursor()

    def get_translogs(self, command = 'select * from TransLog'):
        self.cursor.execute(command)        
        rows = self.cursor.fetchall()
        translogs = []
        for row in rows:
            translogs.append(row) #Example row: (0, 'How do i say hello in Japanese', 'さよなら', datetime.datetime(2024, 9, 22, 2, 28, 32, 910000), 'JDai')
        return translogs

    def get_users(self, command = 'select * from [User]'): #the [] needed around User since User is a default value in MSSQL
        self.cursor.execute(command)        
        rows = self.cursor.fetchall()
        users = []
        for row in rows:
            users.append(row) #Example row: (0, 'How do i say hello in Japanese', 'さよなら', datetime.datetime(2024, 9, 22, 2, 28, 32, 910000), 'JDai')
        return users
    
    def close_connection(self): #closes connection duh
        self.cursor.close()
        self.connection.close()
        return 'connection closed'
