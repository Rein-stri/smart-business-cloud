import sqlite3

DB_NAME = "database/app.db"


def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_database():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'admin'
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS produk(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT,
        harga INTEGER,
        stok INTEGER
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS pelanggan(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT,
        telepon TEXT,
        alamat TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS penjualan(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produk_id INTEGER,
        jumlah INTEGER,
        total INTEGER,
        tanggal DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()
