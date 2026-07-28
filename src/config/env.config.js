import dotenv from "dotenv"
dotenv.config({path:[`.${process.env.NODE_ENV}.env`, '.env']})

const envConfig={
    app:{
        NODE_ENV:process.env.NODE_ENV?? 'dev',
        PORT:process.env.PORT?? 8000
    },
    database:{
        DB_URL:process.env.DB_URL
    },
    jwt:{
        ACCESS_SIGNATURE:process.env.JWT_SECRET_USER
    },
    emails:{
        service:process.env.EMAIL_SERVICE,
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },
      cors:{
        whiteListedOrigins:process.env.CORS_WHITELISTED_ORIGIN
    }
}

export default envConfig;