import ProfileImage from '../global/ProfileImage'

export default function EndorserCard() {
  return (
    <div className="rounded-md shadow-sm">
      <div className="flex items-center gap-2 px-2 py-1.5 bg-white rounded-t-md">
        <ProfileImage noStatus size="size-8" />
        <h3 className="font-semibold text-base md:text-lg">Joshua Friday</h3>
      </div>
      <p className="text-sm md:text-base p-2 bg-gray-100">
        Joshua is an amazing person
      </p>
    </div>
  )
}
