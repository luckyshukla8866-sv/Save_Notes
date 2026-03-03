import os
from urllib.parse import quote_plus
from pymongo import MongoClient

host = os.getenv('MONGO_HOST', 'localhost:27017')
user = os.getenv('MONGO_USER', '')
password = os.getenv('MONGO_PASSWORD', '')
if user and password:
    uri = f"mongodb+srv://{quote_plus(user)}:{quote_plus(password)}@{host}/?appName=Test"
else:
    uri = f"mongodb://{host}"
print('Connecting to URI:', uri)
client = MongoClient(uri, serverSelectionTimeoutMS=5000)
try:
    client.admin.command('ping')
    print('Ping successful')
except Exception as e:
    print('Ping failed:', e)
finally:
    client.close()
