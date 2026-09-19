import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface FormInputFieldProp {
  name: string;
  label?: string;
  labelSize?: string;
  value: string | undefined;
  handleInputChange: (key: string, value: any) => void;
  placeholder?: string;
  type: string;
  min?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  handleBlur?: () => void;
  maxLength?: number;
  inputMode?:
    | "search"
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal";
    pattern?: string;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  name,
  label,
  value,
  handleInputChange,
  placeholder,
  type,
  min,
  required,
  disabled,
  className,
  handleBlur,
  maxLength,
  inputMode,
  pattern,
  handleKeyDown,
  labelSize,
}: FormInputFieldProp) {
  return (
    <div className="space-y-1.5">
      {label && (
        <Label htmlFor={name} className={`text-sm md:text-base ${labelSize}`}>
          {label}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleInputChange(name, e.target.value)}
        placeholder={placeholder}
        type={type}
        min={min}
        required={required}
        disabled={disabled}
        className={` break-all  text-sm md:text-base placeholder:text-sm placeholder:md:text-base ${className}`}
        onBlur={handleBlur}
        autoComplete="true"
        maxLength={maxLength}
        inputMode={inputMode}
        pattern={pattern}
        onKeyDown={(e) => handleKeyDown && handleKeyDown(e)}
      />
    </div>
  )
}
