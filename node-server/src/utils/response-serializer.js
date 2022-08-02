module.exports = function serializeResponse(res, obj, statusCode = 200) {
  return res.json({ status: 'ok', statusCode, data: obj })
}
