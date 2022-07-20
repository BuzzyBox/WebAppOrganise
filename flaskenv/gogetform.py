
from flask_wtf import Form
from wsgiref.validate import validator
from wtforms import PasswordField,SubmitField, EmailField, StringField
from wtforms.validators import DataRequired
class tamsForms(Form):
    U_fName=StringField(label='First Name', validators=[DataRequired()])
    U_lName=StringField(label='Last Name', validators=[DataRequired()])
    U_username=StringField(label='Username', validators=[DataRequired()])
    U_passWord=PasswordField(label='Password', validators=[DataRequired()])
    U_email=EmailField(label='Email', validators=[DataRequired()])
    U_company=StringField(label='Company or Institution')
    submit=SubmitField("Register")

