select exercise_id, activity, distance, duration, summary from exercises e
where user_id = $1;