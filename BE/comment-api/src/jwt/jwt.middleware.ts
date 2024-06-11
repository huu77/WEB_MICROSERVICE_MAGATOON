import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

import { Payload } from './jwt.type'
import { Errors } from '../helpers/error.helper'
import { redisClient } from '../redis/redis.config'
import { RedisKeyGenerator } from '../helpers/redisKey.helper'
import { Role } from '../enums/role.enum'
import path from 'path'
import fs from 'fs'

const publicKeyPath = path.join(process.cwd(), "key", "public.pem");

export class JwtMiddleware {

    static authentication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const publicKey = fs.readFileSync(publicKeyPath);
            const accessToken = (req.headers?.['authorization'] as string)?.split('Bearer ')?.[1]
            const user = jwt.verify(accessToken, publicKey) as any

            const standardedUser = {
                userId: user.idUser,
                role: user.role,
                status: user.status,
                iat: user.iat
            } as Payload
            
            if (standardedUser.role === Role.GUEST) {
                req.user = standardedUser
                return next()
            }

            const accessTokenInRedis = await redisClient.get(RedisKeyGenerator.accessTokenkey(accessToken))
            if (accessTokenInRedis) {
                req.user = standardedUser
                return next()
            }
            throw Errors.Unauthorized
        } catch (error) {
            console.log(error);
            
            if (error instanceof JsonWebTokenError) {
                return next(Errors.Unauthorized)
            }
            return next(error)
        }
    }

}