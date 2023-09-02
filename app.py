from flask import Flask, render_template, session, redirect, url_for, g, request, flash
from database import get_db, close_db
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from forms import RegistrationForm, LoginForm
from functools import wraps
from datetime import datetime
from itsdangerous import URLSafeSerializer, SignatureExpired

app = Flask(__name__)
app.config["SECRET_KEY"] = "SECRET-KEY"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
app.teardown_appcontext(close_db)
#email verification

@app.before_request
def logged_in_user():
    g.user = session.get('user_id', None)  



def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(*args, **kwargs)
    return wrapped_view

@app.route("/", methods =["GET","POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        username = username.lower()
        password = form.password.data
        db = get_db()
        user_validate = db.execute("""SELECT * FROM users
                                WHERE username = ?;""",(username,)).fetchone()
        if user_validate is None:
            form.username.errors.append("You have typed the wrong Username")
        elif not check_password_hash(user_validate["password"], password):
            form.password.errors.append("Incorrect Password")
        else:
            user_id = user_validate['user_id']
            session.clear()
            session["user_id"] = user_id
            next_page = request.args.get("next")
            if not next_page:
                next_page=url_for("index")
            return redirect(next_page)
    return render_template('login.html',form=form)

@app.route("/register", methods=["GET","POST"])
def register():
    db = get_db()
    form = RegistrationForm()
    if form.validate_on_submit():
        username = form.username.data 
        username = username.lower()
        password = form.password.data
        password2 = form.password2.data
        duplicate_username = db.execute("""SELECT * FROM users
                            WHERE username = ?;""",(username,)).fetchone()
        if duplicate_username is not None:
            form.username.errors.append("Username already taken.")
        else:
            password = generate_password_hash(password)
            db.execute("""INSERT INTO users (username, password) VALUES(?, ?);""", (username, password))
            db.commit()
            return redirect(url_for('login'))
    return render_template("register.html", form=form)


@app.route('/home')
@login_required
def index():
    return render_template('index.html')

@app.route("/game")
@login_required
def game():
    return render_template("game.html")


@app.route("/endless")
@login_required
def endless():
    return render_template("endless.html")

@app.route("/tutorial")
@login_required
def tutorial():
    return render_template("tutorial.html")

@app.route("/goodEnding")
@login_required
def goodEnding():
    return render_template("goodEnding.html")

@app.route("/badEnding1")
@login_required
def badEnding1():
    return render_template("badEnding1.html")

@app.route("/badEnding2")
@login_required
def badEnding2():
    return render_template("badEnding2.html")

@app.route("/selfish")
@login_required
def selfish():
    return render_template("selfish.html")

@app.route("/score_board")
@login_required
def score_board():
    db = get_db()
    scores = db.execute("""SELECT * FROM score_board as s JOIN users as u ON u.user_id = s.user ORDER BY s.score DESC;""").fetchall()
    return render_template("scoreBoard.html", scores=scores)

@app.route("/store_score", methods = ["POST"])
@login_required
def store_score():
    score = int(request.form['score'])
    kitten = int(request.form['kitten'])
    coin = int(request.form['coins'])
    slime = int(request.form['slime'])
    db = get_db()
    user = db.execute("""SELECT * FROM users as u JOIN score_board as s
                        ON u.user_id = s.user
                                WHERE user_id = ?;""",(g.user,)).fetchone()
    if user is None:
        db.execute("""INSERT INTO score_board (user, kitten, coin, slime, score) VALUES(?, ?, ?, ?, ?);""", (g.user, kitten, coin, slime, score))
        db.commit()
    else: 
        if user['score'] < score:
            db.execute("""UPDATE score_board SET kitten =?, coin =?, slime=?, score=? WHERE user=?;""", (kitten, coin, slime, score, g.user))
            db.commit()
    return 'success'

@app.route("/story", methods = ["POST"])
@login_required
def story():
    kitten = int(request.form['kitten'])
    coin = int(request.form['coins'])
    slime = int(request.form['slime'])

    return 'success'

@app.route("/logout")
@login_required
def logout():
    session.clear()
    return redirect( url_for("login") )
