-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table (Stores Identity & Destiny Fingerprint)
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  wallet_address text unique, -- Nullable for now (Web2 users), Unique for Web3 users
  birth_date timestamp with time zone,
  birth_time time,
  birth_city text,
  
  -- Calculated Data (The "Hard" Data)
  saju_ilgan text, -- Day Master (e.g., "Gap", "Eul")
  saju_elements jsonb, -- { fire: 20, water: 10 ... }
  astrology_sun_sign text,
  astrology_moon_sign text,
  destiny_fingerprint jsonb, -- Condensed energetic signature
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Chat Logs (The "Memory")
create table public.chat_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id), -- Nullable for anonymous guests
  session_id uuid, -- For tracking guest sessions
  
  user_message text not null,
  ai_response jsonb not null, -- Stores the structured 3-step response
  
  -- Context Snapshot (What energetic state produced this?)
  context_snapshot jsonb, 
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Basic)
alter table public.users enable row level security;
alter table public.chat_logs enable row level security;

create policy "Allow public read/insert for demo" on public.users for a
ll using (true) with check (true);
create policy "Allow public read/insert for demo" on public.chat_logs for all using (true) with check (true);
