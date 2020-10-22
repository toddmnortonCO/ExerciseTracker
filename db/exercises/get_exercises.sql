select e.exercise_id from exercises e
join exercise_tracker_user etu on e.user_id = etu.user_id
where etu.user_id = $1;