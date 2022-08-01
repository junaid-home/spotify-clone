const infoText = (input) => `\x1b[1m\x1b[33m[ ${input} ]\x1b[0m\x1b[0m`

const linkText = (input) => `\x1b[4m\x1b[34mhttp://${input}\x1b[0m\x1b[0m`

const defaultOpts = {
  infoText: 'server log',
  linkText: null,
}

const log = (message, options = {}) => {
  const opts = { ...defaultOpts, ...options }
  // eslint-disable-next-line no-console
  console.log(
    `${infoText(opts.infoText.toUpperCase())} ${message} ${
      opts.linkText && linkText(`${opts.linkText}`)
    }`
  )
}

module.exports = { infoText, linkText, log }
