
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zltjwlhtphadvxmwanal.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdGp3bGh0cGhhZHZ4bXdhbmFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzEzMjgsImV4cCI6MjAyNTQwNzMyOH0.Dt6CQBdQ7aNgtqf7GgQk9MhAJrDlno5s8jFdvBjk97U"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase