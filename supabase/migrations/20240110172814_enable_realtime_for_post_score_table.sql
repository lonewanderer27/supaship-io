BEGIN;

DROP PUBLICATION IF EXISTS supabase_realtime CASCADE;

CREATE PUBLICATION supabase_realtime WITH ( publish = 'insert, update, delete' );

ALTER PUBLICATION supabase_realtime ADD TABLE post_score;

COMMIT;