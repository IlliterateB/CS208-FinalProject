# CS208 Full Stack Final Project

## Documentation

### Starting Server and Running Code
# From given example


    CS208-full-stack
This is a full-stack application for CS208, built with Node.js, Express, and MariaDB (MySQL). It serves as a template for developing web applications using modern JavaScript practices. Please read the following instructions carefully because some of the setup only needs to be done once. If you are experiencing problems, please refer to the troubleshooting section before requesting assistance or rerunning the setup scripts.

Database Setup
To set up the database, run the install_db.sh script. This script will install MariaDB and start the server running. You only need to run this script once per Codespace.

./setup_scripts/install_db.sh
Use the following for questions that the script asks:

Switch to unix_socket authentication [Y/n] n
Change the root password? [Y/n] Y
Set the password to 12345
Remove anonymous users? [Y/n] Y
Disallow root login remotely? [Y/n] Y
Remove test database and access to it? [Y/n] Y
Reload privilege tables now? [Y/n] Y
Test to make sure the db is running:

sudo service mariadb status
You should see something similar to what is shown below.

* /usr/bin/mariadb-admin  Ver 10.0 Distrib 10.11.13-MariaDB, for debian-linux-gnu on x86_64
Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Server version          10.11.13-MariaDB-0ubuntu0.24.04.1
Protocol version        10
Connection              Localhost via UNIX socket
UNIX socket             /run/mysqld/mysqld.sock
Uptime:                 10 min 23 sec

Threads: 1  Questions: 90  Slow queries: 0  Opens: 33  Open tables: 26  Queries per second avg: 0.144
Create the initial tables:

sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
Refer to the create_demo_table.sql file for details about the table and its fields.

Check to make sure the tables were created correctly

mysql -u root -p -e 'show databases;'
Enter password:
+--------------------+
| Database           |
+--------------------+
| cs208demo          |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
Node.js Setup
To get debugging, run the command below in a debug terminal instead of a regular terminal.

Run the following commands to set up the project:

npm install
npm start
Troubleshooting
Database User and Password
If you are having issues connecting to the database, ensure that you have set the correct user and password in the db.js file. If you have set up a different user and password, you will need to update the' db.js' file accordingly. If you have used all the setup scripts out of the box you should not have to change anything.

Make sure the Database is installed and Running
If you encounter issues with the database, you can check the status of the MariaDB service using the command below. If the service is not running, you can start it with sudo service mariadb start. If the mariadb service is not installed, you can run the install_db.sh script again to reinstall it.

@shanep ➜ /workspaces/CS208-full-stack (master) $ sudo service mariadb status
 * /usr/bin/mariadb-admin  Ver 10.0 Distrib 10.11.13-MariaDB, for debian-linux-gnu on x86_64
Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Server version          10.11.13-MariaDB-0ubuntu0.24.04.1
Protocol version        10
Connection              Localhost via UNIX socket
UNIX socket             /run/mysqld/mysqld.sock
Uptime:                 10 min 23 sec

Threads: 1  Questions: 90  Slow queries: 0  Opens: 33  Open tables: 26  Queries per second avg: 0.144
Check that the demo database is created
You can check if the demo database is created by running the following command in the MariaDB shell if you don't see a cs208demo database listed in the output of the command below, you can run the create_demo_table.sql script to create it.

@shanep ➜ /workspaces/CS208-full-stack (master) $ mysql -u root -p -e 'show databases;'
Enter password:
+--------------------+
| Database           |
+--------------------+
| cs208demo          |
| demo               |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
HELP! I have tried everything and it still doesn't work!
If you have tried everything and it still doesn't work you may have accidentally changed something. It is very difficult to troubleshoot issues without knowing what you have changed. The only option is to delete your Codespace and create a new one. This will reset everything to the original state. You can do this by clicking on the "Delete Codespace" button in the Codespaces dashboard.

Follow these steps to delete your Codespace:

Make sure you have committed all your changes and pushed them to GitHub.
Go to the Codespaces dashboard. Delete Codespace
Find your Codespace in the list and click on the "Delete" button next to it.
Confirm the deletion.
Create a new Codespace from the same repository and try again!


## Design Decisions

1. Page Layout and Design
    - Colored header and page colors / text font fit the given brand specifications. This includes the given dark green as the main color focus, with the seasalt as the page background, and the saffron accent at the bottom of the header. Dark green is also used for the button outlines.
    - meta() in layout.pug and CSS @media specifications allow for things like the header, logos, and the menu page to scale according to the device, making it mobile-user friendly. (I do not own a tablet, so I can't specifically test that)
    - Rounded corners on all edges, as well as a drop shadow behind the ordering logos allow for a more modern and comforting look.
    - All logos including the Downtown Donuts and the delivery services count as valid links. The Downtown Donuts logo in the header leads to the home page, while the delivery service logos lead to their respective websites.

2. Client and server validation for comments
    - Validation is implemented both in browser JavaScript and in the Express `/submit-comment` endpoint. This ensures users get immediate feedback while keeping the backend safe from invalid or empty submissions.
    - The client-side checks prevent whitespace-only comments and enforce the 500-character limit, while the server revalidates on submit for security.

3. Incremental comment loading and UI feedback
    - The comment list uses the `/comments` AJAX endpoint with `limit` and `offset` pagination, which keeps the page fast and avoids loading too many comments at once.
    - The UI also handles user-friendly error messaging for network issues, failed loads, and double submission attempts.

## Edge Cases

- Server/API unreachable
    - Comment submission now uses `fetch()` and catches network errors. If the server cannot be reached, the UI shows a friendly alert and preserves the submit button so the user can retry.
- Whitespace-only comments
    - The comment form validates input with `trim()` before submit and shows an drop down alert if the comment is empty or only whitespace.
- Too-long input
    - The textarea is limited with `maxlength="500"` and the client script trims excess characters automatically. The live character counter updates as the user types. This limit is also hard-capped in the SQL, using `body VARCHAR(500) NOT NULL`. 
- Rapid double-clicks
    - Once the form is submitted, the submit button is disabled and a flag prevents duplicate submissions until the request completes.

## Challenges & Learnings

1. Artificial Intelligence - Copilot Use
    - As this class allows its use, I wanted to practice using Copilot to help my coding process. This led to some problems though as it would occassionally make stuff up, or do things in a very roundabout way, that I would then fix. When I asked it to explain and write some code for the edge-case handling, it completely broke all comment functionality. Luckily, I committed my prior changes right before so I could easily revert back to that point.

2. Comment Section
    - As this was much more SQL than we did in the class, it was difficult but nice to learn. I had many problems with this like accidentally deleting all comments from the command-line, or trying 20 different ways to format the timestamp.
    - As Copilot didn't help much with the actual code on the double submitting comments edge-case, I just started it as my best guess to handle that, then had it fix some errors. 

3. Page Transfer
    - Since we didn't move pages much prior in this class, and it wasn't really mentioned extensively in the Zybooks, I didn't know how to do it at all. I first looked at the given code, and wrote the router.get functions to work how I thought it would.
    - I also talked to the TA and she gave me some more specifics about how to move pages.

## Citations

1. Copilot
    - It helped a lot with the CSS and JavaScript, as it was difficult to remember the specific syntax in both languages. I mostly tried to write the JavaScript myself, then if that didn't work I would then have it correct it.

2. W3Schools - SQL - https://www.w3schools.com/sql
    - I used this to dive deeper in the SQL use and to refresh myself.


