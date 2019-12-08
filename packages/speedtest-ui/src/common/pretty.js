import mbps from 'mbps'

export const prettySpeed = (speed) => speed && mbps(speed, 1)
