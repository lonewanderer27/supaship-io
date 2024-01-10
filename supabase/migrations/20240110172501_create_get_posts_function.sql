create function get_posts(page_number int)
returns table (
    id uuid,
    user_id uuid,
    created_at timestamp with time zone,
    title text,
    score int,
    username text
)
language plpgsql
as $$
begin
    return query
    select posts.id, posts.user_id, posts.created_at, post_contents.title, post_score.score, user_profiles.username
    from posts
    join post_contents on posts.id = post_contents.post_id
    join post_score on posts.id = post_score.post_id
    join user_profiles on posts.user_id = user_profiles.user_id
    where posts.path ~ 'root'
    order by post_score.score desc, posts.created_at desc
    limit 10
    offset (page_number - 1) * 10;
end;$$;