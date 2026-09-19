import CoverPhotoDialog from './CoverPhotoDialog'

export default function CoverPhoto({ cover_photo }: { cover_photo?: string }) {
  return (
    <div className="relative">
      <div
        className={`w-full bg-cover bg-center bg-gray-200 h-[20vh] md:h-[25vh]`}
        style={{
          backgroundImage: `url(${cover_photo})`,
        }}
      />
      <CoverPhotoDialog cover_photo={cover_photo} />
    </div>
  )
}
