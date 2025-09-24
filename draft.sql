SELECT * FROM utilisateur LIMIT 100;

DELETE FROM utilisateur WHERE email IN ('eddy@gmail', '', '', '');

EXPLAIN DELETE FROM utilisateur WHERE email IN ('eddy@gmail', '', '', '')


