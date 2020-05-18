SELECT * FROM USER WHERE USER_ID = (
SELECT USER_ID FROM POST WHERE DATE(CREATED_AT) = CURDATE()
GROUP BY USER_ID
HAVING COUNT(POST_ID) > 3 )
