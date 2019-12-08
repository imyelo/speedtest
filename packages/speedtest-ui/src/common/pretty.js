import prettyMilliseconds from 'pretty-ms'
import mbps from 'mbps'

export const prettySpeed = (speed) => speed && mbps(speed, 1)
export const prettyDuration = (duration) => prettyMilliseconds(duration)
