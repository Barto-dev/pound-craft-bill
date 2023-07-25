export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      client: {
        Row: {
          city: string | null;
          clientStatus: string | null;
          county: string | null;
          createdAt: string | null;
          email: string | null;
          id: string;
          name: string | null;
          postCode: string | null;
          street: string | null;
          userId: string;
        };
        Insert: {
          city?: string | null;
          clientStatus?: string | null;
          county?: string | null;
          createdAt?: string | null;
          email?: string | null;
          id?: string;
          name?: string | null;
          postCode?: string | null;
          street?: string | null;
          userId: string;
        };
        Update: {
          city?: string | null;
          clientStatus?: string | null;
          county?: string | null;
          createdAt?: string | null;
          email?: string | null;
          id?: string;
          name?: string | null;
          postCode?: string | null;
          street?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'client_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      invoice: {
        Row: {
          clientId: string | null;
          createdAt: string | null;
          discount: number | null;
          dueDate: string | null;
          id: string;
          invoiceNumber: string | null;
          invoiceStatus: string | null;
          issueDate: string | null;
          notes: string | null;
          subject: string | null;
          terms: string | null;
          userId: string;
        };
        Insert: {
          clientId?: string | null;
          createdAt?: string | null;
          discount?: number | null;
          dueDate?: string | null;
          id?: string;
          invoiceNumber?: string | null;
          invoiceStatus?: string | null;
          issueDate?: string | null;
          notes?: string | null;
          subject?: string | null;
          terms?: string | null;
          userId: string;
        };
        Update: {
          clientId?: string | null;
          createdAt?: string | null;
          discount?: number | null;
          dueDate?: string | null;
          id?: string;
          invoiceNumber?: string | null;
          invoiceStatus?: string | null;
          issueDate?: string | null;
          notes?: string | null;
          subject?: string | null;
          terms?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'invoice_clientId_fkey';
            columns: ['clientId'];
            referencedRelation: 'client';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'invoice_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      lineItems: {
        Row: {
          amount: number | null;
          createdAt: string | null;
          description: string | null;
          id: string;
          invoiceId: string | null;
          quantity: number | null;
          userId: string;
        };
        Insert: {
          amount?: number | null;
          createdAt?: string | null;
          description?: string | null;
          id?: string;
          invoiceId?: string | null;
          quantity?: number | null;
          userId: string;
        };
        Update: {
          amount?: number | null;
          createdAt?: string | null;
          description?: string | null;
          id?: string;
          invoiceId?: string | null;
          quantity?: number | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'lineItems_invoiceId_fkey';
            columns: ['invoiceId'];
            referencedRelation: 'invoice';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'lineItems_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      settings: {
        Row: {
          city: string | null;
          county: string | null;
          createdAt: string | null;
          email: string | null;
          id: string;
          name: string | null;
          postCode: string | null;
          street: string | null;
          userId: string;
        };
        Insert: {
          city?: string | null;
          county?: string | null;
          createdAt?: string | null;
          email?: string | null;
          id?: string;
          name?: string | null;
          postCode?: string | null;
          street?: string | null;
          userId: string;
        };
        Update: {
          city?: string | null;
          county?: string | null;
          createdAt?: string | null;
          email?: string | null;
          id?: string;
          name?: string | null;
          postCode?: string | null;
          street?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'settings_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
