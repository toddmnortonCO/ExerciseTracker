create table if not exists exercise_tracker_users (
    user_id serial primary key,
    email varchar(100) NOT NULL,
    password varchar(50) NOT NULL,
);

create table if not exists exercises (
    exercise_id serial primary key not null,
    user_id int references exercise_tracker_users(user_id),
    activity varchar(100),
    duration INTEGER,
    distance INTEGER,
    summary VARCHAR(255)
);

create table if not exists exercise_comments (
    comment_id serial primary key,
    exercise_id int references exercises(exercise_id),
    comments varchar(500) 
);

select user_id, activity, comment_id
from exercises ex
inner join exercise_comments ec on ex.exercise_id = ec.exercise_id;