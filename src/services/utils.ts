export function setCookie (name: string, value: any, props: any) {
  props = props || {}
  let exp = props.expires
  if (typeof exp === 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value)
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}

export function getCookie (name: string) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const getUser = () => {

}

const checkResponse = (res: any) => res.ok ? res.json() : res.json().then((e: any) => Promise.reject(e))

export const refreshToken = () => {
  return fetch('https://norma.nomoreparties.space/api/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  })
    .then(checkResponse)
}

export const fetchWithRefresh = async (url: string, option: any) => {
  try {
    const res = await fetch(url, option)
    return await checkResponse(res)
  } catch (err: any) {
    if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
      const refreshData = await refreshToken()
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      setCookie('accessToken', refreshData.accessToken.split('Bearer ')[1], { path: '/' })
      option.headers.authorization = `Bearer ${refreshData.accessToken}`
      const res = await fetch(url, option)
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}
