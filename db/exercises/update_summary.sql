update exercises
set summary = $1
where exercise_id = $2;

select user_id, activity, duration, distance from exercises
where exercise_id = $2;