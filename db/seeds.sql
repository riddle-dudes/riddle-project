INSERT INTO riddles(text, answer, level) VALUES
("Test Riddle. Answer is dog. Level 1", "dog", 1),
("Test Riddle. Answer is cat. Level 2", "cat", 2),
("Test Riddle. Answer is mouse. Level 3", "mouse", 3),
("Test Riddle. Answer is lard. Level 1", "lard", 1),
("Test Riddle. Answer is magic. Level 2", "magic", 2),
("Test Riddle. Answer is light. Level 3", "light", 3),
("Test Riddle. Answer is keyboard. Level 1", "keyboard", 1),
("Test Riddle. Answer is star. Level 2", "star", 2),
("Test Riddle. Answer is hair. Level 3", "hair", 3);

INSERT INTO users (name, email, password, token, level, coins) VALUES
("me", "asdf@yahopo.cp", "password", "asdfkjhao", 1, 500 );

select * from riddles;
