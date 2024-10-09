import { z } from 'zod';

// Utility constants
const imageTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/svg+xml',
	'image/gif'
];

// User related schemas
export const UserSchema = z.object({
	id: z.string(),
	collectionId: z.string(),
	collectionName: z.string(),
	username: z.string(),
	verified: z.boolean(),
	emailVisibility: z.boolean(),
	email: z.string().email(),
	created: z.string().datetime(),
	updated: z.string().datetime(),
	avatar: z.string().optional(),
	name: z.string(),
	division: z.string(),
	job_title: z.string(),
	favorites: z.array(z.string()),
	likes: z.array(z.string()),
	following: z.array(z.string()),
	badges: z.array(z.string()),
	post: z.string().optional(),
	last_login: z.string().datetime().optional(),
});

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' }),
	password: z.string({ required_error: 'Password is required' })
});

export const registerUserSchema = z
	.object({
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email must be a valid email' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const updateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
});

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(24, { message: 'Username must be 24 characters or less' })
		.regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' })
});

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string({ required_error: 'Old password is required' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const updateProfileSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(64, { message: 'Name must be 64 characters or less' })
		.trim(),

	job_title: z
		.string({ required_error: 'Job Title is required' })
		.min(1, { message: 'Job Title is required' })
		.max(64, { message: 'Job Title must be 64 characters or less' })
		.trim(),

	avatar: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Avatar must be less than 5MB'
					});
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
					});
				}
			}
		})
});

// Forum related schemas
export const forumSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional().nullable(),
	genre: z.string().nullable(),
	createdAt: z.string().optional(),
	slug: z.string().optional(),
	owner: z.string().or(UserSchema).optional(),
});

export const subforumSchema = forumSchema.extend({
	parent_forum: z.string(),
});

export const forumResponseSchema = z.object({
	forum: forumSchema.extend({
		subforums: z.array(subforumSchema).optional(),
	}),
});

export const forumListSchema = z.array(forumSchema);

export const forumsResponseSchema = z.object({
	forums: forumListSchema,
});

export const paginatedForumListSchema = z.object({
	page: z.number(),
	perPage: z.number(),
	totalItems: z.number(),
	totalPages: z.number(),
	items: forumListSchema,
});

export const createForumSchema = z.object({
	genre: z.string().optional(),
	parent_forum: z.string().optional(),
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	is_global: z.boolean().optional(),
	image: z.instanceof(Blob).optional(),
	premise: z.string().optional(),
	guidelines: z.string().optional()
});

// Genre schema
export const genreSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional()
});

export const createGenreSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional()
});

// Character schema
export const createCharacterSchema = z.object({
	user: z.string(),
	name: z.string().min(1, "Name is required"),
	biography: z.string().optional(),
	avatar: z.instanceof(Blob).optional(),
	soul_type: z.string().optional(),
	species: z.string().optional(),
	class: z.string().optional(),
	is_approved: z.boolean().optional()
});

// Wanted Ad schema
export const createWantedAdSchema = z.object({
	user: z.string(),
	forum: z.string(),
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	requirements: z.string().optional(),
	status: z.enum(["open", "closed", "filled"]).optional()
});

// Thread schemas
export const createThreadSchema = z.object({
	forum: z.string(),
	user: z.string(),
	title: z.string().min(1, "Title is required"),
	last_post_at: z.date().optional()
});

export const createThreadPostSchema = z.object({
	thread: z.string(),
	user: z.string(),
	character: z.string().optional(),
	content: z.string().min(1, "Content is required"),
	word_count: z.number().optional()
});

// Role and Permission schemas
export const createRoleSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional()
});

export const createPermissionSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional()
});

export const createRolePermissionSchema = z.object({
	role: z.string(),
	permission: z.string()
});

export const createUserRoleSchema = z.object({
	user: z.string(),
	role: z.string(),
	forum: z.string().optional()
});

// Guestbook schemas
export const createGuestBookPostSchema = z.object({
	author: z.string(),
	content: z.string({ required_error: 'Text area content is required' })
		.min(1, { message: 'Text area content cannot be empty.' })
		.max(250, { message: 'Text area content cannot exceed 250 characters.' })
});

export const likeGuestBookPostSchema = z.object({
	postId: z.string(),
	currentUserId: z.string()
});

// Type exports
export type User = z.infer<typeof UserSchema>;
export type Forum = z.infer<typeof forumSchema>;