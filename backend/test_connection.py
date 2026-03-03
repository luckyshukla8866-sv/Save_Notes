import asyncio
from app.database import connect_db, is_db_available, close_db

async def main():
    await connect_db()
    print('DB available?', is_db_available())
    await close_db()

if __name__ == '__main__':
    asyncio.run(main())
