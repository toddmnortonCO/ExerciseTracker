insert into exercise_tracker_users (
    email,
    password
) values (
    ${email},
    ${hash}
)
returning user_id, email;