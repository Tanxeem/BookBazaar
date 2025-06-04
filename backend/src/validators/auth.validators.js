import {z} from 'zod';

const userRegistrationValidator = z.object({
    name: z
    .string()
    .min(3, {message: "name must be at least 3 characters long"})
    .max(20, {message: "name must be at most 20 characters long"})
    .max(20)
    .trim(),

    email: z
    .string()
    .email()
    .trim(),

    password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"})
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
})

const userLoginValidator = z.object({
    
    email: z
    .string()
    .email()
    .trim(),

    password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"})
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
   
})

const changePasswordValidator = z.object({
    password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"})
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),

    confirmPassword: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"})
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
   
})


const userUpdateProfileValidator = z.object({
    name: z
    .string()
    .min(3, {message: "Username must be at least 3 characters long"})
    .max(20, {message: "Username must be at most 20 characters long"})
    .max(20)
    .trim(),

    email: z
    .string()
    .email()
    .trim(),

    password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"})
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",

    }),
    confirmpassword: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long"})
    .max(20, {message: "Password must be at most 20 characters long"})
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
})

const bookSchema = z.object({
  title: z.string().min(1).max(100),
  author: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  price: z.number().min(0),
  stock: z.number().min(0).default(0),
  genre: z.enum(['fiction', 'non-fiction', 'science', 'history', 'biography', 'fantasy', 'mystery', 'romance']),
  publishedYear: z.number().optional(),
  publisher: z.string().optional(),
  isbn : z.string().optional(),
  averageRating: z.number().min(0).max(5).default(0),
  numOfReviews: z.number().min(0).default(0),
});
// Review validation
const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional()
});

// Order validation
const orderItemSchema = z.object({
  bookId: z.string().min(1),
  quantity: z.number().min(1)
});

const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  shippingAddress: z.string().min(1).max(200)
});


export {userRegistrationValidator, userLoginValidator, changePasswordValidator, userUpdateProfileValidator, bookSchema, reviewSchema, orderSchema};