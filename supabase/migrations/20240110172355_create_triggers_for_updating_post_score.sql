create function initialize_post_score()
returns trigger
language plpgsql
security definer
set search_path = public
as $initialize_post_score$
begin
    insert into post_score (post_id, score)
    values (new.id, 0);
    return new;
end;$initialize_post_score$;

create trigger initialize_post_score
    after insert
    on posts
    for each row execute procedure initialize_post_score();

create function update_post_score()
returns trigger
language plpgsql
security definer
set search_path = public
as $update_post_score$
begin
update post_score
        set score = (
            select sum(case when vote_type = 'up' then 1 else -1 end)
            from post_votes
            where post_id = new.post_id
        )
        where post_id = new.post_id;
        return new;
end;$update_post_score$;

create trigger update_post_score
    after insert or update
    on post_votes
    for each row execute procedure update_post_score();