import { useEffect, useRef } from 'react'

type UseInfiniteScrollProps = {
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage: () => void
  root?: Element | null
  rootMargin?: string
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  root = null,
  rootMargin = '150px',
}: UseInfiniteScrollProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]

        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { root, rootMargin },
    )

    const el = ref.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, root, rootMargin])

  return ref
}
