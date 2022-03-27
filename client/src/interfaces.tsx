export interface Secret {
  _id: string;
  hash: string;
  secretText: string;
  createdAt: Date;
  expiresAt: Date;
}
