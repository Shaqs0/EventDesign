import { z } from 'zod';


export const createUserDto = z.object({
    user_id: z.number().optional(),
    user_name: z.string().min(1),
    login: z.string().min(3),
    password: z.string().min(6),
    email: z.string().email(), 
  });
  
  



export const loginUserDto = z.object({
    login: z.string().min(3),
    password: z.string().min(6)
});
