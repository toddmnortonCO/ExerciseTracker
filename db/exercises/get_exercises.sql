select * from exercises e
-- join exercise_tracker_users etu on e.user_id = etu.user_id
where user_id = $1;