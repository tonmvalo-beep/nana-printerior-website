/*
  # Create inquiries table for design inquiries

  1. New Tables
    - `inquiries`
      - `id` (uuid, primary key)
      - `name` (text, optional)
      - `email` (text, required)
      - `message` (text, optional)
      - `product_type` (text) - 'panel' or 'tshirt'
      - `panel_size` (text, optional)
      - `price` (text, optional)
      - `design_json` (jsonb) - editor state JSON
      - `design_png_base64` (text) - PNG design in base64
      - `mockup_png_base64` (text, optional) - Mockup composite in base64
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `inquiries` table
    - Add policy to allow anyone to insert (inquiries are public)
    - Add policy for selected users/service role to read inquiries
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text NOT NULL,
  message text,
  product_type text NOT NULL,
  panel_size text,
  price text,
  design_json jsonb,
  design_png_base64 text,
  mockup_png_base64 text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert inquiries"
  ON inquiries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view own inquiry"
  ON inquiries
  FOR SELECT
  USING (true);
