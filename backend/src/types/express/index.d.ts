import { User as PrismaUser, Task } from "@prisma/client";

declare global {
  namespace Express {
    
    interface Request {
      currentUser?:
        | (PrismaUser & {
            tasks?: Task[];
          })
        | null;
      user?:
        | (PrismaUser & {
            tasks?: Task[];
          })
        | null;
    }
  }
}
