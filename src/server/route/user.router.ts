import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { createUserSchema } from "../../schema/user.schema";
import { createRouter } from "../createRouter";

export const userRouter = createRouter()
    .mutation('register-user', {
        input: createUserSchema,
        // output:
        async resolve({ input, ctx }) {
            const { email, name } = input;
            try {
                const user = await ctx.prisma.user.create({
                    data: {
                        email,
                        name
                    }
                })
                return user
            }
            catch (e) {

                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new TRPCError({
                            code: 'CONFLICT',
                            message: 'Email already exists'
                        })
                    }
                }
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Internal server error'
                })
            }


        }

    }) 