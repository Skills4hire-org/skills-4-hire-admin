interface Props {
  value: string
  setValue: (v: string) => void
}

export default function SortDropdown({ value, setValue }: Props) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
          appearance-none
          h-[36px]
          w-[110px]
          px-4 pr-8
          rounded-md
          bg-white
          border border-gray-200
          text-xs md:text-sm
          shadow-sm
          hover:bg-gray-50
          hover:border-gray-300
          focus:outline-none
          focus:ring-2 focus:ring-primary
          focus:border-primary
          transition
          cursor-pointer
        "
      >
        <option value="">Sort</option>
        <option value="newest">Newest → Oldest</option>
        <option value="oldest">Oldest → Newest</option>
        <option value="highest">Highest Budget</option>
        <option value="lowest">Lowest Budget</option>
      </select>

      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex flex-col leading-[8px] text-gray-500 text-[10px]">
        <span>▲</span>
        <span>▼</span>
      </div>
    </div>
  )
}
