#TABS
from turtle import onclick
from webbrowser import open_new_tab
from xml.dom.minidom import Document



import js2py



def opentabs(cityname,elmnt,color):
    i = 2;
    cityname = cityname
    elmnt = elmnt
    color = color
    cityname =Document.getElementById("tablink");
    for i in elmnt:
        cityname[i].style.display = "none"
    
    Document.getElementById(cityname).style.display ="block"

    elmnt.style.backgroundColor = color;

opentabs()

def open():
    if tablink