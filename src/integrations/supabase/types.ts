export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      medicbipo: {
        Row: {
          "2018/Ago": string | null
          "2018/Dez": string | null
          "2018/Jul": string | null
          "2018/Jun": string | null
          "2018/Nov": string | null
          "2018/Out": string | null
          "2018/Set": string | null
          "2019/Abr": string | null
          "2019/Ago": string | null
          "2019/Dez": number | null
          "2019/Fev": string | null
          "2019/Jan": string | null
          "2019/Jul": string | null
          "2019/Jun": string | null
          "2019/Mai": string | null
          "2019/Mar": string | null
          "2019/Nov": number | null
          "2019/Out": number | null
          "2019/Set": string | null
          "2020/Abr": number | null
          "2020/Ago": number | null
          "2020/Dez": number | null
          "2020/Fev": number | null
          "2020/Jan": number | null
          "2020/Jul": number | null
          "2020/Jun": number | null
          "2020/Mai": number | null
          "2020/Mar": number | null
          "2020/Nov": number | null
          "2020/Out": number | null
          "2020/Set": number | null
          "2021/Abr": number | null
          "2021/Ago": number | null
          "2021/Dez": number | null
          "2021/Fev": number | null
          "2021/Jan": number | null
          "2021/Jul": number | null
          "2021/Jun": number | null
          "2021/Mai": number | null
          "2021/Mar": number | null
          "2021/Nov": number | null
          "2021/Out": number | null
          "2021/Set": number | null
          "2022/Abr": number | null
          "2022/Ago": number | null
          "2022/Dez": number | null
          "2022/Fev": number | null
          "2022/Jan": number | null
          "2022/Jul": number | null
          "2022/Jun": number | null
          "2022/Mai": number | null
          "2022/Mar": number | null
          "2022/Nov": number | null
          "2022/Out": number | null
          "2022/Set": number | null
          "2023/Abr": number | null
          "2023/Ago": number | null
          "2023/Dez": number | null
          "2023/Fev": number | null
          "2023/Jan": number | null
          "2023/Jul": number | null
          "2023/Jun": number | null
          "2023/Mai": number | null
          "2023/Mar": number | null
          "2023/Nov": number | null
          "2023/Out": number | null
          "2023/Set": number | null
          "2024/Abr": number | null
          "2024/Ago": number | null
          "2024/Dez": number | null
          "2024/Fev": number | null
          "2024/Jan": number | null
          "2024/Jul": number | null
          "2024/Jun": number | null
          "2024/Mai": number | null
          "2024/Mar": number | null
          "2024/Nov": number | null
          "2024/Out": number | null
          "2024/Set": number | null
          "2025/Abr": number | null
          "2025/Fev": number | null
          "2025/Jan": number | null
          "2025/Jun": number | null
          "2025/Mai": number | null
          "2025/Mar": number | null
          PROCEDIMENTO: string | null
        }
        Insert: {
          "2018/Ago"?: string | null
          "2018/Dez"?: string | null
          "2018/Jul"?: string | null
          "2018/Jun"?: string | null
          "2018/Nov"?: string | null
          "2018/Out"?: string | null
          "2018/Set"?: string | null
          "2019/Abr"?: string | null
          "2019/Ago"?: string | null
          "2019/Dez"?: number | null
          "2019/Fev"?: string | null
          "2019/Jan"?: string | null
          "2019/Jul"?: string | null
          "2019/Jun"?: string | null
          "2019/Mai"?: string | null
          "2019/Mar"?: string | null
          "2019/Nov"?: number | null
          "2019/Out"?: number | null
          "2019/Set"?: string | null
          "2020/Abr"?: number | null
          "2020/Ago"?: number | null
          "2020/Dez"?: number | null
          "2020/Fev"?: number | null
          "2020/Jan"?: number | null
          "2020/Jul"?: number | null
          "2020/Jun"?: number | null
          "2020/Mai"?: number | null
          "2020/Mar"?: number | null
          "2020/Nov"?: number | null
          "2020/Out"?: number | null
          "2020/Set"?: number | null
          "2021/Abr"?: number | null
          "2021/Ago"?: number | null
          "2021/Dez"?: number | null
          "2021/Fev"?: number | null
          "2021/Jan"?: number | null
          "2021/Jul"?: number | null
          "2021/Jun"?: number | null
          "2021/Mai"?: number | null
          "2021/Mar"?: number | null
          "2021/Nov"?: number | null
          "2021/Out"?: number | null
          "2021/Set"?: number | null
          "2022/Abr"?: number | null
          "2022/Ago"?: number | null
          "2022/Dez"?: number | null
          "2022/Fev"?: number | null
          "2022/Jan"?: number | null
          "2022/Jul"?: number | null
          "2022/Jun"?: number | null
          "2022/Mai"?: number | null
          "2022/Mar"?: number | null
          "2022/Nov"?: number | null
          "2022/Out"?: number | null
          "2022/Set"?: number | null
          "2023/Abr"?: number | null
          "2023/Ago"?: number | null
          "2023/Dez"?: number | null
          "2023/Fev"?: number | null
          "2023/Jan"?: number | null
          "2023/Jul"?: number | null
          "2023/Jun"?: number | null
          "2023/Mai"?: number | null
          "2023/Mar"?: number | null
          "2023/Nov"?: number | null
          "2023/Out"?: number | null
          "2023/Set"?: number | null
          "2024/Abr"?: number | null
          "2024/Ago"?: number | null
          "2024/Dez"?: number | null
          "2024/Fev"?: number | null
          "2024/Jan"?: number | null
          "2024/Jul"?: number | null
          "2024/Jun"?: number | null
          "2024/Mai"?: number | null
          "2024/Mar"?: number | null
          "2024/Nov"?: number | null
          "2024/Out"?: number | null
          "2024/Set"?: number | null
          "2025/Abr"?: number | null
          "2025/Fev"?: number | null
          "2025/Jan"?: number | null
          "2025/Jun"?: number | null
          "2025/Mai"?: number | null
          "2025/Mar"?: number | null
          PROCEDIMENTO?: string | null
        }
        Update: {
          "2018/Ago"?: string | null
          "2018/Dez"?: string | null
          "2018/Jul"?: string | null
          "2018/Jun"?: string | null
          "2018/Nov"?: string | null
          "2018/Out"?: string | null
          "2018/Set"?: string | null
          "2019/Abr"?: string | null
          "2019/Ago"?: string | null
          "2019/Dez"?: number | null
          "2019/Fev"?: string | null
          "2019/Jan"?: string | null
          "2019/Jul"?: string | null
          "2019/Jun"?: string | null
          "2019/Mai"?: string | null
          "2019/Mar"?: string | null
          "2019/Nov"?: number | null
          "2019/Out"?: number | null
          "2019/Set"?: string | null
          "2020/Abr"?: number | null
          "2020/Ago"?: number | null
          "2020/Dez"?: number | null
          "2020/Fev"?: number | null
          "2020/Jan"?: number | null
          "2020/Jul"?: number | null
          "2020/Jun"?: number | null
          "2020/Mai"?: number | null
          "2020/Mar"?: number | null
          "2020/Nov"?: number | null
          "2020/Out"?: number | null
          "2020/Set"?: number | null
          "2021/Abr"?: number | null
          "2021/Ago"?: number | null
          "2021/Dez"?: number | null
          "2021/Fev"?: number | null
          "2021/Jan"?: number | null
          "2021/Jul"?: number | null
          "2021/Jun"?: number | null
          "2021/Mai"?: number | null
          "2021/Mar"?: number | null
          "2021/Nov"?: number | null
          "2021/Out"?: number | null
          "2021/Set"?: number | null
          "2022/Abr"?: number | null
          "2022/Ago"?: number | null
          "2022/Dez"?: number | null
          "2022/Fev"?: number | null
          "2022/Jan"?: number | null
          "2022/Jul"?: number | null
          "2022/Jun"?: number | null
          "2022/Mai"?: number | null
          "2022/Mar"?: number | null
          "2022/Nov"?: number | null
          "2022/Out"?: number | null
          "2022/Set"?: number | null
          "2023/Abr"?: number | null
          "2023/Ago"?: number | null
          "2023/Dez"?: number | null
          "2023/Fev"?: number | null
          "2023/Jan"?: number | null
          "2023/Jul"?: number | null
          "2023/Jun"?: number | null
          "2023/Mai"?: number | null
          "2023/Mar"?: number | null
          "2023/Nov"?: number | null
          "2023/Out"?: number | null
          "2023/Set"?: number | null
          "2024/Abr"?: number | null
          "2024/Ago"?: number | null
          "2024/Dez"?: number | null
          "2024/Fev"?: number | null
          "2024/Jan"?: number | null
          "2024/Jul"?: number | null
          "2024/Jun"?: number | null
          "2024/Mai"?: number | null
          "2024/Mar"?: number | null
          "2024/Nov"?: number | null
          "2024/Out"?: number | null
          "2024/Set"?: number | null
          "2025/Abr"?: number | null
          "2025/Fev"?: number | null
          "2025/Jan"?: number | null
          "2025/Jun"?: number | null
          "2025/Mai"?: number | null
          "2025/Mar"?: number | null
          PROCEDIMENTO?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
