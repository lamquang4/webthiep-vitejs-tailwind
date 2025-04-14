async function logout(request, response) {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      sameSite: "None",
      path: "/",
    };

    return response.cookie("token_user", "", cookieOptions).status(200).json({
      message: "session out",
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = logout;
