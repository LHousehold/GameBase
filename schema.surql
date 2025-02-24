
DEFINE ACCESS OVERWRITE player ON DATABASE TYPE RECORD
	-- SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
	SIGNIN ( SELECT * FROM player WHERE record::id() = $playerId AND playerSecret = $playerSecret)
	DURATION FOR TOKEN 1h, FOR SESSION 12h
;