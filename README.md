## List of commands that got my Ubunutu 18.04 server (DigitalOcean Droplet) prepared for running this code:

1. first, go into the **access console** [(click 'launch console')](https://www.digitalocean.com/docs/images/droplets/pages/access.949745c3cdd9acee5832e28ac3e3ced353e92199d4a0375cf7a380c09aacbdde.png) of your DigitalOcean droplet and run the command <code>sudo apt update</code>
2. install mySQL onto the droplet if you haven't already: <code>sudo mysql_secure_installation</code>
3. press y and hit enter a couple times and accept all the default settings.
4. run this command: <code>mysqld --initialize</code> and if you get an error, just ignore it and move on to step 5..
5. now that mySQL is installed, let's enter it by running: <code>sudo mysql</code>
6. You'll notice that all of your commands from now on will be prefixed by <code>mysql></code>
7. Run this command, but change the word **yoursecretpassword123** to your own new password (**trust me**: make your password longer than 8 characters, and contain at least one number, one special character, and one uppercase letter. It will prevent mySQL errors for you in the future): <code>ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yoursecretpassword123';</code>
8. Then run this command: <code>FLUSH PRIVILEGES;</code>
9. Now exit mySQL by running this command: <code>exit;</code>
10. Now log back into mySQL using a new command: <code>mysql -u root -p</code> (you will have to always use this command from now on)
11. Now enter the password you set in step 7 and hit enter.
12. You're back into your database as the root user. Now you just have to create a new user to access the database from your Node.js projects...
13. Run this command, but replace with your own name and password (**again**: password should be longer than 8 characters, and include at least one special character, one number, and one uppercase letter): <code>CREATE USER 'yourname'@'%' IDENTIFIED BY 'yourpassword';</code>
14. Then run this command, using the same credentials you just created: <code>GRANT ALL PRIVILEGES ON \*.\* TO 'yourname'@'%' IDENTIFIED BY 'yourpassword';</code>
15. Note that if you want to limit the user's access to a certain database, or a certain database and table, the command would be <code>GRANT ALL PRIVILEGES ON thekrustykrab.* TO 'yourname'@'%' IDENTIFIED BY 'yourpassword';</code> or <code>GRANT ALL PRIVILEGES ON thekrustykrab.recipes TO 'yourname'@'%' IDENTIFIED BY 'yourpassword';</code>, respectively. To anyone new to using the SQL language, an asterisk pretty much means "all."
16. That's it! Now just run the command <code>exit;</code> and you're good to go!

Remember, you won't have any of your own databases/tables unless you now create them! A greate guide for making an example database can be found [here](https://dev.mysql.com/doc/refman/8.0/en/creating-database.html). Go into your access console again and enter your mySQL database (using command in line 10) to get started on running the queries :)

## An example of what an actual remote MySQL connection might look like, without using environment variables:

(assumes a database name of <code>sunshine_bakery</code> and a table in that database named <code>receipts</code>)

<pre><code>
const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: "198.242.71.14",
  user: "jeff",
  password: "yoursecretpassword123",
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
  console.log('server running on port 5000');

});
</code></pre>

For dependencies: **npm install express mysql dotenv**

A big thanks to [@Kelgand](https://github.com/kelgand) for helping me along the way.
