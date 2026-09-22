# Web-Development-II-Notes

## What's in this Repository?
A collection of my notes taken during the Web Development II (CIS 2102) course at the University of San Carlos under the Department of Computer, Information Sciences and Mathematics!
<br><br>

## Topics
This is a list of the topics we discussed throughout the semester!
1. JS
2. JQuery
3. PHP & MySQL
<br>

## Projects
This repository also includes the projects we were tasked to create throughout the whole year!
1. Contact List (HTML, CSS, JS)
2. To-Do List (with APIs as reference)
3. Contact List (with PHP & MySQL)
<br>

## How to Run Projects?

To run projects including PHP and MySQL Databases:
1. **Install and start XAMPP**
- Download XAMPP from apachefriends.org if you don't have it. Open the XAMPP Control Panel and click Start next to both Apache and MySQL — both need to show a green/running status.
2. **Copy the project into htdocs**
- Move (or copy) the whole extracted 'output' folder into XAMPP's htdocs directory, e.g. C:\xampp\htdocs\contact-list (Windows) or /Applications/XAMPP/htdocs/contact-list (Mac). Rename the folder to something simple without spaces, like contact-list.
3. **Create the database**
- Go to http://localhost/phpmyadmin in your browser. Click 'Import', choose the db/contactlist.sql file from the project, and click Go. This creates the contactlist database and contacts table with the sample rows.
4. **Check db_connect.php credentials**
- Open db_connect.php. Default XAMPP credentials are host 'localhost', user 'root', password '' (empty). Update the $password value to an empty string '' if yours differs — a fresh XAMPP install has no MySQL root password by default.
5. **Open the site through Apache, not Live Server**
- Close the Live Server tab. Instead, visit http://localhost/contact-list/index.html in your browser. This routes requests through Apache/PHP, so the .php files actually execute and return real JSON.
6. **Test it**
- Click Add Contact, fill in the fields, and Save. Refresh the page — the contact should still be there, because it's now really stored in the local MySQL database instead of only living in the browser tab.
