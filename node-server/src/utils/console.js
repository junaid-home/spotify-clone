const textColors = {
  black: '\x1b[30m',
  white: '\x1b[37m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

const infoText = (input, color) => `\x1b[1m${color}[ ${input} ]\x1b[0m\x1b[0m`
const messageText = (input, color) => `${color}${input}\x1b[0m`
const linkText = (input) => `\x1b[4m\x1b[34mhttp://${input}\x1b[0m\x1b[0m`

const defaultOpts = {
  infoText: 'server log',
  infoTextColor: 'yellow',
  messageTextColor: 'white',
  linkText: null,
}

const log = (message, options = {}) => {
  const opts = { ...defaultOpts, ...options }

  if (
    !Object.keys(textColors).includes(opts.infoTextColor) ||
    !Object.keys(textColors).includes(opts.messageTextColor)
  ) {
    throw new Error(
      `Only the following log colors are supported: ${Object.keys(
        textColors
      ).join(', ')}`
    )
  }

  // eslint-disable-next-line no-console
  console.log(
    `${infoText(
      opts.infoText.toUpperCase(),
      textColors[opts.infoTextColor]
    )} ${messageText(message, textColors[opts.messageTextColor])} ${
      opts.linkText ? linkText(`${opts.linkText}`) : ''
    }`
  )
}

module.exports = { infoText, linkText, log }
