export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      urls: {
        Row: {
          id: string
          user_id: string
          url: string
          name: string | null
          description: string | null
          interval_minutes: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          url: string
          name?: string | null
          description?: string | null
          interval_minutes?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          url?: string
          name?: string | null
          description?: string | null
          interval_minutes?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      url_checks: {
        Row: {
          id: string
          url_id: string
          status_code: number | null
          response_time_ms: number | null
          is_success: boolean
          error_message: string | null
          checked_at: string
        }
        Insert: {
          id?: string
          url_id: string
          status_code?: number | null
          response_time_ms?: number | null
          is_success?: boolean
          error_message?: string | null
          checked_at?: string
        }
        Update: {
          id?: string
          url_id?: string
          status_code?: number | null
          response_time_ms?: number | null
          is_success?: boolean
          error_message?: string | null
          checked_at?: string
        }
      }
      cron_jobs: {
        Row: {
          id: string
          url_id: string
          next_run_at: string | null
          last_run_at: string | null
          is_running: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          url_id: string
          next_run_at?: string | null
          last_run_at?: string | null
          is_running?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          url_id?: string
          next_run_at?: string | null
          last_run_at?: string | null
          is_running?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row']
export type URL = Database['public']['Tables']['urls']['Row']
export type URLCheck = Database['public']['Tables']['url_checks']['Row']
export type CronJob = Database['public']['Tables']['cron_jobs']['Row']

export type InsertUser = Database['public']['Tables']['users']['Insert']
export type InsertURL = Database['public']['Tables']['urls']['Insert']
export type InsertURLCheck = Database['public']['Tables']['url_checks']['Insert']
export type InsertCronJob = Database['public']['Tables']['cron_jobs']['Insert']

export type UpdateUser = Database['public']['Tables']['users']['Update']
export type UpdateURL = Database['public']['Tables']['urls']['Update']
export type UpdateURLCheck = Database['public']['Tables']['url_checks']['Update']
export type UpdateCronJob = Database['public']['Tables']['cron_jobs']['Update']