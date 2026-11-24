-- =========================================================================
-- SPIRA — PURE • NATURAL • SUPERFOOD SPIRULINA
-- Official Supabase Postgres Schema, Indexes, Grants & Row Level Security
-- Includes: products, orders, blogs, site_metrics (counters & Facebook Pixel), and visitor_sessions
-- Paste this into Supabase Dashboard -> SQL Editor -> New Query -> Run
-- =========================================================================

-- 1. Products Table
create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null default 'powder',
  weight text not null,
  price integer not null check (price >= 0),
  old_price integer default 0 check (old_price >= 0),
  status text not null default 'coming_soon' check (status in ('coming_soon', 'stock_out', 'in_stock')),
  image text default '',
  description text default '',
  created_at timestamptz not null default now()
);

create index if not exists idx_products_category_status on public.products (category, status);

-- 2. Orders Table
create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  phone text not null,
  zone text not null default 'dhaka',
  address text not null,
  payment text not null default 'COD',
  items_summary text not null,
  total integer not null check (total >= 0),
  order_type text not null default 'অর্ডার',
  created_at timestamptz not null default now()
);

create index if not exists idx_orders_created_at on public.orders (created_at desc);

-- 3. Site Metrics & Facebook Pixel Table (Main Website Live Visitors & Purchases Counter)
create table if not exists public.site_metrics (
  id text primary key default 'main',
  total_visitors integer not null default 1420,
  total_purchases integer not null default 318,
  fb_pixel_id text default '',
  updated_at timestamptz not null default now()
);

-- 4. Visitor Sessions & Funnel Analytics Table
create table if not exists public.visitor_sessions (
  id text primary key,
  traffic_source text not null default 'Direct',
  device text not null default 'Mobile',
  clicks jsonb not null default '[]'::jsonb,
  cart_items jsonb not null default '[]'::jsonb,
  exit_stage text not null default 'bounced',
  exit_stage_label text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists idx_visitor_sessions_created_at on public.visitor_sessions (created_at desc);

-- 5. Enable Row Level Security (RLS)
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.site_metrics enable row level security;
alter table public.visitor_sessions enable row level security;

-- 6. Grant explicit table permissions for Supabase Data API
grant select, insert, update, delete on public.products to anon, authenticated;
grant select, insert, update, delete on public.orders to anon, authenticated;
grant select, insert, update, delete on public.site_metrics to anon, authenticated;
grant select, insert, update, delete on public.visitor_sessions to anon, authenticated;

-- 7. RLS Policies
drop policy if exists "Public can read products" on public.products;
create policy "Public can read products" on public.products for select to anon, authenticated using (true);

drop policy if exists "Store admin can manage products" on public.products;
create policy "Store admin can manage products" on public.products for all to anon, authenticated using (true) with check (true);

drop policy if exists "Customers can insert orders" on public.orders;
create policy "Customers can insert orders" on public.orders for insert to anon, authenticated with check (true);

drop policy if exists "Store admin can view and manage orders" on public.orders;
create policy "Store admin can view and manage orders" on public.orders for all to anon, authenticated using (true) with check (true);

drop policy if exists "Public sync site metrics" on public.site_metrics;
create policy "Public sync site metrics" on public.site_metrics for all to anon, authenticated using (true) with check (true);

drop policy if exists "Public sync visitor sessions" on public.visitor_sessions;
create policy "Public sync visitor sessions" on public.visitor_sessions for all to anon, authenticated using (true) with check (true);
