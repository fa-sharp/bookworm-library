import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production' && !process.env.AUTH0_API_ID)
    dotenv.config();

const AUTH0_API_ID = process.env.AUTH0_API_ID;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;


export const validateJWT = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-n51nmhca.us.auth0.com/.well-known/jwks.json'
  }),
  audience: AUTH0_API_ID,
  issuer: AUTH0_DOMAIN,
  algorithms: ['RS256']
});