const getAccountDetailsFromToken = require("../helpers/getAccountDetailsFromToken");

async function accountDetail(request, response) {
  try {
    const token = request.cookies.token_user || "";
    const user = await getAccountDetailsFromToken(token);
    return response.status(200).json({
      message: "account details",
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}
module.exports = accountDetail;
