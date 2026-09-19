import { MdError } from 'react-icons/md'

export default function Error({
  text,
  buttonFunc,
  buttonText,
}: {
  text: string
  buttonFunc?: () => void
  buttonText?: string
}) {
  return (
    <div className="w-full h-full flex items-center justify-center gap-3 flex-col">
      <div className="text-sm md:text-base flex items-center gap-1 font-medium text-red-600">
        <MdError className="w-3 h-3 md:w-4 md:h-4 " />
        <span>{text}</span>
      </div>
      <button
        onClick={buttonFunc}
        className="shadow-sm px-4 py-1 text-sm md:text-base font-medium rounded-sm cursor-pointer hover:shadow-md"
      >
        {buttonText ? buttonText : 'Refresh'}
      </button>
    </div>
  )
}
