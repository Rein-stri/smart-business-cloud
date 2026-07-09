from flask import Flask, request, jsonify, session, send_from_directory
from flask_cors import CORS

from database import init_database, get_connection
from auth import login, register


app = Flask(__name__)

app.secret_key = "stulen-secret-key"

CORS(app)


init_database()



# =====================
# HTML FILE
# =====================

@app.route("/")
def index():
    return send_from_directory(".", "index.html")


@app.route("/dashboard")
def dashboard():
    return send_from_directory(".", "dashboard.html")


@app.route("/produk")
def produk_page():
    return send_from_directory(".", "produk.html")


@app.route("/penjualan")
def penjualan_page():
    return send_from_directory(".", "penjualan.html")


@app.route("/pelanggan")
def pelanggan_page():
    return send_from_directory(".", "pelanggan.html")


@app.route("/laporan")
def laporan_page():
    return send_from_directory(".", "laporan.html")


@app.route("/ai")
def ai_page():
    return send_from_directory(".", "ai.html")



# =====================
# LOGIN REGISTER API
# =====================

@app.route("/api/register", methods=["POST"])
def api_register():

    data=request.json

    register(
        data["username"],
        data["password"]
    )

    return jsonify({
        "status":"success"
    })



@app.route("/api/login", methods=["POST"])
def api_login():

    data=request.json

    if login(
        data["username"],
        data["password"]
    ):

        session["user"]=data["username"]

        return jsonify({
            "status":"success"
        })


    return jsonify({
        "status":"failed"
    })



# =====================
# PRODUK API
# =====================

@app.route("/api/produk")
def get_produk():

    conn=get_connection()

    rows=conn.execute(
        "SELECT * FROM produk"
    ).fetchall()

    conn.close()

    return jsonify(
        [dict(x) for x in rows]
    )



@app.route("/api/produk", methods=["POST"])
def add_produk():

    data=request.json

    conn=get_connection()

    conn.execute(
    """
    INSERT INTO produk
    (nama,harga,stok)
    VALUES(?,?,?)
    """,
    (
        data["nama"],
        data["harga"],
        data["stok"]
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "status":"ok"
    })



if __name__=="__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
