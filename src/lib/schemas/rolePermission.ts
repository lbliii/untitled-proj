import { z } from 'zod'

export const createRoleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
})

export const createPermissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
})

export const createRolePermissionSchema = z.object({
  role: z.string(),
  permission: z.string(),
})

export const createUserRoleSchema = z.object({
  user: z.string(),
  role: z.string(),
  forum: z.string().optional(),
})