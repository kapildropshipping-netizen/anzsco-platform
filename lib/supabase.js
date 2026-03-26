import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wftsvhlekfstxlzwifio.supabase.co'
const supabaseKey = 'sb_publishable_4tLHjOsshI1m2SSek35_bQ_H0ae8tIp'

export const supabase = createClient(supabaseUrl, supabaseKey)
