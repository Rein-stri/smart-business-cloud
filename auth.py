from werkzeug.security import generate_password_hash, check_password_hash
from database import get_connection


def register(username,password):

    conn=get_connection()

    password_hash=generate_password_hash(password)

    conn.execute(
        """
        INSERT INTO users(username,password)
        VALUES(?,?)
        """,
        (username,password_hash)
    )

    conn.commit()
    conn.close()



def login(username,password):

    conn=get_connection()

    user=conn.execute(
        "SELECT * FROM users WHERE username=?",
        (username,)
    ).fetchone()

    conn.close()

    if user and check_password_hash(user["password"],password):
        return True

    return False
