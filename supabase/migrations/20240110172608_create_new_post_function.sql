create function create_new_post("userId" uuid, "title" text, "content" text)
returns boolean
language plpgsql
as $$
begin
  with
    "inserted_post" as (
      insert into "posts" ("user_id", "path")
      values ($1, 'root')
      returning "id"
    )
  insert into "post_contents" ("post_id", "title", "content", "user_id")
  values ((select "id" from "inserted_post"), $2, $3, $1);
  return true;
end; $$;
