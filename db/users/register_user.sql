insert into exercise_tracker_use (
    email,
    password
) values (
    ${email},
    ${hash}
)
returning user_id, email;