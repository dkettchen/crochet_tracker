// example of common way to do XMLHttpRequest with js! 
// (source:https://www.w3schools.com/xml/xml_http.asp)

// creates request
var xhttp = new XMLHttpRequest();

// execute this function whenever status of XMLHttpRequest object changes
xhttp.onreadystatechange = function() {
    // if its state is 4 & status is 200 -> ready
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        document.getElementById("demo").innerHTML = xhttp.responseText;
            // responseText returns response from server as text string
            // -> can be used to update the website via innerHTML
    }
};
xhttp.open("GET", "filename", true);
xhttp.send();



// example that parses xml string into a DOM (source: https://www.w3schools.com/xml/xml_parser.asp)

var text, parser, xmlDoc;

// text that's formatted like xml
text = "<bookstore><book>" +
"<title>Everyday Italian</title>" +
"<author>Giada De Laurentiis</author>" +
"<year>2005</year>" +
"</book></bookstore>";

// makes a new parser
parser = new DOMParser();
// extracts data from string
xmlDoc = parser.parseFromString(text,"text/xml");

document.getElementById("demo").innerHTML =
xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;