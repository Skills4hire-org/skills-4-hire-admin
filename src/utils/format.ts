import {
  format,
  formatDistanceToNowStrict,
  isToday,
  isYesterday,
} from 'date-fns'
import type {
  AvailableServices,
  Notification,
  TransactionHistory,
} from './types'
import { AiFillNotification } from 'react-icons/ai'
import type { IconType } from 'react-icons/lib'
import { MdCancel } from 'react-icons/md'
import { TbMessage, TbMoneybag } from 'react-icons/tb'

export const getBasePath = (pathname: string) => {
  return pathname.split('/').slice(0, 3).join('/')
}
export const currencyFormatter = (price: number | undefined) => {
  if (price || price == 0) {
    const amount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
      currencyDisplay: 'symbol',
    }).format(price)
    return amount
  }
}
export const dateFormatter = (timestamp: string | undefined | number) => {
  if (timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })

    return formattedDate
  }
}
export const timeFormatter = (timestamp: string | undefined | number) => {
  if (timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })

    return formattedDate
  }
}

export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString)

  if (isToday(date)) {
    return `Today, ${format(date, 'hh:mm a')}`
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, 'hh:mm a')}`
  }

  return format(date, 'MMM d, yyyy, hh:mm a')
}

export const groupedServicesByCategory = ({
  services,
}: {
  services: AvailableServices[] | undefined
}) => {
  const formatAvailableServices = services?.reduce(
    (acc, current) => {
      ;(acc[current.category] ??= []).push(current)
      return acc
    },
    {} as Record<string, AvailableServices[]>,
  )
  return formatAvailableServices
}

const amount = currencyFormatter(10000)
export const getNotificationDetails: Record<
  string,
  { title: string; message: string; icon: IconType; className: string }
> = {
  canceled: {
    title: 'Job canceled',
    message:
      'The client has canceled the request. Stay tuned for more opportunities',
    icon: MdCancel,
    className: 'text-red-500',
  },

  earned: {
    title: 'Earnings update',
    message: `You’ve made ${amount} this week. Keep up the great work`,
    icon: TbMoneybag,
    className: 'text-green-500',
  },
  message: {
    title: 'New message',
    message:
      'A client has sent you a message regarding a job. Check your inbox.',
    icon: TbMessage,
    className: 'text-blue-500',
  },
  job: {
    title: 'New job alert',
    message:
      'A client has sent you a message regarding a job. Check your inbox.',
    icon: AiFillNotification,
    className: 'text-yellow-500',
  },
}

export function groupNotificationsByDay(notifications: Notification[]) {
  return notifications.reduce(
    (groups: Record<string, Notification[]>, notification) => {
      const date = new Date(notification.createdAt)

      let groupKey: string
      if (isToday(date)) {
        groupKey = 'Today'
      } else if (isYesterday(date)) {
        groupKey = 'Yesterday'
      } else {
        groupKey = format(date, 'EEEE, d MMMM yyyy')
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(notification)
      return groups
    },
    {},
  )
}

export function groupTransactionsByDay(transactions: TransactionHistory[]) {
  return transactions.reduce(
    (groups: Record<string, TransactionHistory[]>, transaction) => {
      const date = new Date(transaction.createdAt)

      let groupKey: string
      if (isToday(date)) {
        groupKey = 'Today'
      } else if (isYesterday(date)) {
        groupKey = 'Yesterday'
      } else {
        groupKey = format(date, 'EEEE, d MMMM yyyy')
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(transaction)
      return groups
    },
    {},
  )
}

export function isSameUrl(linkPath: string, pathname: string, hash: string) {
  // Normalize "/" vs ""
  const current = `${pathname}${hash || ''}` || '/'
  return current === linkPath
}

export function formatCommentTime(dateString: string) {
  const date = new Date(dateString)

  // Today
  if (isToday(date)) {
    return formatDistanceToNowStrict(date, {
      addSuffix: true,
    })
  }

  // Yesterday
  if (isYesterday(date)) {
    return 'Yesterday'
  }

  const now = new Date()

  const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)

  // Within 7 days
  if (diffInDays < 7) {
    return formatDistanceToNowStrict(date, {
      addSuffix: true,
    })
  }
}

export const getVideoMimeType = (url: string) => {
  const cleanUrl = url.split('?')[0].split('#')[0]

  const extension = cleanUrl.split('.').pop()?.toLowerCase()

  const mimeTypes: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    ogv: 'video/ogg',
    mov: 'video/quicktime',
    m4v: 'video/x-m4v',
  }

  return mimeTypes[extension ?? ''] ?? 'video/mp4'
}
