## List of commands that got my Ubunutu 18.04 server (DigitalOcean) prepared for running this code:

1. first, go into the **access console** of your DigitalOcean droplet and run the command **sudo apt update**
2. install mySQL onto the droplet if you haven't already: **sudo mysql_secure_installation**
3. press y and hit enter and accept all the default settings.
4. run this command: **mysqld --initialize** and if you get an error, just ignore it and move on to step 5
5. now that mySQL is installed, let's enter it by running: **sudo mysql**
6. You'll notice that all of your commands from now on will be prefixed by **mysql>**
7. Run this command, but change the word **yoursecretpassword123** to your own new password: **ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yoursecretpassword123';**
8. Then run this command: **FLUSH PRIVILEGES;**
9. Now exit mySQL by running this command: **exit**
10. Now log back into mySQL using a new command: **mysql -u root -p** (you will have to always use this command from now on)
11. Now enter the password you set in step 7 and hit enter.
12. You're back into your database as the root user. Now you just have to create a new user to access the database from your Node.js projects...
13. Run this command, but replace with your own name and password: **CREATE USER 'yourname'@'%' IDENTIFIED BY 'yourpassword';**
14. Then run this command, using the same credentials you just created: **GRANT ALL PRIVILEGES ON *.* TO 'yourname'@'%' IDENTIFIED BY 'yourpassword'**
15. Note that if you want to limit the user's access to a certain database, or a certain database and table, the command would be **GRANT ALL PRIVILEGES ON thekrustykrab.*** **TO 'yourname'@'%' IDENTIFIED BY 'yourpassword'** or **GRANT ALL PRIVILEGES ON thekrustykrab.recipes TO 'yourname'@'%' IDENTIFIED BY 'yourpassword'**, respectively. To anyone new to using the SQL language, an asterisk pretty much means "all."
16. That's it! Now just run the command **exit** and you're good to go!

Remember, you won't have any of your own databases/tables unless you now create them! A greate guide for making an example database can be found [here](https://dev.mysql.com/doc/refman/8.0/en/creating-database.html). Go into your access console again and enter your mySQL database (using command in line 10) to get started on running the queries :)

## An example of what an actual MySQL connection might look like, without using environment variables:

<code>const express = require('express');

const app = express();


const mysql = require('mysql');

const connection = mysql.createConnection({

  host: "198.242.71.14",

  user: "jeff",

  password: "oregonDucks1458",

  database: "sunshine_bakery"

});


connection.connect();


connection.query('SELECT * FROM receipts', function(error, results, fields) {

  if (error) {

    console.log(error);

  }

  console.log(results);

});


connection.end();


app.listen(5000, () => {

  console.log('serving running on port 5000');

});
</code>




