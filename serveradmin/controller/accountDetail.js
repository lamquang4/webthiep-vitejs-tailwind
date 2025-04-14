const getAccountAdminDetailsFromToken = require("../helpers/getAccountAdminDetailsFromToken")

async function accountDetail(request, response){
try{
const token = request.cookies.token_admin || ""
const admin = await getAccountAdminDetailsFromToken(token)
return response.status(200).json({
    message: "admin details",
    data : admin
})
}catch(error){
    return response.status(500).json({
        message : error.message || error,
        error : true
    })
}
}
module.exports = accountDetail