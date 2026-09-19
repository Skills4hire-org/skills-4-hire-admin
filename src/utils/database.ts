import servicesImage1 from '../assets/Rectangle 18.png'
import servicesImage2 from '../assets/Rectangle 19.png'
import servicesAroundImage1 from '../assets/JoshuaBarber.png'
import servicesAroundImage2 from '../assets/MaryPraise.png'
import AdminProfile from '../assets/Admin profile.jpg'
import AdminElect from '../assets/Admin-Elect.png'
import Rect18 from '../assets/Rectangle 18.png'
import Rect19 from '../assets/Rectangle 19.png'

export const user = {
  profileImage: servicesAroundImage1,
  firstName: 'Leo',
  lastName: 'Justin',
  email: 'joshuafriday@gmail.com',
  verified: true,
  service: 'plumber',
  rating: 4,
  totalReviews: 120,
  address: '2, Gandi Street, Ikorodu, Lagos',
  availableBalance: 77000,
  savedAddresses: ['2, Gandi Street, Ikorodu, Lagos'],
  phone: '08123456789',
  gender: 'male',
  favorites: [
    {
      id: 1,
      name: 'Joshua Friday',
      online: true,
      occupation: 'barber',
      verified: true,
      desc: 'Men and Kids Ultimate grooming Hair',
      features: 'Efficient and Reliable',
      minCharge: 800,
      averageRating: 4.8,
      totalReviews: 12,
      image: servicesAroundImage1,
      favorite: true,
      maxCharge: 90000,
      address: 'No.19 IyeruOkin Street, Tanke Ilorin',
      totalJobs: 20,
      about:
        'We provide reliable, high-quality plumbing services tailored to meet your needs. From repairs and installations to maintenance and emergency services, our experienced team ensures efficient and long-lasting solutions. We take pride in our professionalism, prompt response, and commitment to customer satisfaction. Whether it’s a leaky faucet, clogged drain, or a full plumbing system installation, we’ve got you covered.',
      gallery: null,
      posts: [
        {
          profile: AdminProfile,
          name: 'Michael Chen',
          location: 'Lagos',
          service: 'Plumbing Services',
          rating: '4.9',
          reviews: '234',
          title: 'Affordable plumbing services',
          description:
            'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
          tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
          stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
        },
      ],
      postImages: [servicesAroundImage1, servicesAroundImage2],
      services: [
        {
          id: 1,
          image: servicesImage1,
          desc: 'Fixing leaks (pipes, faucets)',
          price: 25000,
        },
        {
          id: 2,
          image: servicesImage1,
          desc: 'Fixing leaks (pipes, faucets)',
          price: 20000,
        },
      ],
      comments: [],
      accountNumber: '1234567890',
    },
    {
      id: 2,
      name: 'Joshua Friday',
      online: true,
      occupation: 'barber',
      verified: true,
      desc: 'Men and Kids Ultimate grooming Hair',
      features: 'Efficient and Reliable',
      minCharge: 800,
      averageRating: 4.8,
      totalReviews: 12,
      image: servicesAroundImage1,
      favorite: true,
      maxCharge: 90000,
      address: 'No.19 IyeruOkin Street, Tanke Ilorin',
      totalJobs: 20,
      about:
        'We provide reliable, high-quality plumbing services tailored to meet your needs. From repairs and installations to maintenance and emergency services, our experienced team ensures efficient and long-lasting solutions. We take pride in our professionalism, prompt response, and commitment to customer satisfaction. Whether it’s a leaky faucet, clogged drain, or a full plumbing system installation, we’ve got you covered.',
      gallery: null,
      posts: [
        {
          profile: AdminProfile,
          name: 'Michael Chen',
          location: 'Lagos',
          service: 'Plumbing Services',
          rating: '4.9',
          reviews: '234',
          title: 'Affordable plumbing services',
          description:
            'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
          tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
          stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
        },
      ],
      postImages: [servicesAroundImage1, servicesAroundImage2],
      services: [
        {
          id: 1,
          image: servicesImage1,
          desc: 'Fixing leaks (pipes, faucets)',
          price: 25000,
        },
        {
          id: 2,
          image: servicesImage1,
          desc: 'Fixing leaks (pipes, faucets)',
          price: 20000,
        },
      ],
      comments: [],
      accountNumber: '1234567890',
    },
  ],
  reviews: [
    {
      id: '1',
      name: 'Joshua Friday',
      role: 'Barber',
      createdAt: Date.now(),
      image: servicesAroundImage1,
      rating: 4,
      comment: 'Good service. I love it.',
    },
    {
      id: '2',
      name: 'Joshua Friday',
      role: 'Barber',
      createdAt: Date.now(),
      image: servicesAroundImage1,
      rating: 4,
      comment: 'Good service. I love it.',
    },
  ],
  serviceProviderInfo: {
    id: 1,
    name: 'Joshua Friday',
    online: true,
    occupation: 'barber',
    verified: true,
    desc: 'Men and Kids Ultimate grooming Hair',
    features: 'Efficient and Reliable',
    minCharge: 800,
    averageRating: 4.8,
    totalReviews: 12,
    image: servicesAroundImage1,
    favorite: true,
    maxCharge: 90000,
    address: 'No.19 IyeruOkin Street, Tanke Ilorin',
    totalJobs: 20,
    about: '',
    gallery: [Rect18, Rect19],
    posts: [
      {
        id: 1,
        profile: AdminProfile,
        name: 'Michael Chen',
        location: 'Lagos',
        service: 'Plumbing Services',
        rating: '4.9',
        reviews: '234',
        title: 'Affordable plumbing services',
        description:
          'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
        tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
        stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
      },
    ],
    postImages: [servicesAroundImage1, servicesAroundImage2],
    services: [
      {
        id: '1',
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 25000,
      },
      {
        id: '2',
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
    ],
    comments: [],
    accountNumber: '1234567890',
  },
}

export const availableServices = [
  {
    serviceImage: servicesImage1,
    serviceName: 'cleaning service',
    category: 'vocational & on-site services',
  },
  {
    serviceImage: servicesImage2,
    serviceName: 'mobile app development',
    category: 'digital skills & online services',
  },
  {
    serviceImage: servicesImage1,
    serviceName: 'electrical service',
    category: 'vocational & on-site services',
  },
  {
    serviceImage: servicesImage2,
    serviceName: 'plumbing service',
    category: 'vocational & on-site services',
  },
  {
    serviceImage: servicesImage1,
    serviceName: 'cleaning services',
    category: 'vocational & on-site services',
  },
  {
    serviceImage: servicesImage2,
    serviceName: 'cleaning services',
    category: 'vocational & on-site services',
  },
]

export const serviceAround = [
  {
    id: 1,
    name: 'Joshua Friday',
    online: true,
    occupation: 'barber',
    verified: true,
    desc: 'Men and Kids Ultimate grooming Hair',
    features: 'Efficient and Reliable',
    minCharge: 800,
    averageRating: 0,
    totalReviews: 12,
    image: servicesAroundImage1,
    favorite: true,
    maxCharge: 90000,
    address: 'No.19 IyeruOkin Street, Tanke Ilorin',
    totalJobs: 0,
    about: '',
    gallery: null,
    posts: null,
    /*  [
      {
        id: 1,
        profile: AdminProfile,
        name: 'Michael Chen',
        location: 'Lagos',
        service: 'Plumbing Services',
        rating: '4.9',
        reviews: '234',
        title: 'Affordable plumbing services',
        description:
          'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
        tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
        stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
      },
    ], */
    postImages: null,
    images: null,
    /* [servicesAroundImage1, servicesAroundImage2], */
    services: null,
    /* [
      {
        id: 1,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 25000,
      },
      {
        id: 2,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
    ] */
    comments: null,
    accountNumber: '1234567890',
  },
  {
    id: 2,
    name: 'Joshua Friday',
    online: true,
    occupation: 'barber',
    verified: true,
    desc: 'Men and Kids Ultimate grooming Hair',
    features: 'Efficient and Reliable',
    minCharge: 700,
    averageRating: 4.8,
    totalReviews: 12,
    image: servicesAroundImage2,
    favorite: false,
    maxCharge: 50000,
    address: 'No.19 IyeruOkin Street, Tanke Ilorin',
    totalJobs: 10,
    about:
      'We provide reliable, high-quality plumbing services tailored to meet your needs. From repairs and installations to maintenance and emergency services, our experienced team ensures efficient and long-lasting solutions. We take pride in our professionalism, prompt response, and commitment to customer satisfaction. Whether it’s a leaky faucet, clogged drain, or a full plumbing system installation, we’ve got you covered.',
    gallery: [Rect18, Rect19],
    posts: [
      {
        id: 1,
        profile: AdminProfile,
        name: 'Michael Chen',
        location: 'Lagos',
        service: 'Plumbing Services',
        rating: '4.9',
        reviews: '234',
        title: 'Affordable plumbing services',
        description:
          'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
        tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
        stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
      },
      {
        id: 2,
        profile: AdminProfile,
        name: 'Michael Chen',
        location: 'Lagos',
        service: 'Plumbing Services',
        rating: '4.9',
        reviews: '234',
        title: 'Affordable plumbing services',
        description:
          'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
        tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
        stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
      },
      {
        id: 3,
        profile: AdminProfile,
        name: 'Michael Chen',
        location: 'Lagos',
        service: 'Plumbing Services',
        rating: '4.9',
        reviews: '234',
        title: 'Affordable plumbing services',
        description:
          'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
        tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
        stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
      },
    ],
    postImages: [Rect18, Rect19],
    images: [Rect18, Rect19],
    services: [
      {
        id: 1,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 25000,
      },
      {
        id: 2,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
      {
        id: 3,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
      {
        id: 4,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
      {
        id: 5,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
      {
        id: 6,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
      {
        id: 7,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
      {
        id: 8,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
      {
        id: 9,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
      {
        id: 10,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
      {
        id: 11,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
      {
        id: 12,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
    ],
    comments: [
      {
        name: 'Joshua Friday',
        post: {
          id: 1,
          profile: AdminProfile,
          name: 'Michael Chen',
          location: 'Lagos',
          service: 'Plumbing Services',
          rating: '4.9',
          reviews: '234',
          title: 'Affordable plumbing services',
          description:
            'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
          tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
          stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
        },
        createdAt: Date.now(),
        comments: [
          {
            text: "This is really insightful! I've been thinking about this topic for a while now, and your perspective adds a lot of value. The point about accessibility is especially important—I've seen so many projects overlook this. Would love to hear more about your experience with implementing these practices in real-world projects.",
            likes: 3,
            replies: 4,
            name: 'Joshua Friday',
          },
          {
            text: "This is really insightful! I've been thinking about this topic for a while now, and your perspective adds a lot of value. The point about accessibility is especially important—I've seen so many projects overlook this. Would love to hear more about your experience with implementing these practices in real-world projects.",
            likes: 3,
            replies: 4,
            name: 'Joshua Friday',
          },
        ],
      },
      {
        name: 'Joshua Friday',
        post: {
          id: 1,
          profile: AdminProfile,
          name: 'Michael Chen',
          location: 'Lagos',
          service: 'Plumbing Services',
          rating: '4.9',
          reviews: '234',
          title: 'Affordable plumbing services',
          description:
            'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
          tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
          stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
        },
        createdAt: Date.now(),
        comments: [
          {
            text: "This is really insightful! I've been thinking about this topic for a while now, and your perspective adds a lot of value. The point about accessibility is especially important—I've seen so many projects overlook this. Would love to hear more about your experience with implementing these practices in real-world projects.",
            likes: 3,
            replies: 4,
            name: 'Joshua Friday',
          },
        ],
      },
    ],
    accountNumber: '1234567890',
  },
  {
    id: 3,
    name: 'Joshua Friday',
    online: true,
    occupation: 'barber',
    verified: true,
    desc: 'Men and Kids Ultimate grooming Hair',
    features: 'Efficient and Reliable',
    minCharge: 800,
    averageRating: 4.8,
    totalReviews: 12,
    image: servicesAroundImage2,
    favorite: true,
    maxCharge: 5000,
    address: 'No.19 IyeruOkin Street, Tanke Ilorin',
    totalJobs: 1,
    about:
      'We provide reliable, high-quality plumbing services tailored to meet your needs. From repairs and installations to maintenance and emergency services, our experienced team ensures efficient and long-lasting solutions. We take pride in our professionalism, prompt response, and commitment to customer satisfaction. Whether it’s a leaky faucet, clogged drain, or a full plumbing system installation, we’ve got you covered.',
    gallery: null,
    posts: [
      {
        id: 3,
        profile: AdminProfile,
        name: 'Michael Chen',
        location: 'Lagos',
        service: 'Plumbing Services',
        rating: '4.9',
        reviews: '234',
        title: 'Affordable plumbing services',
        description:
          'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
        tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
        stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
      },
    ],
    postImages: [Rect18, Rect19],
    images: [Rect18, Rect19],
    services: [
      {
        id: 1,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 25000,
      },
      {
        id: 2,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
    ],
    comments: null,
    accountNumber: '1234567890',
  },
  {
    id: 4,
    name: 'Joshua Friday',
    online: true,
    occupation: 'barber',
    verified: true,
    desc: 'Men and Kids Ultimate grooming Hair',
    features: 'Efficient and Reliable',
    minCharge: 800,
    averageRating: 4.8,
    totalReviews: 12,
    image: servicesAroundImage2,
    favorite: true,
    maxCharge: 5000,
    address: 'No.19 IyeruOkin Street, Tanke Ilorin',
    totalJobs: 1,
    about:
      'We provide reliable, high-quality plumbing services tailored to meet your needs. From repairs and installations to maintenance and emergency services, our experienced team ensures efficient and long-lasting solutions. We take pride in our professionalism, prompt response, and commitment to customer satisfaction. Whether it’s a leaky faucet, clogged drain, or a full plumbing system installation, we’ve got you covered.',
    gallery: null,
    posts: [
      {
        id: 3,
        profile: AdminProfile,
        name: 'Michael Chen',
        location: 'Lagos',
        service: 'Plumbing Services',
        rating: '4.9',
        reviews: '234',
        title: 'Affordable plumbing services',
        description:
          'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
        tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
        stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
      },
    ],
    postImages: [Rect18, Rect19],
    images: [Rect18, Rect19],
    services: [
      {
        id: 1,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 25000,
      },
      {
        id: 2,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
    ],
    comments: null,
    accountNumber: '1234567890',
  },
  {
    id: 5,
    name: 'Joshua Friday',
    online: true,
    occupation: 'barber',
    verified: true,
    desc: 'Men and Kids Ultimate grooming Hair',
    features: 'Efficient and Reliable',
    minCharge: 800,
    averageRating: 4.8,
    totalReviews: 12,
    image: servicesAroundImage2,
    favorite: true,
    maxCharge: 5000,
    address: 'No.19 IyeruOkin Street, Tanke Ilorin',
    totalJobs: 1,
    about:
      'We provide reliable, high-quality plumbing services tailored to meet your needs. From repairs and installations to maintenance and emergency services, our experienced team ensures efficient and long-lasting solutions. We take pride in our professionalism, prompt response, and commitment to customer satisfaction. Whether it’s a leaky faucet, clogged drain, or a full plumbing system installation, we’ve got you covered.',
    gallery: null,
    posts: [
      {
        id: 3,
        profile: AdminProfile,
        name: 'Michael Chen',
        location: 'Lagos',
        service: 'Plumbing Services',
        rating: '4.9',
        reviews: '234',
        title: 'Affordable plumbing services',
        description:
          'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
        tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
        stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
      },
    ],
    postImages: [Rect18, Rect19],
    images: [Rect18, Rect19],
    services: [
      {
        id: 1,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 25000,
      },
      {
        id: 2,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
    ],
    comments: null,
    accountNumber: '1234567890',
  },
  {
    id: 6,
    name: 'Joshua Friday',
    online: true,
    occupation: 'barber',
    verified: true,
    desc: 'Men and Kids Ultimate grooming Hair',
    features: 'Efficient and Reliable',
    minCharge: 800,
    averageRating: 4.8,
    totalReviews: 12,
    image: servicesAroundImage2,
    favorite: true,
    maxCharge: 5000,
    address: 'No.19 IyeruOkin Street, Tanke Ilorin',
    totalJobs: 1,
    about:
      'We provide reliable, high-quality plumbing services tailored to meet your needs. From repairs and installations to maintenance and emergency services, our experienced team ensures efficient and long-lasting solutions. We take pride in our professionalism, prompt response, and commitment to customer satisfaction. Whether it’s a leaky faucet, clogged drain, or a full plumbing system installation, we’ve got you covered.',
    gallery: null,
    posts: [
      {
        id: 3,
        profile: AdminProfile,
        name: 'Michael Chen',
        location: 'Lagos',
        service: 'Plumbing Services',
        rating: '4.9',
        reviews: '234',
        title: 'Affordable plumbing services',
        description:
          'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
        tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
        stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
      },
    ],
    postImages: [Rect18, Rect19],
    images: [Rect18, Rect19],
    services: [
      {
        id: 1,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 25000,
      },
      {
        id: 2,
        image: servicesImage1,
        desc: 'Fixing leaks (pipes, faucets)',
        price: 20000,
      },
    ],
    comments: null,
    accountNumber: '1234567890',
  },
]

export const customerPosts = [
  {
    id: 1,
    profile: AdminProfile,
    name: 'Michael Chen',
    location: 'Lagos',
    service: 'Plumbing Services',
    rating: '4.9',
    reviews: '234',
    title: 'Affordable plumbing services',
    description:
      'Professional plumbing services for residential and commercial properties. 24/7 emergency services available. Licensed with expertise of 15+ years.',
    tags: ['Plumbing', 'Certified', 'Near you', 'Emergency'],
    stats: { likes: 110, comments: 81, shares: 212, impressions: 16 },
    comments: [
      {
        text: "This is really insightful! I've been thinking about this topic for a while now, and your perspective adds a lot of value. The point about accessibility is especially important—I've seen so many projects overlook this. Would love to hear more about your experience with implementing these practices in real-world projects.",
        likes: 3,
        replies: 4,
        name: 'Joshua Friday',
      },
      {
        text: "This is really insightful! I've been thinking about this topic for a while now, and your perspective adds a lot of value. The point about accessibility is especially important—I've seen so many projects overlook this. Would love to hear more about your experience with implementing these practices in real-world projects.",
        likes: 3,
        replies: 4,
        name: 'Joshua Friday',
      },
    ],
  },
  {
    id: 2,
    profile: AdminElect,
    name: 'Elite Electrical Solutions',
    location: 'Ibadan',
    service: 'Electrical Services',
    rating: '4.8',
    reviews: '294',
    title: 'Expert Electrical Services',
    description:
      'Specialized in electrical installations, repairs and upgrades for both residential and commercial properties.',
    tags: ['Electrical', 'Certified', 'Repairs', 'Residential'],
    stats: { likes: 96, comments: 44, shares: 138, impressions: 9 },
    comments: [
      {
        text: "This is really insightful! I've been thinking about this topic for a while now, and your perspective adds a lot of value. The point about accessibility is especially important—I've seen so many projects overlook this. Would love to hear more about your experience with implementing these practices in real-world projects.",
        likes: 3,
        replies: 4,
        name: 'Joshua Friday',
      },
      {
        text: "This is really insightful! I've been thinking about this topic for a while now, and your perspective adds a lot of value. The point about accessibility is especially important—I've seen so many projects overlook this. Would love to hear more about your experience with implementing these practices in real-world projects.",
        likes: 3,
        replies: 4,
        name: 'Joshua Friday',
      },
      {
        text: "This is really insightful! I've been thinking about this topic for a while now, and your perspective adds a lot of value. The point about accessibility is especially important—I've seen so many projects overlook this. Would love to hear more about your experience with implementing these practices in real-world projects.",
        likes: 3,
        replies: 4,
        name: 'Joshua Friday',
      },
    ],
    recommended: true,
  },
  {
    id: 3,
    profile: AdminElect,
    name: 'Elite Electrical Solutions',
    location: 'Ibadan',
    service: 'Electrical Services',
    rating: '4.8',
    reviews: '294',
    title: 'Expert Electrical Services',
    description:
      'Specialized in electrical installations, repairs and upgrades for both residential and commercial properties.',
    tags: ['Electrical', 'Certified', 'Repairs', 'Residential'],
    stats: { likes: 96, comments: 0, shares: 138, impressions: 9 },
    comments: [],
  },
]

export const customerOffers = [
  {
    id: '1',
    title: 'Need plumber to fix leaking tap',
    description:
      'Looking for an experienced plumber to fix a constantly dripping kitchen faucet. It can be done as fast as you want.',
    posted: Date.now(),
    inquiries: 12,
    budget: 2000,
    timeFrame: '2',
    active: true,
    service: 'plumbing',
    city: 'ibadan',
    state: 'oyo',
  },
  {
    id: '2',
    title: 'Emergency plumbing repairs',
    description:
      'Fast response emergency plumbing services. Available within 30 minutes for urgent repairs including burst pipes, blocked drains and water heater issues.',
    posted: Date.now(),
    inquiries: 12,
    budget: 2000,
    timeFrame: '2',
    active: false,
    media: [Rect19, Rect18],
    service: 'plumbing',
    city: 'ibadan',
    state: 'oyo',
  },
  {
    id: '3',
    title: 'Bathroom Renovation Services',
    description:
      'Complete bathroom renovation services, including plumbing, tiling, waterproofing, and finishing to modern standards.',
    posted: Date.now(),
    inquiries: 8,
    budget: 2000,
    timeFrame: '2',
    active: true,
    service: 'plumbing',
    city: 'ibadan',
    state: 'oyo',
  },
]

export const customerBookings = [
  {
    service: 'plumbing',
    serviceImage: servicesAroundImage2,
    createdAt: Date.now(),
    serviceProviderName: 'Joshua Friday',
    serviceProviderRating: 2,
    status: 'canceled',
    desc: 'Please come at the appointed time, be on time and come with your kits',
  },
  {
    service: 'plumbing',
    serviceImage: servicesAroundImage2,
    createdAt: Date.now(),
    serviceProviderName: 'Joshua Friday',
    serviceProviderRating: 2,
    status: 'completed',
    desc: 'Please come at the appointed time, be on time and come with your kits',
  },
  {
    service: 'plumbing',
    serviceImage: servicesAroundImage2,
    createdAt: Date.now(),
    serviceProviderName: 'Joshua Friday',
    serviceProviderRating: 2,
    status: 'completed',
    desc: 'Please come at the appointed time, be on time and come with your kits',
  },
]
export const serviceProviderBookings = [
  {
    service: 'plumbing',
    serviceImage: servicesAroundImage2,
    createdAt: Date.now(),
    customerName: 'Joshua Friday',
    customerRating: 5,
    status: 'ongoing',
    desc: 'Please come at the appointed time, be on time and come with your kits',
  },
  {
    service: 'plumbing',
    serviceImage: servicesAroundImage2,
    createdAt: Date.now(),
    customerName: 'Joshua Friday',
    customerRating: 2,
    status: 'completed',
    desc: 'Please come at the appointed time, be on time and come with your kits',
  },
  {
    service: 'plumbing',
    serviceImage: servicesAroundImage2,
    createdAt: Date.now(),
    customerName: 'Joshua Friday',
    customerRating: 3,
    status: 'completed',
    desc: 'Please come at the appointed time, be on time and come with your kits',
  },
]

export const transactionHistory = [
  {
    createdAt: Date.now(),
    name: 'Joshua Friday',
    service: 'plumbing services',
    status: 'canceled',
    amount: 20000,
  },
  {
    createdAt: Date.now(),
    name: 'Leo Monday',
    service: 'cleaning services',
    status: 'sent',
    amount: 20000,
  },
  {
    createdAt: Date.now(),
    name: 'Maria Saturday',
    service: 'plumbing services',
    status: 'pending',
    amount: 20000,
  },
  {
    createdAt: Date.now(),
    name: 'Maria Saturday',
    service: 'plumbing services',
    status: 'pending',
    amount: 20000,
  },
]

export const rewardPoints = [
  { createdAt: Date.now(), point: 1 },
  { createdAt: Date.now(), point: 2 },
  { createdAt: Date.now(), point: 3 },
]

export const aboutPageData = {
  title: 'About',
  subtitle: 'On demand service platform',
  description: [
    `Skills4Hire is a platform that makes it easy to discover, trust, and book digital or vocational service providers. With social feeds serving as living portfolios, providers showcase their skills while customers gain confidence through real work and authentic interactions.`,
    `From barbers, plumbers, and cleaners to designers, developers, and marketers, we give every skilled individual the opportunity to be seen, hired, and rewarded for their talent.`,
    `What makes Skills4Hire different is that it doesn’t just connect people for transactions—it builds trust through interaction. At the heart of the platform is a social feed, where service providers can showcase their work, share updates, and engage with potential clients.`,
    `Whether you’re booking a haircut, fixing your home, designing a logo, or hiring a developer, Skills4Hire makes the process safe, engaging, and transparent. Secure payments, verified providers, reviews, and a built-in dispute resolution system ensure that both customers and providers are protected every step of the way.`,
    `At its core, Skills4Hire is more than a marketplace—it’s a platform that empowers skilled individuals with visibility, credibility, and sustainable income, while giving customers the easiest and safest way to hire talent at their fingertips.`,
  ],
}

export const termsPageData = {
  title: 'Terms and Conditions',
  description: [
    `By accessing or using the Skills4Hire platform, mobile app, or website, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must not use our platform.`,

    `1. Account Registration and Security  
Users are responsible for safeguarding their login credentials.  
Skills4Hire is not liable for unauthorized use of any account.  
You agree not to share your account or impersonate another person.`,

    `2. Use of Services  
Customers may post service requests and hire verified providers.  
Service Providers may accept jobs, complete tasks professionally, and earn payments.  
All jobs must be processed and paid within the platform. Any attempt to bypass the platform or engage in offline transactions is a violation of these Terms and may result in account termination and loss of earnings.`,

    `3. Fees and Payments  
Customers are not charged any fee while Service Providers pay a 2% commission on earnings.  
All payments must go through the Skills4Hire platform.  
Payment is released to providers only after the job is marked Completed by the customer or auto-completes after the agreed time window.`,

    `4. Escrow Policy  
Payments are held securely in escrow until job confirmation.  
If disputes arise:  
Skills4Hire will investigate using evidence provided by both parties.  
Skills4Hire reserves the right to refund the customer, release funds to the provider, or split payment based on the outcome.`,

    `5. User Conduct  
You agree not to:  
• Misrepresent your identity or services  
• Upload false or misleading content  
• Harass, threaten, or defraud any user  
• Promote or attempt off-platform transactions  
• Post illegal, offensive, or stolen content  
Violation may lead to suspension or permanent ban.`,

    `6. Content and Intellectual Property  
You retain ownership of content you upload, but grant Skills4Hire a non-exclusive license to use, display, and promote such content in connection with the platform.  
You must not upload content you don’t have rights to.`,

    `7. Reviews and Ratings  
Customers can review providers after service completion.  
Skills4Hire does not edit or alter reviews unless they violate community guidelines.`,

    `8. Dispute Resolution  
If a conflict arises between a customer and a provider:  
1. Contact must be made within 48 hours of the incident.  
2. Both parties must submit evidence (e.g., photos, chat history).  
3. Skills4Hire’s decision is final and binding.`,

    `9. Suspension and Termination  
We may suspend or terminate your account if:  
• You violate any part of these Terms  
• You attempt to manipulate or defraud users  
• You repeatedly receive poor ratings or complaints  
Termination may result in forfeiture of pending earnings.`,

    `10. Limitation of Liability 
Skills4Hire is a marketplace, not the employer of any service provider.  
We are not liable for:  
• Poor service delivery  
• Physical injury or property damage  
• Missed appointments or delays`,

    `11. Amendments 
We may modify these Terms at any time. Continued use of the platform after changes are posted constitutes acceptance of the new terms.`,

    `12. Contact Us  
For support, questions, or disputes, contact us at:  
support@skills4hireapp.com`,

    `13. Acceptance  
By clicking “Sign Up” or using the platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.`,
  ],
}

export const privacyPolicyData = {
  title: 'Skills4Hire Privacy Policy',
  description: [
    `By accessing or using the Skills4Hire platform, mobile app, or website, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you must not use our platform.`,

    `1. Account Registration and Security
Users are responsible for safeguarding their login credentials.
Skills4Hire is not liable for unauthorized use of any account.
You agree not to share your account or impersonate another person.`,

    `2. Use of Services
Customers may post service requests and hire verified providers.
Service Providers may accept jobs, complete tasks professionally, and earn payments.
All jobs must be processed and paid within the platform. Any attempt to bypass the platform or engage in offline transactions is a violation of these Terms and may result in account termination and loss of earnings.`,

    `3. Fees and Payments
Customers are not charged any fee while Service Providers pay a 2% commission on earnings.
All payments must go through the Skills4Hire platform.
Payment is released to providers only after the job is marked Completed by the customer or auto-completes after the agreed time window.`,

    `4. Escrow Policy
Payments are held securely in escrow until job confirmation.
If disputes arise:
Skills4Hire will investigate using evidence provided by both parties.
Skills4Hire reserves the right to refund the customer, release funds to the provider, or split payment based on the outcome.`,

    `5. User Conduct
You agree not to:
Misrepresent your identity or services
Upload false or misleading content
Harass, threaten, or defraud any user
Promote or attempt off-platform transactions
Post illegal, offensive, or stolen content
Violation may lead to suspension or permanent ban.`,

    `6. Content and Intellectual Property
You retain ownership of content you upload, but grant Skills4Hire a non-exclusive license to use, display, and promote such content in connection with the platform.
You must not upload content you don’t have rights to.`,

    `7. Reviews and Ratings
Customers can review providers after service completion.
Skills4Hire does not edit or alter reviews unless they violate community guidelines.`,

    `8. Dispute Resolution
If a conflict arises between a customer and a provider:
1. Contact must be made within 48 hours of the incident.
2. Both parties must submit evidence (e.g., photos, chat history).
3. Skills4Hire’s decision is final and binding.`,

    `9. Suspension and Termination
We may suspend or terminate your account if:
You violate any part of these Terms
You attempt to manipulate or defraud users
You repeatedly receive poor ratings or complaints
Termination may result in forfeiture of pending earnings.`,

    `10. Limitation of Liability
Skills4Hire is a marketplace, not the employer of any service provider.
We are not liable for:
Poor service delivery
Physical injury or property damage
Missed appointments or delays.`,

    `11. Amendments
We may modify these Terms at any time. Continued use of the platform after changes are posted constitutes acceptance of the new terms.`,

    `12. Contact Us
For support, questions, or disputes, contact us at:
support@skills4hireapp.com`,

    `13. Acceptance
By clicking “Sign Up” or using the platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.`,
  ],
}

export const notifications = [
  {
    id: 1,
    type: 'canceled',
    createdAt: Date.now(),
  },
  {
    id: 2,
    type: 'earned',
    createdAt: Date.now(),
  },
  {
    id: 3,
    type: 'message',
    createdAt: Date.now(),
  },
  {
    id: 4,
    type: 'job',
    createdAt: Date.now(),
  },
]

export const faqData = {
  title: 'Frequently Asked Questions',
  faqs: [
    {
      question: 'Q1. What is Skills4Hire?',
      answer:
        'Skills4Hire is a trusted digital marketplace that connects people with skilled professionals across both vocational services (e.g., plumbers, barbers, cleaners) and digital services (e.g., designers, developers, marketers). Unlike traditional platforms, Skills4Hire combines hiring with social interaction, allowing customers to see real work, engage with providers, and build trust before booking.',
    },
    {
      question: 'Q2. How do I find and book a service?',
      answer:
        '1. Browse services or use the search bar.\n2. Explore provider profiles, portfolios, and posts on the social feed.\n3. Book directly or post a job with your budget.\n4. Pay securely through Skills4Hire.',
    },
    {
      question: 'Q3. Can I interact with service providers before booking?',
      answer:
        'Yes. You can like, comment, or message providers on their posts. You can also chat with them directly to ask questions before making a booking.',
    },
    {
      question: 'Q4. How does posting a job work?',
      answer:
        'Create a job post with the details and your preferred budget. Providers who are interested can apply, negotiate, or accept the offer directly.',
    },
    {
      question: 'Q5. Is my payment safe?',
      answer:
        'Absolutely. Payments are processed securely within the platform. Funds are only released to providers once the service is completed and approved.',
    },
    {
      question: "Q6. What if I'm not satisfied with the service?",
      answer:
        'We have a dispute resolution process. If something goes wrong, you can open a dispute, and our support team will step in. Refunds are possible under certain conditions.',
    },
    {
      question: 'Q7. Who can register as a provider?',
      answer:
        'Anyone with a skill—whether vocational (plumber, barber, cleaner) or digital (designer, developer, marketer)—can join Skills4Hire to showcase their work and earn income.',
    },
    {
      question: 'Q8. How do I get started as a service provider?',
      answer:
        '1. Create an account and verify your details.\n2. Set up your profile with your skills, portfolio, and pricing.\n3. Post contents to the social feed that showcase your expertise.\n4. Start receiving bookings or apply to customer job posts.',
    },
  ],
}

export const mockWalletData = {
  userName: 'John Doe',
  balance: 150500.0,
  currency: '₦',
}

export const blogPosts = [
  {
    tag: 'articles',
    title: 'Top 10 Most In-Demand Skills for Service Providers in 2025',
    summary:
      'Smart tips for reviewing profiles, checking ratings, and confirming work history to avoid scams and low quality work.',
    author: 'Tao Mantaras',
    createdAt: Date.now(),
    minRead: '4 min read',
  },
  {
    tag: 'resources',
    title: 'Top 10 Most In-Demand Skills for Service Providers in 2025',
    summary:
      'Smart tips for reviewing profiles, checking ratings, and confirming work history to avoid scams and low quality work.',
    author: 'Tao Mantaras',
    createdAt: Date.now(),
    minRead: '4 min read',
  },
  {
    tag: 'news',
    title: 'Top 10 Most In-Demand Skills for Service Providers in 2025',
    summary:
      'Smart tips for reviewing profiles, checking ratings, and confirming work history to avoid scams and low quality work.',
    author: 'Tao Mantaras',
    createdAt: Date.now(),
    minRead: '4 min read',
  },
]
