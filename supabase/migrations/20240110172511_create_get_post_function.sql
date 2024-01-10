create function get_single_post_with_comments(post_id uuid)
returns table (
    id uuid,
    author_name text,
    created_at timestamp with time zone,
    title text,
    content text,
    score int,
    path ltree
)
language plpgsql
as $$
begin
    return query
    select
      posts.id,
      user_profiles.username,
      posts.created_at,
      post_contents.title,
      post_contents.content,
      post_score.score,
      posts.path
    from posts
    join post_contents on posts.id = post_contents.post_id
    join post_score on posts.id = post_score.post_id
    join user_profiles on posts.user_id = user_profiles.user_id
    where
      posts.path <@ text2ltree(concat('root.', replace(concat($1, ''), '-', '_')))
    or
      posts.id = $1;
end;$$;