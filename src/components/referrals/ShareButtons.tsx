import {
  FaFacebookF,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6'

export default function ShareButtons({
  referralLink,
}: {
  referralLink: string
}) {
  const shareText = 'Join this amazing platform using my referral link!'
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${shareText} ${referralLink}`,
    )}`,

    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      referralLink,
    )}`,

    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      referralLink,
    )}`,

    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(referralLink)}`,
  }
  const openShare = (url: string) => {
    window.open(url, '_blank')
  }
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        onClick={() => openShare(shareLinks.whatsapp)}
        className="p-2.5 sm:p-3 bg-gray-400 rounded-lg hover:bg-gray-500 transition cursor-pointer"
      >
        <FaWhatsapp className="w-5 h-5 text-gray-900" />
      </button>

      {/* Facebook */}
      <button
        onClick={() => openShare(shareLinks.facebook)}
        className="p-2.5 sm:p-3 bg-gray-400 rounded-lg hover:bg-gray-500 transition cursor-pointer"
      >
        <FaFacebookF className="w-5 h-5 text-gray-900" />
      </button>

      {/* LinkedIn */}
      <button
        onClick={() => openShare(shareLinks.linkedin)}
        className="p-2.5 sm:p-3 bg-gray-400 rounded-lg hover:bg-gray-500 transition cursor-pointer"
      >
        <FaLinkedin className="w-5 h-5 text-gray-900" />
      </button>

      {/* X (Twitter) */}
      <button
        onClick={() => openShare(shareLinks.x)}
        className="p-2.5 sm:p-3 bg-gray-400 rounded-lg hover:bg-gray-500 transition cursor-pointer"
      >
        <FaXTwitter className="w-5 h-5 text-gray-900" />
      </button>
    </div>
  )
}
