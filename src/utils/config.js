import getConfig from 'next/config'


export function url(filename) {
  const { publicRuntimeConfig } = getConfig()
  return publicRuntimeConfig.urlPrefix + filename
}