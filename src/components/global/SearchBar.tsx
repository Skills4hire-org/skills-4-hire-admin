import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import type { FormEvent } from 'react'

export default function SearchBar({
  placeholder,
  maxWidth,
  autoFocus,
  value,
  onSubmit,
  setSearchQuery,
}: {
  placeholder: string
  maxWidth?: string
  autoFocus?: boolean
  value?: string
  onSubmit: () => void
  setSearchQuery: (value: string) => void
}) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${maxWidth} mx-auto`}>
      <Input
        type="text"
        className={`pl-3 pr-10 rounded-md border h-8 md:h-9 text-sm md:text-base`}
        placeholder={placeholder}
        autoFocus={autoFocus}
        name="searchQuery"
        id="searchQuery"
        value={value}
        onChange={(e) => setSearchQuery(e.target.value)}
        required
      />
      <button
        type="submit"
        className="absolute top-1/2  -translate-y-1/2 h-full right-0 w-8 bg-primary text-white rounded-r-md flex items-center justify-center cursor-pointer"
      >
        <Search className="w-4.5 h-4.5" />
      </button>
    </form>
  )
}
