create table post_score (
    post_id uuid primary key references posts (id) not null,
    score int not null
);