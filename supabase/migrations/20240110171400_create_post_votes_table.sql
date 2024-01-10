create table post_votes (
    id uuid primary key default uuid_generate_v4() not null,
    post_id uuid references posts (id) not null,
    user_id uuid references auth.users (id) not null,
    vote_type text not null,
    unique (post_id, user_id)
);