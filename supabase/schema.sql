-- Create a table for storing Sense Your Day results
create table results (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_profile jsonb not null, -- Stores name, birth info, feeling
  analysis_result jsonb not null, -- Stores the AI generation result
  share_id text unique default encode(gen_random_bytes(6), 'base64') -- Short ID for sharing (optional)
);

-- Set up Row Level Security (RLS)
-- For MVP, we allow anonymous inserts and reads (since we want public sharing)
alter table results enable row level security;

create policy "Enable insert for everyone" on results
  for insert with check (true);

create policy "Enable read for everyone" on results
  for select using (true);
