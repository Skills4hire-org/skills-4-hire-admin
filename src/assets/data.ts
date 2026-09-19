import {
  ArrowDownUp,
  Banknote,
  FileText,
  HelpCircle,
  Info,
  Mail,
  MessageCircleQuestion,
  Phone,
  PhoneCall,
  Send,
  ShieldAlert,
  Wallet,
} from 'lucide-react'
import { CreditCard, User } from 'lucide-react'
import { MessageSquare, BookOpen } from 'lucide-react'
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa6'
import img1 from './Rectangle 20.png'
import img2 from './Rectangle 21.png'
import { TbHeart, TbStar, TbUser } from 'react-icons/tb'
import Rect20 from './Rectangle 20.png'
import Rect21 from './Rectangle 21.png'
import JoshuaFridayBG from './JoshuaFriday-bg.png'
import MaryPraise from './MaryPraise.png'
import carpentry from './images/carpentry.jpg'
import cleaning from './images/cleaning.jpg'
import cybersecurity from './images/cybersecurity.jpg'
import dataAnalysis from './images/dataAnalysis.jpg'
import devops from './images/devops.jpg'
import digitalMarketing from './images/digitalMarketing.jpg'
import electrical from './images/electrical.jpg'
import fitnessTraining from './images/fitnessTraining.jpg'
import graphicDesign from './images/graphicDesign.jpg'
import hairDressing from './images/hairDressing.jpg'
import motionGraphics from './images/motionGraphics.jpg'
import plumbing from './images/plumbing.jpg'
import projectManagement from './images/projectManagement.jpg'
import videoEditing from './images/videoEditing.jpg'
import webDevelopment from './images/webDevelopment.jpg'
import heroCarousel1 from './images/hero-carousel-1.jpg'
import heroCarousel2 from './images/hero-carousel2.jpg'
import heroCarousel3 from './images/hero-carousel3.png'

export const images = [img1, img2, img1]

/* ============== NAVLINKS =============   */
export const sidebarMobileGeneral = [
  {
    icon: TbHeart,
    label: 'favorites',
    url: '/customer/favorites',
  },
  /* {
    icon: TbArticle,
    label: 'blog',
    url: '/',
  },
  {
    icon: TbAward,
    label: 'my rewards',
    url: '/customer/rewards',
  }, */
  {
    icon: TbStar,
    label: 'my reviews',
    url: '/customer/reviews',
  },
]
export const sidebarDesktopGeneral = [
  {
    icon: TbUser,
    label: 'profile',
    url: '/customer/profile',
  },
  {
    icon: TbHeart,
    label: 'favorites',
    url: '/customer/favorites',
  },
  /* {
    icon: TbArticle,
    label: 'blog',
    url: '/',
  },
  {
    icon: TbAward,
    label: 'my rewards',
    url: '/customer/rewards',
  }, */
  {
    icon: TbStar,
    label: 'my reviews',
    url: '/customer/reviews',
  },
]

export const sidebarAboutUs = [
  {
    icon: Info,
    label: 'about us',
    url: '/about',
  },
  {
    icon: ShieldAlert,
    label: 'privacy policy',
    url: '/privacy-policy',
  },
  {
    icon: FileText,
    label: 'terms & conditions',
    url: '/terms-and-conditions',
  },
  {
    icon: HelpCircle,
    label: 'help & support',
    url: '/customer/support',
  },
  {
    icon: PhoneCall,
    label: 'helpline number',
    url: 'tel:+2347073743287',
  },
]

export const customerMobileNavLinks = [
  {
    label: 'Home',
    icon: 'si:home-line',
    url: '/customer/home',
    activeIcon: 'si:home-fill',
  },
  {
    key: 'services',
    label: 'Services',
    icon: 'fluent:briefcase-medical-16-regular',
    url: '/customer/services',
    activeIcon: 'fluent:briefcase-medical-16-filled',
  },
  {
    label: 'bookings',
    icon: 'fluent:clipboard-settings-24-regular',
    url: '/customer/bookings',
    activeIcon: 'fluent:clipboard-settings-24-filled',
  },
  {
    label: 'wallet',
    icon: 'solar:wallet-outline',
    url: '/customer/wallet',
    activeIcon: 'solar:wallet-bold',
  },
  {
    label: 'chats',
    icon: 'material-symbols:chat-outline-rounded',
    url: '/customer/chats',
    activeIcon: 'material-symbols:chat-rounded',
  },
]
export const customerDesktopNavLinks = [
  {
    label: 'Home',
    icon: 'si:home-line',
    url: '/customer/home',
  },
  {
    key: 'services',
    label: 'Services',
    icon: 'fluent:briefcase-medical-16-regular',
    url: '/customer/services',
  },
  {
    label: 'bookings',
    icon: 'fluent:clipboard-settings-24-regular',
    url: '/customer/bookings',
  },
  { label: 'wallet', icon: 'solar:wallet-outline', url: '/customer/wallet' },
  {
    label: 'chats',
    icon: 'material-symbols:chat-outline-rounded',
    url: '/customer/chats',
  },
  {
    label: 'notification',
    icon: 'lucide:bell',
    url: '/customer/notification',
  },
  {
    label: 'help center',
    icon: 'lucide:circle-help',
    url: '/customer/support',
  },
]
export const serviceProviderMobileNavLinks = [
  {
    label: 'Home',
    icon: 'si:home-line',
    url: '/service_provider/home',
    activeIcon: 'si:home-fill',
  },
  {
    key: 'overview',
    label: 'Overview',
    icon: 'fluent:briefcase-medical-16-regular',
    url: '/service_provider/overview',
    activeIcon: 'fluent:briefcase-medical-16-filled',
  },
  {
    label: 'bookings',
    icon: 'fluent:clipboard-settings-24-regular',
    url: '/service_provider/bookings',
    activeIcon: 'fluent:clipboard-settings-24-filled',
  },
  {
    label: 'wallet',
    icon: 'solar:wallet-outline',
    url: '/service_provider/wallet',
    activeIcon: 'solar:wallet-bold',
  },
  {
    label: 'chats',
    icon: 'material-symbols:chat-outline-rounded',
    url: '/service_provider/chats',
    activeIcon: 'material-symbols:chat-rounded',
  },
]

export const serviceProviderDesktopNavLinks = [
  {
    label: 'Home',
    icon: 'si:home-line',
    url: '/service_provider/home',
  },
  {
    key: 'overview',
    label: 'Overview',
    icon: 'fluent:briefcase-medical-20-regular',
    url: '/service_provider/overview',
  },
  {
    label: 'bookings',
    icon: 'fluent:clipboard-settings-24-regular',
    url: '/service_provider/bookings',
  },
  {
    label: 'wallet',
    icon: 'solar:wallet-outline',
    url: '/service_provider/wallet',
  },
  {
    label: 'chats',
    icon: 'material-symbols:chat-outline-rounded',
    url: '/service_provider/chats',
  },
  {
    label: 'notification',
    icon: 'lucide:bell',
    url: '/service_provider/notification',
  },
  {
    label: 'help center',
    icon: 'lucide:circle-help',
    url: '/service_provider/support',
  },
]

/* ========= TABS LIST ============ */

export const bookingsTabsList = [
  {
    status: 'In_progress',
    label: 'Ongoing',
  },
  {
    status: 'Completed',
    label: 'Completed',
  },
  {
    status: 'Cancelled',
    label: 'Cancelled',
  },
]
export const customerWalletTabsList = [
  {
    status: 'pending',
    label: 'Pending',
  },
  {
    status: 'spent',
    label: 'Spent',
  },
  {
    status: 'canceled',
    label: 'Canceled',
  },
]
export const serviceProviderWalletTabsList = [
  {
    status: 'pending',
    label: 'Pending',
  },
  {
    status: 'earned',
    label: 'Earned',
  },
  {
    status: 'canceled',
    label: 'Canceled',
  },
]

/* ======== CAROUSEL INFO ========== */

export const heroCarousel = [heroCarousel1, heroCarousel2, heroCarousel3]

export const walletActions = [
  { label: 'Send', icon: Send, path: 'send' },
  { label: 'Receive', icon: ArrowDownUp, path: 'receive' },
  { label: 'Deposit', icon: Banknote, path: 'deposit' },
  { label: 'Withdraw', icon: Wallet, path: 'withdraw' },
]

export const approvePaymentData = {
  title: 'Payment',
  section: 'Pending',
  description:
    'Payment for the service will remain pending until the service provider has successfully completed the agreed-upon task.',
  fields: ['From', 'To', 'Title', 'Amount', 'Comment'],
  buttonLabel: 'Approve',
}

export const withdrawFields = [
  {
    id: 'bank',
    label: 'Select a Bank',
    icon: Banknote,
    type: 'select',
    showChevron: true,
  },
  {
    id: 'accountNumber',
    label: 'Account Number',
    icon: User,
    type: 'text',
    showChevron: true,
  },
  {
    id: 'amount',
    label: 'Amount (NGN)',
    icon: CreditCard,
    type: 'number',
    showChevron: false,
  },
]

export const withdrawData = {
  balance: 0.0,
  minWithdraw: 1000.0,
  title: 'Withdraw Funds',
  buttonLabel: 'Withdraw',
}

export const nigerianBanks = [
  // Commercial Banks
  'Access Bank',
  'Citibank Nigeria',
  'Ecobank Nigeria',
  'Fidelity Bank',
  'First Bank of Nigeria',
  'First City Monument Bank (FCMB)',
  'Globus Bank',
  'Guaranty Trust Bank (GTBank)',
  'Heritage Bank',
  'Keystone Bank',
  'Polaris Bank',
  'Providus Bank',
  'Stanbic IBTC Bank',
  'Standard Chartered Bank',
  'Sterling Bank',
  'SunTrust Bank',
  'Titan Trust Bank',
  'Union Bank of Nigeria',
  'United Bank for Africa (UBA)',
  'Unity Bank',
  'Wema Bank',
  'Zenith Bank',

  // Digital / Fintech Banks
  'Opay',
  'PalmPay',
  'Kuda Bank',
  'Moniepoint Microfinance Bank',
  'VFD Microfinance Bank',
  'Sparkle Microfinance Bank',
  'Carbon',
  'FairMoney Microfinance Bank',
  'Eyowo',
  'ALAT by Wema',
  'Rubies Microfinance Bank',
  'Mintyn Bank',
  'One Finance (OneBank)',
  '9PSB (9 Payment Service Bank)',
  'HopePSB',
  'MoneyMaster PSB',
]

export const customerHomeNavLinks = [
  {
    url: 'posts',
    label: 'Posts',
  },
  {
    url: 'my-offers',
    label: 'My Offers',
  },
]
export const serviceProviderHomeNavLinks = [
  {
    url: 'posts',
    label: 'Posts',
  },
  {
    url: 'job-offers',
    label: 'Job Offers',
  },
]

export const providerHomeNavLinks = [
  {
    url: 'posts',
    label: 'Posts',
  },
  {
    url: 'jobs',
    label: 'Job Offers',
  },
]

export const timeFrameOptions = [
  {
    value: '1',
    label: '1 day',
  },
  {
    value: '2',
    label: '2 days',
  },
  {
    value: '3',
    label: '3 days',
  },
  {
    value: '4',
    label: '4 days',
  },
  {
    value: '5',
    label: '5 days',
  },
  {
    value: '6',
    label: '6 days',
  },
  {
    value: '7',
    label: '1 week',
  },
  {
    value: '14',
    label: '2 weeks',
  },
  {
    value: '30',
    label: '1 month',
  },
  {
    value: '365',
    label: '1 year',
  },
]

export const supportOptions = [
  {
    icon: Mail,
    text: 'Send an email',
    url: 'mailto:skills4hireofficial@gmail.com',
  },
  {
    icon: MessageCircleQuestion,
    text: 'FAQ',
    url: '/faq',
  },
  {
    icon: Phone,
    text: 'Call our help-line',
    url: 'tel:+2347073743287',
  },
]

export const aboutContactOptions = [
  {
    icon: Phone,
    text: 'Call',
    url: 'tel:+2347073743287',
  },
  {
    icon: Mail,
    text: 'Email',
    url: 'skills4hireofficial@gmail.com',
  },
]

export const socialLinks = [
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/company/skills4hire',
    Icon: FaLinkedinIn,
    bgClass: 'bg-[#0A66C2] rounded-full',
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/profile.php?id=61581913121945',
    Icon: FaFacebookF,
    bgClass: 'bg-[#1877F2] rounded-full',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/skills4hireapp?igsh=MmEyZ2EzcjRycnd1',
    Icon: FaInstagram,
    bgClass:
      'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-full',
  },
  {
    id: 'twitter',
    href: 'https://x.com/skills4hire?t=ozLzgv65G4SrNAyXAuCL7Q&s=09',
    Icon: FaXTwitter,
    bgClass: 'bg-black rounded-full',
  },
]

export const mockContacts = [
  { id: 1, name: 'Diana M.', source: 'Contacts', status: 'Invite' },
  { id: 2, name: 'Diana M.', source: 'Instagram', status: 'Accepted' },
  { id: 3, name: 'Diana M.', source: 'Instagram', status: 'Accepted' },
  { id: 4, name: 'Diana M.', source: 'Instagram', status: 'Accepted' },
]

export const serviceProviderTabList = ['about', 'gallery']

export const serviceProviderActivityTabList: ['posts', 'comments', 'media'] = [
  'posts',
  'comments',
  'media',
]

export const bookingProgress = [
  {
    number: 1,
    name: 'Date & Time',
  },
  {
    number: 2,
    name: 'Address',
  },
  {
    number: 3,
    name: 'Payment',
  },
]

export const workTypes = ['onsite', 'remote']

export const genderOptions = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
]

export const jobOffers = [
  {
    id: 1,
    name: 'Michael Chen',
    role: 'User',
    location: 'Yaba, Lagos',
    title: 'Need Plumber to Fix Leaking Tap',
    description:
      'Looking for an experienced plumber to fix a constantly dripping kitchen faucet. I would like for it to be done as quickly as possible.',
    budget: '₦15,000',
    deadline: 'This weekend',
    distanceKm: 10,
    images: [],
  },
  {
    id: 2,
    name: 'Jose Martino',
    role: 'User',
    location: 'Moniya, Ibadan',
    title: 'Electrician needed for office rewiring',
    description:
      'Looking for an electrician to handle a complete office rewiring project. Must be safety certified with prior commercial experience.',
    budget: '₦85,000',
    deadline: 'Dec 31, 2024',
    distanceKm: 18,
    images: [Rect20, Rect21],
  },
]

export const nigeriaLocations: Record<string, string[]> = {
  Abia: [
    'Aba North',
    'Aba South',
    'Arochukwu',
    'Bende',
    'Ikwuano',
    'Isiala Ngwa North',
    'Isiala Ngwa South',
    'Isuikwuato',
    'Obi Nwa',
    'Ohafia',
    'Osisioma',
    'Ugwunagbo',
    'Ukwa East',
    'Ukwa West',
    'Umuahia North',
    'Umuahia South',
    'Umu-Neochi',
  ],
  Adamawa: [
    'Demsa',
    'Fufore',
    'Ganye',
    'Girei',
    'Gombi',
    'Guyuk',
    'Hong',
    'Jada',
    'Lamurde',
    'Madagali',
    'Maiha',
    'Mayo Belwa',
    'Michika',
    'Mubi North',
    'Mubi South',
    'Numan',
    'Shelleng',
    'Song',
    'Toungo',
    'Yola North',
    'Yola South',
  ],
  AkwaIbom: [
    'Abak',
    'Eastern Obolo',
    'Eket',
    'Esit Eket',
    'Essien Udim',
    'Etim Ekpo',
    'Etinan',
    'Ibeno',
    'Ibesikpo Asutan',
    'Ibiono-Ibom',
    'Ikot Abasi',
    'Ikot Ekpene',
    'Ini',
    'Itu',
    'Mbo',
    'Mkpat Enin',
    'Nsit Atai',
    'Nsit Ibom',
    'Nsit Ubium',
    'Obot Akara',
    'Okobo',
    'Onna',
    'Oron',
    'Oruk Anam',
    'Udung Uko',
    'Ukanafun',
    'Uruan',
    'Urue-Offong/Oruko',
    'Uyo',
  ],
  Anambra: [
    'Aguata',
    'Anambra East',
    'Anambra West',
    'Anaocha',
    'Awka North',
    'Awka South',
    'Ayamelum',
    'Dunukofia',
    'Ekwusigo',
    'Idemili North',
    'Idemili South',
    'Ihiala',
    'Njikoka',
    'Nnewi North',
    'Nnewi South',
    'Ogbaru',
    'Onitsha North',
    'Onitsha South',
    'Orumba North',
    'Orumba South',
    'Oyi',
  ],
  Bauchi: [
    'Bauchi',
    'Bogoro',
    'Darazo',
    'Dass',
    'Gamawa',
    'Ganjuwa',
    'Giade',
    'Itas/Gadau',
    "Jama'are",
    'Katagum',
    'Shira',
    'Tafawa Balewa',
    'Toro',
    'Warji',
    'Zaki',
  ],
  Bayelsa: [
    'Brass',
    'Ekeremor',
    'Kolokuma/Opokuma',
    'Nembe',
    'Ogbia',
    'Sagbama',
    'Southern Ijaw',
    'Yenagoa',
  ],
  Benue: [
    'Ado',
    'Agatu',
    'Apa',
    'Buruku',
    'Gboko',
    'Guma',
    'Gwer East',
    'Gwer West',
    'Katsina-Ala',
    'Konshisha',
    'Kwande',
    'Logo',
    'Makurdi',
    'Obi',
    'Ogbadibo',
    'Oju',
    'Okpokwu',
    'Otukpo',
    'Tarka',
    'Ukum',
    'Ushongo',
    'Vandeikya',
  ],
  Borno: [
    'Abadam',
    'Bama',
    'Bayo',
    'Biu',
    'Chibok',
    'Damboa',
    'Dikwa',
    'Gubio',
    'Guzamala',
    'Gwoza',
    'Hawul',
    'Jere',
    'Kaga',
    'Kala/Balge',
    'Konduga',
    'Kukawa',
    'Kwaya Kusar',
    'Mafa',
    'Magumeri',
    'Maiduguri',
    'Marte',
    'Mobbar',
    'Monguno',
    'Ngala',
    'Nganzai',
    'Shani',
  ],
  CrossRiver: [
    'Akpabuyo',
    'Odukpani',
    'Bekwarra',
    'Biase',
    'Boki',
    'Calabar Municipal',
    'Calabar South',
    'Etung',
    'Ikom',
    'Obanliku',
    'Obubra',
    'Obudu',
    'Ogoja',
    'Yakuur',
    'Yala',
  ],
  Delta: [
    'Aniocha North',
    'Aniocha South',
    'Bomadi',
    'Burutu',
    'Ethiope East',
    'Ethiope West',
    'Ika North East',
    'Ika South',
    'Isoko North',
    'Isoko South',
    'Ndokwa East',
    'Ndokwa West',
    'Okpe',
    'Oshimili North',
    'Oshimili South',
    'Patani',
    'Sapele',
    'Udu',
    'Ughelli North',
    'Ughelli South',
    'Ukwuani',
    'Uvwie',
    'Warri North',
    'Warri South',
    'Warri South West',
  ],
  Ebonyi: [
    'Abakaliki',
    'Afikpo North',
    'Afikpo South',
    'Ebonyi',
    'Ezza North',
    'Ezza South',
    'Ikwo',
    'Ishielu',
    'Ivo',
    'Izzi',
    'Ohaozara',
    'Ohaukwu',
    'Onicha',
  ],
  Edo: [
    'Akoko-Edo',
    'Egor',
    'Esan Central',
    'Esan North-East',
    'Esan South-East',
    'Esan West',
    'Etsako Central',
    'Etsako East',
    'Etsako West',
    'Igueben',
    'Ikpoba-Okha',
    'Oredo',
    'Orhionmwon',
    'Ovia North-East',
    'Ovia South-West',
    'Owan East',
    'Owan West',
    'Uhunmwonde',
  ],
  Ekiti: [
    'Ado Ekiti',
    'Efon',
    'Ekiti East',
    'Ekiti South-West',
    'Ekiti West',
    'Emure',
    'Gbonyin',
    'Ido-Osi',
    'Ijero',
    'Ikere',
    'Ikole',
    'Ilejemeje',
    'Irepodun/Ifelodun',
    'Ise/Orun',
    'Moba',
    'Oye',
  ],
  Enugu: [
    'Aninri',
    'Awgu',
    'Enugu East',
    'Enugu North',
    'Enugu South',
    'Ezeagu',
    'Igbo Etiti',
    'Igbo Eze North',
    'Igbo Eze South',
    'Isi Uzo',
    'Nkanu East',
    'Nkanu West',
    'Nsukka',
    'Oji River',
    'Udenu',
    'Udi',
    'Uzo Uwani',
  ],
  Gombe: [
    'Akko',
    'Balanga',
    'Billiri',
    'Dukku',
    'Funakaye',
    'Gombe',
    'Kaltungo',
    'Kwami',
    'Nafada',
    'Shongom',
    'Yamaltu/Deba',
  ],
  Imo: [
    'Aboh Mbaise',
    'Ahiazu Mbaise',
    'Ehime Mbano',
    'Ezinihitte',
    'Ideato North',
    'Ideato South',
    'Ihitte/Uboma',
    'Ikeduru',
    'Isiala Mbano',
    'Isu',
    'Mbaitoli',
    'Ngor Okpala',
    'Njaba',
    'Nkwerre',
    'Nwangele',
    'Obowo',
    'Oguta',
    'Ohaji/Egbema',
    'Okigwe',
    'Orlu',
    'Orsu',
    'Oru East',
    'Oru West',
    'Owerri Municipal',
    'Owerri North',
    'Owerri West',
  ],
  Jigawa: [
    'Auyo',
    'Babura',
    'Biriniwa',
    'Birnin Kudu',
    'Buji',
    'Dutse',
    'Gagarawa',
    'Garki',
    'Gumel',
    'Guri',
    'Gwaram',
    'Gwiwa',
    'Hadejia',
    'Jahun',
    'Kafin Hausa',
    'Kaugama',
    'Kazaure',
    'Kiri Kasama',
    'Kiyawa',
    'Maigatari',
    'Malam Madori',
    'Miga',
    'Ringim',
    'Roni',
    'Sule Tankarkar',
    'Taura',
    'Yankwashi',
  ],
  Kaduna: [
    'Birnin Gwari',
    'Chikun',
    'Giwa',
    'Igabi',
    'Ikara',
    'Jaba',
    "Jema'a",
    'Kachia',
    'Kaduna North',
    'Kaduna South',
    'Kagarko',
    'Kajuru',
    'Kaura',
    'Kauru',
    'Kubau',
    'Kudan',
    'Lere',
    'Makarfi',
    'Sabon Gari',
    'Sanga',
    'Soba',
    'Zangon Kataf',
    'Zaria',
  ],
  Kano: [
    'Ajingi',
    'Albasu',
    'Bagwai',
    'Bebeji',
    'Bichi',
    'Bunkure',
    'Dala',
    'Dambatta',
    'Dawakin Kudu',
    'Dawakin Tofa',
    'Doguwa',
    'Fagge',
    'Gabasawa',
    'Garko',
    'Garum',
    'Mallam',
    'Gaya',
    'Gezawa',
    'Gwale',
    'Gwarzo',
    'Kabo',
    'Kano Municipal',
    'Karaye',
    'Kibiya',
    'Kiru',
    'Kumbotso',
    'Kunchi',
    'Kura',
    'Madobi',
    'Makoda',
    'Minjibir',
    'Nasarawa',
    'Rano',
    'Rimin Gado',
    'Rogo',
    'Shanono',
    'Sumaila',
    'Takai',
    'Tarauni',
    'Tofa',
    'Tsanyawa',
    'Tudun Wada',
    'Ungogo',
    'Warawa',
    'Wudil',
  ],
  Katsina: [
    'Bakori',
    'Batagarawa',
    'Batsari',
    'Baure',
    'Bindawa',
    'Charanchi',
    'Dandume',
    'Danja',
    'Daura',
    'Dutsi',
    'Dutsin Ma',
    'Faskari',
    'Funtua',
    'Ingawa',
    'Jibia',
    'Kafur',
    'Kaita',
    'Kankia',
    'Kankara',
    'Kasarawa',
    'Katsina',
    'Kurfi',
    'Kusada',
    'Mai Adua',
    'Malumfashi',
    'Mani',
    'Mashi',
    'Matazu',
    'Musawa',
    'Rimi',
    'Sabuwa',
    'Safana',
    'Sandamu',
    'Zango',
  ],
  Kebbi: [
    'Aleiro',
    'Arewa Dandi',
    'Argungu',
    'Augie',
    'Bagudo',
    'Birnin Kebbi',
    'Bunza',
    'Dandi',
    'Fakai',
    'Gwandu',
    'Jega',
    'Kalgo',
    'Koko/Besse',
    'Maiyama',
    'Ngaski',
    'Sakaba',
    'Shanga',
    'Suru',
    'Wasagu/Danko',
    'Yauri',
    'Zuru',
  ],
  Kogi: [
    'Adavi',
    'Ajaokuta',
    'Ankpa',
    'Bassa',
    'Dekina',
    'Ibaji',
    'Idah',
    'Igalamela-Odolu',
    'Ijumu',
    'Kabba/Bunu',
    'Kogi',
    'Lokoja',
    'Mopa-Muro',
    'Ofu',
    'Ogori/Magongo',
    'Okehi',
    'Okene',
    'Olamaboro',
    'Omala',
    'Yagba East',
    'Yagba West',
  ],
  Kwara: [
    'Asa',
    'Baruten',
    'Edu',
    'Ekiti Kwara',
    'Ifelodun',
    'Ilorin East',
    'Ilorin South',
    'Ilorin West',
    'Irepodun',
    'Isin',
    'Kaiama',
    'Moro',
    'Offa',
    'Oke Ero',
    'Oyun',
    'Pategi',
  ],
  Lagos: [
    'Agege',
    'Ajeromi-Ifelodun',
    'Alimosho',
    'Amuwo-Odofin',
    'Apapa',
    'Badagry',
    'Epe',
    'Eti-Osa',
    'Ibeju-Lekki',
    'Ifako-Ijaiye',
    'Ikeja',
    'Ikorodu',
    'Kosofe',
    'Lagos Island',
    'Lagos Mainland',
    'Mushin',
    'Ojo',
    'Oshodi-Isolo',
    'Shomolu',
    'Surulere',
  ],
  Nasarawa: [
    'Akwanga',
    'Awe',
    'Doma',
    'Karu',
    'Keana',
    'Keffi',
    'Kokona',
    'Lafia',
    'Nasarawa',
    'Nasarawa Egon',
    'Obi',
    'Toto',
    'Wamba',
  ],
  Niger: [
    'Agaie',
    'Agwara',
    'Bida',
    'Borgu',
    'Bosso',
    'Chanchaga',
    'Edati',
    'Gbako',
    'Gurara',
    'Katcha',
    'Kontagora',
    'Lapai',
    'Lavun',
    'Magama',
    'Mariga',
    'Mashegu',
    'Mokwa',
    'Moya',
    'Paikoro',
    'Rafi',
    'Rijau',
    'Shiroro',
    'Suleja',
    'Tafa',
    'Wushishi',
  ],
  Ogun: [
    'Abeokuta North',
    'Abeokuta South',
    'Ado-Odo/Ota',
    'Egbado North',
    'Egbado South',
    'Ewekoro',
    'Ifo',
    'Ijebu East',
    'Ijebu North',
    'Ijebu North East',
    'Ijebu Ode',
    'Ikenne',
    'Imeko Afon',
    'Ipokia',
    'Obafemi Owode',
    'Odeda',
    'Odogbolu',
    'Ogun Waterside',
    'Remo North',
    'Shagamu',
  ],
  Ondo: [
    'Akoko North-East',
    'Akoko North-West',
    'Akoko South-East',
    'Akoko South-West',
    'Akure North',
    'Akure South',
    'Ese-Odo',
    'Idanre',
    'Ifedore',
    'Ilaje',
    'Ile-Oluji/Okeigbo',
    'Irele',
    'Odigbo',
    'Okitipupa',
    'Ondo East',
    'Ondo West',
    'Ose',
    'Owo',
  ],
  Osun: [
    'Aiyedade',
    'Aiyedire',
    'Atakunmosa East',
    'Atakunmosa West',
    'Boluwaduro',
    'Boripe',
    'Ede North',
    'Ede South',
    'Egbedore',
    'Ejigbo',
    'Ife Central',
    'Ife East',
    'Ife North',
    'Ife South',
    'Ifedayo',
    'Ifelodun',
    'Ila',
    'Ilesa East',
    'Ilesa West',
    'Irepodun',
    'Irewole',
    'Isokan',
    'Iwo',
    'Obokun',
    'Odo-Otin',
    'Ola Oluwa',
    'Olorunda',
    'Oriade',
    'Orolu',
    'Osogbo',
  ],
  Oyo: [
    'Afijio',
    'Akinyele',
    'Atiba',
    'Atisbo',
    'Egbeda',
    'Ibadan North',
    'Ibadan North-East',
    'Ibadan North-West',
    'Ibadan South-East',
    'Ibadan South-West',
    'Ibarapa Central',
    'Ibarapa East',
    'Ibarapa North',
    'Ido',
    'Irepo',
    'Iseyin',
    'Itesiwaju',
    'Iwajowa',
    'Kajola',
    'Lagelu',
    'Ogbomosho North',
    'Ogbomosho South',
    'Ogo Oluwa',
    'Olorunsogo',
    'Oluyole',
    'Ona Ara',
    'Orelope',
    'Ori Ire',
    'Oyo East',
    'Oyo West',
    'Saki East',
    'Saki West',
    'Surulere',
  ],
  Plateau: [
    'Barkin Ladi',
    'Bassa',
    'Bokkos',
    'Jos East',
    'Jos North',
    'Jos South',
    'Kanam',
    'Kanke',
    'Langtang North',
    'Langtang South',
    'Mangu',
    'Mikang',
    'Pankshin',
    "Qua'an Pan",
    'Riyom',
    'Shendam',
    'Wase',
  ],
  Rivers: [
    'Abua/Odual',
    'Ahoada East',
    'Ahoada West',
    'Akuku Toru',
    'Andoni',
    'Asari-Toru',
    'Bonny',
    'Degema',
    'Eleme',
    'Emohua',
    'Etche',
    'Gokana',
    'Ikwerre',
    'Khana',
    'Obio/Akpor',
    'Ogba/Egbema/Ndoni',
    'Ogu/Bolo',
    'Okrika',
    'Omuma',
    'Opobo/Nkoro',
    'Oyigbo',
    'Port Harcourt',
    'Tai',
  ],
  Sokoto: [
    'Binji',
    'Bodinga',
    'Dange Shuni',
    'Gada',
    'Goronyo',
    'Gudu',
    'Gwadabawa',
    'Illela',
    'Isa',
    'Kebbe',
    'Kware',
    'Rabah',
    'Sabon Birni',
    'Shagari',
    'Sokoto North',
    'Sokoto South',
    'Tambuwal',
    'Tangaza',
    'Tureta',
    'Wamako',
    'Wurno',
    'Yabo',
  ],
  Taraba: [
    'Ardo Kola',
    'Bali',
    'Donga',
    'Gashaka',
    'Gassol',
    'Ibi',
    'Jalingo',
    'Karim Lamido',
    'Kassol',
    'Kurmi',
    'Lau',
    'Sardauna',
    'Takum',
    'Ussa',
    'Wukari',
    'Yorro',
    'Zing',
  ],
  Yobe: [
    'Bade',
    'Bursari',
    'Damaturu',
    'Fika',
    'Fune',
    'Gujba',
    'Gulani',
    'Jakusko',
    'Karasuwa',
    'Machina',
    'Nangere',
    'Nguru',
    'Potiskum',
    'Tarmuwa',
    'Yunusari',
    'Yusufari',
  ],
  Zamfara: [
    'Anka',
    'Bakura',
    'Birnin Magaji/Kiyaw',
    'Bukkuyum',
    'Bungudu',
    'Gummi',
    'Gusau',
    'Kaura Namoda',
    'Maradun',
    'Maru',
    'Shinkafi',
    'Talata Mafara',
    'Chafe',
    'Zurmi',
  ],

  FCT: ['Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Abuja Municipal'],
}

export const providerOverviewData = {
  user: {
    name: 'Joshua Friday',
    role: 'Plumber',
    commission: '2%',
  },
  stats: [
    { label: 'Total Booking', value: 0, icon: BookOpen },
    { label: 'Total Service', value: 0, icon: User },
    { label: 'Total Earning', value: '₦0.00', icon: Wallet },
    { label: 'Wallet', value: 0, icon: Wallet },
  ],
  chart: [
    { name: 'Jan', revenue: 300000 },
    { name: 'Feb', revenue: 150000 },
    { name: 'Mar', revenue: 200000 },
    { name: 'Apr', revenue: 0 },
    { name: 'May', revenue: 0 },
    { name: 'Jun', revenue: 0 },
    { name: 'Jul', revenue: 0 },
    { name: 'Aug', revenue: 0 },
    { name: 'Sep', revenue: 0 },
    { name: 'Oct', revenue: 0 },
    { name: 'Nov', revenue: 0 },
    { name: 'Dec', revenue: 0 },
  ],
  newBookingRequest: {
    title: 'Booking Request',
    icon: MessageSquare,
    requests: [
      {
        id: '01',
        name: 'Joshua Friday',
        avatar: JoshuaFridayBG,
        status: 'Pending',
        service: 'Plumbing',
        price: 20000,
        address: 'No 19, IyeruOkin Street, Tanke, Ilorin',
        date: Date.now(),
        time: Date.now(),
      },
      {
        id: '02',
        name: 'Mary Praise',
        avatar: MaryPraise,
        status: 'Accepted',
        service: 'Plumbing',
        price: 20000,
        address: 'No 18, IyeruOkin Street, Tanke, Ilorin',
        date: Date.now(),
        time: Date.now(),
      },
    ],
  },
  reviews: [
    {
      id: '1',
      name: 'Joshua Friday',
      rating: 4,
      image: '',
      createdAt: Date.now(),
      comment: 'Awesome work. Thank you so much.',
    },
    {
      id: '2',
      name: 'Joshua Friday',
      rating: 3,
      image: '',
      createdAt: Date.now(),
      comment: 'Fast and professional.',
    },
  ],
}

export const serviceProviderProfileRegistrationSteps = [
  {
    title: 'personal information',
    desc: 'Your full name, email, phone number, and address',
    url: 'personal-information',
  },
  {
    title: 'experience',
    desc: 'Enter your professional experience to be considered by clients',
    url: 'experience',
  },
  {
    title: 'application profile',
    desc: 'Build your job profile to gain recognition by clients',
    url: 'application-profile',
  },
]

export const certificationOptions = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]
export const services = [
  {
    label: 'Plumbing',
    value: 'plumbing',
  },
  {
    label: 'Baking',
    value: 'baking',
  },
  {
    label: 'Vulcanizer',
    value: 'vulcanizer',
  },
  {
    label: 'Mobile App Development',
    value: 'mobile app development',
  },
]
export const yearsOfExperience = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: '6',
    value: '6',
  },
  {
    label: '7',
    value: '7',
  },
  {
    label: '8',
    value: '8',
  },
  {
    label: '9',
    value: '9',
  },
  {
    label: '10',
    value: '10',
  },
  {
    label: '10+',
    value: '10 above',
  },
]

export const requests = [
  {
    id: '01',
    name: 'Joshua Friday',
    avatar: JoshuaFridayBG,
    status: 'Pending',
    service: 'Plumbing',
    price: 20000,
    address: 'No 19, IyeruOkin Street, Tanke, Ilorin',
    date: Date.now(),
    time: Date.now(),
  },
  {
    id: '02',
    name: 'Mary Praise',
    avatar: MaryPraise,
    status: 'Accepted',
    service: 'Plumbing',
    price: 20000,
    address: 'No 18, IyeruOkin Street, Tanke, Ilorin',
    date: Date.now(),
    time: Date.now(),
  },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services', sectionId: 'services' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/#faqs', sectionId: 'faqs' },
  { label: 'Contact Us', href: '/#contact', sectionId: 'contact' },
]

export const footerLinks = [
  {
    heading: 'quick links',
    links: [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'About',
        url: '/about',
      },
      {
        label: 'Blog',
        url: '/blog',
      },
    ],
  },
  {
    heading: 'Contact Information',
    links: [
      {
        label: 'Email: support@skills4hireapp.com',
        url: 'mailto:support@skills4hireapp.com',
      },
      {
        label: 'Phone: +234-707-374-3287',
        url: 'tel:+2347073743287',
      },
    ],
  },
  {
    heading: 'legal',
    links: [
      {
        label: 'Privacy Policy',
        url: '/legal?type=privacy-policy',
      },
      {
        label: 'Terms & Conditions',
        url: '/legal?type=terms-conditions',
      },
    ],
  },
]

export const contact = [
  {
    label: 'email',
    text: 'support@skills4hireapp.com',
    url: 'mailto:support@skills4hireapp.com',
    icon: Mail,
  },
  {
    label: 'phone number',
    text: '+234-707-374-3287',
    url: 'tel:+2347073743287',
    icon: Phone,
  },
]

export const faqs = [
  {
    trigger: 'How do I hire a provider on Skills4Hire?',
    desc1: 'Hiring on Skills4Hire is simple and secure.',
    desc2:
      'Browse service categories or search for a skill, view the providers profile, compare reviews and prices, then book a provider directly through the platform. You can also post a job with your budget and let skilled providers reach out to you. Once you agree, make payment in-app and the job begins.',
  },
  {
    trigger: 'How are providers verified?',
    desc1:
      'All service providers on Skills4Hire go through a verification process before they can accept jobs.',
    desc2:
      'This includes identity verification, contact confirmation, skill review, and ongoing performance checks based on ratings and completed jobs. This ensures you’re hiring trusted professionals and enjoying the safest way to hire.',
  },
  {
    trigger: 'What services are available on Skills4Hire?',
    desc1:
      'Skills4Hire offers both vocational and digital services in one platform.',
    desc2:
      'Available services include (but are not limited to): Cleaning, Plumbing, Electrical, HVAC & Handyman services, Carpentry, Painting, Lawn Care & Pest Control, Automobile & Appliance Repair. Hairdressing, Barbering, Makeup, Nail Care & Massage, Fitness Training, Photography & Videography.',
    desc3:
      'Also with Digital services like Design, Tech, Marketing, Writing, and more',
  },
  {
    trigger: 'How are payments handled?',
    desc1: 'Payments on Skills4Hire are handled securely through the platform.',
    desc2:
      'Customers pay upfront, and funds are safely held until the service is completed. Once the job is confirmed as done, the provider gets paid. This protects both customers and service providers and prevents payment disputes or scams.',
  },
  {
    trigger: 'Is there a fee for using Skills4Hire?',
    desc1: 'Creating an account and browsing services on Skills4Hire is free.',
    desc2:
      'But the service providers are charged a small service fee only when a job is successfully completed. This fee helps us maintain platform security, verification, customer support, and continuous improvement of the service.',
  },
]

export const blogCategories = [
  {
    label: 'View all',
    value: 'all',
  },
  {
    label: 'Articles',
    value: 'articles',
  },
  {
    label: 'Resources',
    value: 'resources',
  },
  {
    label: 'News',
    value: 'news',
  },
]

export const features = [
  {
    icon: 'stash:badge-verified-solid',
    title: 'Verified Providers',
    desc: 'Every professional on Skills4Hire goes through a verification process, giving you peace of mind that you’re connecting with trusted providers who are qualified and reliable.',
  },
  {
    icon: 'mingcute:bank-card-fill',
    title: 'Proof of Work',
    desc: 'Unlike other platforms, Skills4Hire uses social feeds as living portfolios, where providers share real projects, updates, and results so you see their work before you hire.',
  },
  {
    icon: 'ic:baseline-work',
    title: 'Secure Payments',
    desc: 'All payments are handled safely within the platform, protecting both customers and providers. No risks, no scams just fast, transparent transactions you can trust.',
  },
]

export const carouselServices = [
  {
    image: webDevelopment,
    text: 'Web development',
  },
  {
    image: projectManagement,
    text: 'Project Management',
  },
  {
    image: fitnessTraining,
    text: 'Fitness Training',
  },
  {
    image: dataAnalysis,
    text: 'Data Analysis',
  },
  {
    image: hairDressing,
    text: 'Hairdressing',
  },
  {
    image: graphicDesign,
    text: 'Graphic Design',
  },
  {
    image: digitalMarketing,
    text: 'Digital Marketing',
  },
  {
    image: cybersecurity,
    text: 'Cybersecurity',
  },
  {
    image: carpentry,
    text: 'Carpentry',
  },
  {
    image: motionGraphics,
    text: 'Motion Graphics',
  },
  {
    image: electrical,
    text: 'Electrical',
  },
  {
    image: devops,
    text: 'DevOps',
  },
  {
    image: plumbing,
    text: 'Plumbing',
  },
  {
    image: videoEditing,
    text: 'Video Editing',
  },
  {
    image: cleaning,
    text: 'Cleaning',
  },
]

export const howItWorks = {
  customer: [
    'Register',
    'Create an offer or book a provider directly',
    'Pay securely',
  ],
  provider: [
    'Register as a service provider',
    'Set-up your profile',
    'Post your skill',
    'Get booked',
  ],
  platform: [
    'All service categories',
    "Visibility for the service providers and customer's offer",
    'Job offers',
    'Transparency',
  ],
}

export const searchCategories = [
  {
    label: 'Posts',
    value: 'post',
  },
  {
    label: 'Providers',
    value: 'providers',
  },
  {
    label: 'Offers',
    value: 'offers',
  },
]
export const searchFilters = [
  {
    label: 'Services',
    value: 'services',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Rating',
    value: 'rating',
  },
]

export const serviceTypes = [
  {
    value: 'webDevelopment',
    label: 'Web development',
  },
  {
    value: 'projectManagement',
    label: 'Project Management',
  },
  {
    value: 'fitnessTraining',
    label: 'Fitness Training',
  },
  {
    value: 'dataAnalysis',
    label: 'Data Analysis',
  },
  {
    value: 'hairDressing',
    label: 'Hairdressing',
  },
  {
    value: 'graphicDesign',
    label: 'Graphic Design',
  },
  {
    value: 'digitalMarketing',
    label: 'Digital Marketing',
  },
  {
    value: 'cybersecurity',
    label: 'Cybersecurity',
  },
  {
    value: 'carpentry',
    label: 'Carpentry',
  },
  {
    value: 'motionGraphics',
    label: 'Motion Graphics',
  },
  {
    value: 'electrical',
    label: 'Electrical',
  },
  {
    value: 'devops',
    label: 'DevOps',
  },
  {
    value: 'plumbing',
    label: 'Plumbing',
  },
  {
    value: 'videoEditing',
    label: 'Video Editing',
  },
  {
    value: 'cleaning',
    label: 'Cleaning',
  },
  {
    value: 'mobileAppDevelopment',
    label: 'Mobile App Development',
  },
]
