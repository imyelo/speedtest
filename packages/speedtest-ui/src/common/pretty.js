import prettyBytes from 'pretty-bytes'

export const prettySpeed = (speed) => speed && `${prettyBytes(speed)}/s`
