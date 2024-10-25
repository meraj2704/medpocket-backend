// customError.ts
export class CustomError extends Error {
    status: number;
    details?: any;
  
    constructor(message: string, status: number = 500, details?: any) {
      super(message);
      this.status = status;
      this.details = details;
    }
  }
  