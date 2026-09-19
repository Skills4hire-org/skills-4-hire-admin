import { Button } from '../ui/button'
import { Loader2Icon } from 'lucide-react'

interface SubmitButtonProp {
  submitting: boolean
  text: string
  texting: string
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
  className?: string
  disabled?: boolean
}

function FormSubmitButton({
  submitting,
  text,
  texting,
  size,
  className,
  disabled,
}: SubmitButtonProp) {
  return (
    <div>
      {submitting ? (
        <Button
          size={size ?? 'default'}
          disabled
          className={`min-w-30  ${className}`}
        >
          {texting} <Loader2Icon className="animate-spin " />
        </Button>
      ) : (
        <Button
          size={size}
          type="submit"
          className={className}
          disabled={disabled}
        >
          {text}
        </Button>
      )}
    </div>
  )
}
export default FormSubmitButton
