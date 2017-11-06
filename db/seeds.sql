INSERT INTO riddles(text, answer, level, correct, wrong) VALUES
("Test Riddle. Answer is dog. Level 1", "dog", 1, 0, 0),
("Test Riddle. Answer is cat. Level 2", "cat", 2, 0, 0),
("Test Riddle. Answer is mouse. Level 3", "mouse", 3, 0, 0),
("Test Riddle. Answer is lard. Level 1", "lard", 1, 0, 0),
("Test Riddle. Answer is magic. Level 2", "magic", 2, 0, 0),
("Test Riddle. Answer is light. Level 3", "light", 3, 0, 0),
("Test Riddle. Answer is keyboard. Level 1", "keyboard", 1, 0, 0),
("Test Riddle. Answer is star. Level 2", "star", 2, 0, 0),
("Test Riddle. Answer is hair. Level 3", "hair", 3, 0, 0);

INSERT INTO users(name, email, password, level, coins) VALUES
("Jack", "a", "a", 3, 800),
("Randy", "a", "a", 2, 780),
("Louie", "a", "a", 2, 560),
("Jacky", "a", "a", 2, 660),
("Candle", "a", "a", 2, 430),
("Plant", "a", "a", 1, 100),
("Lamp", "a", "a", 1, 120),
("Folder", "a", "a", 1, 140),
("Mouse", "a", "a", 1, 140),
("Card", "a", "a", 1, 190),
("Flag", "a", "a", 1, 100);

select coins from users where id in (1,5);

update users set coins = CASE id 
	WHEN (select attacker from attack) 
		THEN (select coins from users where id = (select attacker from attack))+(select coins/2 from users where id = (select defender from attack)) 
    WHEN (select defender from attack) 
		THEN (select coins/2 from users where id = (select defender from attack)) 
	END 
    WHERE id in ((select attacker from attack),(select defender from attack));

update game.users set coins = case id 
	when (select attacker from game.attack) 
		then 100+500 
	when (select defender from game.attack)  
		then (select coins/2 from game.users where id = (select defender from game.attack)) end where id in ((select attacker from game.attack),(select defender from game.attack)); 

select * from users;






update users set coins = CASE id WHEN (select attacker from attack) THEN (select coins from users where id = (select attacker from attack)) WHEN (select defender from attack) THEN (select coins/2 from users where id = (select defender from attack)) END WHERE id in ((select attacker from attack),(select defender from attack));
