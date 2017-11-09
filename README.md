# riddle-project

A fun riddle based trivia game.  Users are given a riddle at random that is of the same level as the users level.  Once enough riddles at a level are answered, the user levels up and obtains harder riddles.  A user never sees a riddle they have gotten correct a second time.  

## Features:
* Individual user experience
* Statistics on how many times a user correctly or incorrectly guessed every riddle
* Leaderboard that highlights the user and their rank among all other users.  Rank based on amount of coins and level.

## Technologies implemented include:
* Node and Express
* Express Handlebars
* AES-js Advanced Encryption Standard used for user password encryption in database storage
* Validator npm used for double validation in front end and backend registration and login.
* mysql npm for database implementation.  


## Database Structure
The MySQL Database is called game.  It includes three tables.
### game.users - Table which holds user information

id | name | email | password | token | level | coins 
------------ | ------------- |------------ | ------------- | ------------ | ------------- | -------------
int(50) AI PK | varchar(255) | varchar(255) | varchar(255) | varchar(255 | int(50) | int(50)

### game.riddles - Table which holds riddle information

id | text | answer | level | correct | wrong 
------------ | ------------- |------------ | ------------- | ------------ | -------------
int(50) AI PK | varchar(1255) | varchar(255) | int(50)  | int(50) | int(50)

### game.riddles_correct - Table which contains the riddles any user has gotten correct

user | riddle 
------------ | -------------
int(50) | int(50)

## Try your luck at riddles!
http://riddlegame.herokuapp.com/
