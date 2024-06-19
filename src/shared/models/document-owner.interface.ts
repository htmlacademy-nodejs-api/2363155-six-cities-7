interface DocumentOwner {
  isOwner(documentId: string, userId: string): Promise<boolean>;
}

export type { DocumentOwner };

