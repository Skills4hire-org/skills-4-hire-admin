export default function NoResultFound({
  icon,
  text,
  subtitle,
}: {
  icon: any
  text: string
  subtitle?: string
}) {
  const Icon = icon
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon className="w-7 h-7 text-gray-400" />
      </div>

      <p className="text-gray-600 font-medium">{text}</p>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  )
}
