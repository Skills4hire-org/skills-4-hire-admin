import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  exp: number
}

export const parseBudget = (budget: string) => {
  if (!budget) return 0
  return Number(budget.replace(/[^\d]/g, ''))
}

export const extractLocation = (location?: string) => {
  if (!location) return { city: '', state: '' }

  const parts = location.split(',').map((part) => part.trim())

  return {
    city: parts[0] || '',
    state: parts[1] || '',
  }
}

export const detectServiceType = (title: string) => {
  const lower = title.toLowerCase()

  if (lower.includes('plumb')) return 'Plumbing'
  if (lower.includes('electric')) return 'Electrical'
  if (lower.includes('clean')) return 'Cleaning'
  if (lower.includes('carp')) return 'Carpentry'

  return 'Other'
}

export const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.exp * 1000 < Date.now()
  } catch {
    return true
  }
}
