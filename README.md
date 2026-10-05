# Web-Development-II-Notes

## What's in this Repository?
A collection of my notes taken during the Web Development II (CIS 2102) course at the University of San Carlos under the Department of Computer, Information Sciences and Mathematics!
<br><br>

## Topics
This is a list of the topics we discussed throughout the semester!
1. JS
2. JQuery
3. PHP & MySQL
4. ReactJS (including Node.js and Vite)
<br>

## Projects
This repository also includes the projects we were tasked to create throughout the whole year!
1. Contact List (HTML, CSS, JS)
2. To-Do List (with APIs as reference)
3. Contact List (with PHP & MySQL)
4. React: Introductory Project
<br>

## How to Run Projects?

### **To run projects including PHP and MySQL Databases:**
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
<br><br>

### **To run projects involving Vite or React**
1. Install Node.js (If not already installed)
- React requires Node.js and its package manager, npm, to manage code packages and run local servers.
  a. Download and install the LTS (Long Term Support) version from the Official Node.js Website.<br>
  b. Open your computer's terminal (Command Prompt, PowerShell, or macOS Terminal) and verify the installation by typing:bash
```
node -v
npm -v
```
2. Open Your Project in a Terminal
- Navigate to the folder containing your React project. If you use an editor like Visual Studio Code, you can open the project folder in the editor and open the built-in terminal (Ctrl + ~ or Terminal > New Terminal).
- If you are using a standard command prompt, change your directory to the project folder:
```cd path/to/your/react-project```
3. Install Project Dependencies
- Before running the app for the first time (or if you just downloaded/cloned the project), you must download the required packages listed in the package.json file. Run the following command:
```npm install```
4. Start the Development Server
- The exact command to run your project depends on how the React application was initially created. Look at your project files to see which command to use:
- For Vite projects (or React projects with vite.config.js file in the root folder), start the server using:
```npm run dev```
