CREATE POLICY "all can see" ON "public"."post_contents"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "authors can create" ON "public"."post_contents"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "all can see" ON "public"."post_score"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "all can see" ON "public"."post_votes"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "owners can insert" ON "public"."post_votes"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "owners can update" ON "public"."post_votes"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "all can see" ON "public"."posts"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "owners can insert" ON "public"."posts"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);