create function create_new_comment(user_id uuid, content text, path ltree)
returns boolean
language plpgsql
as $$
begin
  with
    inserted_post as (
      insert into posts (user_id, path)
      values ($1, $3)
      returning id
    )
  insert into post_contents (post_id, title, content, user_id)
  values ((select id from inserted_post), '', $2, $1);
  return true;
end; $$;
