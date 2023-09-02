from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, PasswordField, SubmitField, DateField, SelectField, EmailField
from wtforms.validators import InputRequired, EqualTo

class RegistrationForm(FlaskForm):
    username = StringField('Username: ', validators=[InputRequired()], render_kw={"placeholder": "Please enter an username"})
    password = PasswordField('Password: ', validators=[InputRequired()], render_kw={"placeholder": "Please enter a password"})
    password2 = PasswordField('Confirm Password: ', validators=[InputRequired(), EqualTo('password')])
    submit = SubmitField("Register")

class LoginForm(FlaskForm):
    username = StringField('Username ', validators=[InputRequired()], render_kw={"placeholder": "Please enter your username"})
    password = PasswordField('Password ', validators=[InputRequired()], render_kw={"placeholder": "Please enter your password"})
    submit = SubmitField("Login")