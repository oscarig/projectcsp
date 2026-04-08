import { supabase } from "@/integrations/supabase/client";

// Define un tipo parcial para evitar errores hasta que se regeneren los tipos
export const documentService = {
  // Get all documents for an engagement
  async getDocumentsByEngagement(engagementId: string) {
    const { data, error } = await supabase
      .from("documents")
      .select(`
        *,
        uploader:profiles!documents_uploaded_by_fkey(full_name, email)
      `)
      .eq("engagement_id", engagementId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }

    return (data as any) || [];
  },

  // Get all documents for a client
  async getDocumentsByClient(clientUserId: string) {
    const { data, error } = await supabase
      .from("documents")
      .select(`
        *,
        engagements!inner(client_user_id, title, reference_number),
        uploader:profiles!documents_uploaded_by_fkey(full_name, email)
      `)
      .eq("engagements.client_user_id", clientUserId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }

    return (data as any) || [];
  },

  // Upload a document
  async uploadDocument(file: File, documentData: any) {
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const folder = documentData.engagement_id || "general";
      const filePath = `documents/${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("documents")
        .getPublicUrl(filePath);

      // Create document record
      const { data, error } = await supabase
        .from("documents")
        .insert({
          ...documentData,
          file_name: file.name,
          storage_path: filePath,
          file_url: urlData.publicUrl,
          file_size: file.size,
          file_type: file.type,
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error("Error creating document record:", error);
        throw error;
      }

      if (!data) {
        throw new Error("Failed to create document record");
      }

      return data;
    } catch (error) {
      console.error("Error in uploadDocument:", error);
      throw error;
    }
  },

  // Update document status
  async updateDocumentStatus(documentId: string, status: string, reviewNotes?: string) {
    const { data, error } = await supabase
      .from("documents")
      .update({
        status,
        notes: reviewNotes,
        reviewed_at: status === "approved" || status === "rejected" ? new Date().toISOString() : null,
      })
      .eq("id", documentId)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error updating document status:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Document not found");
    }

    return data;
  },

  // Delete a document
  async deleteDocument(documentId: string) {
    // Get document to get file path
    const { data: doc, error: fetchError } = await supabase
      .from("documents")
      .select("storage_path")
      .eq("id", documentId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching document:", fetchError);
      throw fetchError;
    }

    if (!doc) {
      throw new Error("Document not found");
    }

    // Delete file from storage
    if (doc?.storage_path) {
      const { error: storageError } = await supabase.storage
        .from("documents")
        .remove([doc.storage_path]);

      if (storageError) {
        console.error("Error deleting file from storage:", storageError);
      }
    }

    // Delete document record
    const { error } = await supabase
      .from("documents")
      .delete()
      .eq("id", documentId);

    if (error) {
      console.error("Error deleting document:", error);
      throw error;
    }

    return true;
  },

  // Get document statistics
  async getDocumentStats(clientUserId: string) {
    const { data: documents, error } = await supabase
      .from("documents")
      .select("status, engagements!inner(client_user_id)")
      .eq("engagements.client_user_id", clientUserId);

    if (error) {
      console.error("Error fetching document stats:", error);
      throw error;
    }

    const docs = (documents as any[]) || [];

    const stats = {
      total: docs.length,
      pending: docs.filter(d => d.status === "pending").length,
      approved: docs.filter(d => d.status === "approved").length,
      rejected: docs.filter(d => d.status === "rejected").length,
    };

    return stats;
  },
};