declare namespace Express {
  export interface Request {
    user_hash: string;
    user_id: string;
    file: any;
  }
}
