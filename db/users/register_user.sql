insert into exercise_tracker_use (
    email,
    password,
    age,
    city,
    state
) values (
    ${email},
    ${hash},
    ${age},
    ${city},
    ${state}
)
returning user_id, email;