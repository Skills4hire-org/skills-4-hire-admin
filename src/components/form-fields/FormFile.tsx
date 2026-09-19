import type { FileStructure } from '@/types/onboard.types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Upload } from 'lucide-react'
import { toast } from 'sonner'

interface FormFileProp {
  name: string
  handleFileChange: (
    field: string,
    file: FileList | null,
    prevFile: FileStructure,
  ) => void
  handleFileUpload: (field: string, file: File[]) => void
  handleSelectNewFile: (field: string) => void
  file: File[] | null
  label?: string
  required?: boolean
  ref?: any
  fileUploaded: FileStructure
}
export default function FormFile({
  name,
  handleFileChange,
  label,
  required,
  ref,
  handleFileUpload,
  file,
  fileUploaded,
  handleSelectNewFile,
}: FormFileProp) {
  return (
    <div className="space-y-1.5">
      {label && (
        <Label
          htmlFor={name}
          className=" text-sm md:text-base font-medium  block w-max"
        >
          {label}
        </Label>
      )}
      <div className="relative">
        {fileUploaded?.selectNewFile ? (
          <Input
            ref={ref}
            id={name}
            name={name}
            type="file"
            accept="image/png, .image/jpeg"
            onChange={(e) =>
              handleFileChange(name, e.target.files, fileUploaded)
            }
            className="file:hidden font-normal rounded-none text-sm md:text-base pt-1.5 md:pt-1 cursor-pointer"
            required={required}
          />
        ) : (
          <Input
            key={fileUploaded?.name === undefined ? 'undefined' : 'defined'}
            id={name}
            name={name}
            type="text"
            className="rounded-none text-sm md:text-base disabled:text-foreground disabled:opacity-100 pr-[100px]"
            value={fileUploaded?.name}
            readOnly
            disabled
          />
        )}

        {fileUploaded?.selectNewFile || (
          <Button
            type="button"
            size="sm"
            className="absolute right-0 top-0 h-full rounded-none"
            onClick={() => handleSelectNewFile(name)}
          >
            Change file
          </Button>
        )}
      </div>
      {fileUploaded?.selectNewFile && (
        <button
          type="button"
          className={`border px-1 py-2 text-center font-normal space-y-1 cursor-pointer disabled:no-cursor `}
          onClick={() => {
            file
              ? handleFileUpload(name, file)
              : toast.warning('Please choose a file')
          }}
        >
          <Upload className="mx-auto w-4 h-4" />
          <p className="text-sm">Click to upload</p>
          <p className="text-[10px] text-muted-foreground">
            JPEG or PNG (MAX 2MB)
          </p>
        </button>
      )}
    </div>
  )
}
