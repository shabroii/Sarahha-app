export const authorized = (roles) => {
  return (req, res, next) => {
    const userRole= req.user.role
    if(!roles.includes(userRole)){
        throw new Error("Not authorized", {cause:{status:403}})
    }
    next()
}
}