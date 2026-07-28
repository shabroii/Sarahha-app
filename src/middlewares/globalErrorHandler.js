


export const globalErrorHandler = (err, req, res, next) => {
    const status = err.cause?.status || 500

    res.status(status).json({
        message: err.message || "Internal Server Error",
        status,
        stack: err.stack // متنسوش هنشيل السطر ده وقت الـProduction
    })
}