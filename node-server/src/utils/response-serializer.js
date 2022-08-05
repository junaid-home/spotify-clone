module.exports = function serializeResponse(res, obj, statusCode = 200) {
  return res.status(statusCode).json({ status: 'ok', statusCode, data: obj })
}
