export const mockListings = [
  {
    id: "lst_1",
    name: "Stunning Beachfront Villa with Infinity Pool",
    type: "Entire villa",
    location: "Malibu, California, USA",
    description: "Experience the ultimate coastal luxury in this architectural masterpiece. Nestled right on the Malibu beach, this villa offers floor-to-ceiling glass walls that frame panoramic Pacific ocean views. Enjoy private beach access, a heated infinity pool, a gourmet chef's kitchen, and expansive deck areas designed for sunset watching.",
    price: 850,
    category: "Beachfront",
    rating: 4.95,
    host: {
      name: "Alexandra",
      profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2017,
      superhost: true
    },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 4.5,
    amenities: ["WiFi", "Pool", "Kitchen", "AC", "Dedicated workspace", "Free parking", "Beach access", "Hot tub"],
    reviews: [
      {
        id: 101,
        author: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
        date: "May 2026",
        comment: "Absolutely breathtaking! The sunset views from the pool are unforgettable. Host Alexandra was extremely accommodating."
      },
      {
        id: 102,
        author: "David Miller",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
        date: "April 2026",
        comment: "This place is worth every dollar. Super clean, state-of-the-art automation, and the beach is just steps away."
      }
    ]
  },
  {
    id: "lst_2",
    name: "A-Frame Forest Cabin with Outdoor Cedar Hot Tub",
    type: "Entire cabin",
    location: "Catskills, New York, USA",
    description: "Escape the city to this cozy, newly renovated A-Frame cabin hidden in the Catskill Mountains. Featuring a wood-burning stove, modern minimalist decor, and a towering window wall opening into the dense woods. Outside, you'll find a cedar hot tub, a fire pit, and a spacious deck to connect with nature.",
    price: 290,
    category: "Cabins",
    rating: 4.89,
    host: {
      name: "Ethan",
      profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2020,
      superhost: true
    },
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Free parking", "Hot tub", "Fireplace", "Dedicated workspace"],
    reviews: [
      {
        id: 201,
        author: "Emma Watson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80",
        date: "June 2026",
        comment: "The cedar tub at night under the stars was incredible. Cozy woodburner inside kept the cabin extremely warm."
      }
    ]
  },
  {
    id: "lst_3",
    name: "Contemporary Clifftop Mansion",
    type: "Entire mansion",
    location: "Santorini, Greece",
    description: "Suspended between the sky and the Aegean Sea, this iconic Santorini mansion offers luxury on a grand scale. Sculpted into the volcanic cliffside, the property features traditional Cycladic architecture blended with ultra-modern design. Includes two cave-style pools, a wind-sheltered terrace, and unmatched views of the Caldera.",
    price: 1200,
    category: "Mansions",
    rating: 4.98,
    host: {
      name: "Dimitris",
      profilePic: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2015,
      superhost: true
    },
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 10,
    bedrooms: 5,
    beds: 6,
    bathrooms: 6,
    amenities: ["WiFi", "Pool", "Kitchen", "AC", "Free parking", "Gym", "Hot tub", "Beach access"],
    reviews: [
      {
        id: 301,
        author: "Nicholas Cage",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80",
        date: "May 2026",
        comment: "Words cannot describe the Caldera view at sunset. Exceptional service from Dimitris and his crew."
      }
    ]
  },
  {
    id: "lst_4",
    name: "Architectural Mirror Glass House in the Alps",
    type: "Entire architectural home",
    location: "Cortina d'Ampezzo, Italy",
    description: "Immerse yourself in the Dolomite mountains inside this futuristic mirror glass house. Designed to disappear into the landscape, the outer glass walls reflect the stunning mountain ranges while providing complete privacy inside. Features a private sauna, outdoor fire pit, and underfloor heating.",
    price: 450,
    category: "Views",
    rating: 4.92,
    host: {
      name: "Giovanni",
      profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2019,
      superhost: true
    },
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Free parking", "Fireplace", "AC", "Dedicated workspace", "Hot tub"],
    reviews: [
      {
        id: 401,
        author: "Clara Smith",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
        date: "January 2026",
        comment: "Waking up in a mirror house surrounded by snow-covered peaks is a core memory now. Absolute masterpiece."
      }
    ]
  },
  {
    id: "lst_5",
    name: "Modern Desert Oasis with Cantilevered Pool",
    type: "Entire designer home",
    location: "Joshua Tree, California, USA",
    description: "Rising out of the rocky desert terrain, this steel-and-glass oasis features a spectacular cantilevered pool suspended over the Mojave plains. Features off-grid solar electricity, concrete floors, high-end design furniture, and an outdoor movie theater setup under the starry night sky.",
    price: 600,
    category: "Amazing pools",
    rating: 4.96,
    host: {
      name: "Ryder",
      profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2021,
      superhost: false
    },
    images: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 3,
    amenities: ["WiFi", "Pool", "Kitchen", "AC", "Free parking", "Hot tub"],
    reviews: [
      {
        id: 501,
        author: "Brad Pitt",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
        date: "June 2026",
        comment: "Joshua Tree at its finest. The pool design is unreal, and stargazing from the deck is sublime."
      }
    ]
  },
  {
    id: "lst_6",
    name: "Beautiful Lakefront Lodge with Private Dock",
    type: "Entire cottage",
    location: "Queenstown, New Zealand",
    description: "Positioned directly on the shores of Lake Wakatipu, this timber lodge offers breathtaking water and mountain vistas. Features a private deepwater jetty, kayaks, a wood fireplace, and an outdoor stone oven. Perfect base for exploring New Zealand's South Island.",
    price: 380,
    category: "Lakefront",
    rating: 4.88,
    host: {
      name: "Hannah",
      profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2018,
      superhost: true
    },
    images: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2.5,
    amenities: ["WiFi", "Kitchen", "Free parking", "Fireplace", "AC", "Dedicated workspace"],
    reviews: [
      {
        id: 601,
        author: "Alice Cooper",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
        date: "March 2026",
        comment: "Fabulous stay! Kayaking on the mirror-still lake in the morning was a dream come true. The house has everything you need."
      }
    ]
  },
  {
    id: "lst_7",
    name: "Luxurious Eco-Lodge in the Heart of the Highlands",
    type: "Entire lodge",
    location: "Isle of Skye, Scotland",
    description: "Nestled in a remote, dramatic valley on the Isle of Skye, this eco-lodge boasts turf roofing, natural stone walls, and high-efficiency glazed panels that offer dynamic views of shifting Scottish weather. Equipped with a wood-fired sauna and an outdoor hot tub.",
    price: 320,
    category: "Countryside",
    rating: 4.91,
    host: {
      name: "Calum",
      profilePic: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2016,
      superhost: true
    },
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Kitchen", "Free parking", "Fireplace", "Hot tub"],
    reviews: [
      {
        id: 701,
        author: "John Watson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
        date: "June 2026",
        comment: "Utterly romantic and peaceful. The landscape is dramatic, and the lodge blends perfectly into it."
      }
    ]
  },
  {
    id: "lst_8",
    name: "The Floating Cube - Architectural Glass Suite",
    type: "Entire room",
    location: "Tokyo Bay, Japan",
    description: "A marvel of modern minimalist engineering. This glass and steel cube floats gracefully on the quiet inlets of Tokyo Bay, offering a 360-degree look at the metropolitan skyline. Includes futuristic automated fixtures, smart glass for adjustable privacy, and a private boat transfer.",
    price: 520,
    category: "Icons",
    rating: 4.97,
    host: {
      name: "Kenji",
      profilePic: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2022,
      superhost: true
    },
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ["WiFi", "AC", "Dedicated workspace", "Kitchen", "Hot tub"],
    reviews: [
      {
        id: 801,
        author: "Mia Wong",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
        date: "April 2026",
        comment: "Waking up to the Tokyo Bay skyline felt like living in the year 2050. Unbelievable design!"
      }
    ]
  },
  {
    id: "lst_9",
    name: "Modern Cliffside Villa with Glass-Bottom Pool",
    type: "Entire home",
    location: "Bali, Indonesia",
    description: "Perched high on the cliffs of Uluwatu, this ultra-luxurious villa has a glass-bottomed plunge pool extending over the ocean. Complete with high vaulted bamboo ceilings, tropical indoor gardens, and direct private elevator access to the pristine beach below.",
    price: 750,
    category: "Amazing pools",
    rating: 4.94,
    host: {
      name: "Ketut",
      profilePic: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2014,
      superhost: true
    },
    images: [
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 3.5,
    amenities: ["WiFi", "Pool", "Kitchen", "AC", "Free parking", "Gym", "Beach access"],
    reviews: [
      {
        id: 901,
        author: "Liam Neeson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
        date: "May 2026",
        comment: "The glass-bottom pool is wild! Hearing the waves crash beneath your feet is incredible. 10/10 Bali experience."
      }
    ]
  },
  {
    id: "lst_10",
    name: "Architectural Geometric Cabin in the Redwood Woods",
    type: "Entire cabin",
    location: "Guerneville, California, USA",
    description: "Find peace under towering, thousand-year-old redwoods in this geodesic dome-inspired cabin. Equipped with a wrap-around cedar deck, modern leather furniture, skylights for tree-canopy views, and a vintage turntable with an extensive record collection.",
    price: 310,
    category: "Cabins",
    rating: 4.87,
    host: {
      name: "Tessa",
      profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2019,
      superhost: false
    },
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1.5,
    amenities: ["WiFi", "Kitchen", "Free parking", "Fireplace", "Dedicated workspace", "Hot tub"],
    reviews: [
      {
        id: 1001,
        author: "Jack Black",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80",
        date: "June 2026",
        comment: "This dome is rockin'! Put on the records, lit a fire, and soaked in the hot tub. Loved the redwood trees."
      }
    ]
  },
  {
    id: "lst_11",
    name: "Classic Cycladic Villa with Panoramic Caldera View",
    type: "Entire villa",
    location: "Oia, Greece",
    description: "Live the ultimate Greek island postcard dream. A traditional white-washed cave villa featuring arches, stone floors, and a blue-domed roof details. Enjoy a plunge pool perched on the edge of the volcanic caldera with unobstructed view of the sunset.",
    price: 490,
    category: "Views",
    rating: 4.93,
    host: {
      name: "Helen",
      profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2018,
      superhost: true
    },
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=1200&q=80"
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Pool", "Kitchen", "AC", "Free parking", "Hot tub"],
    reviews: [
      {
        id: 1101,
        author: "Sophia Laurent",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
        date: "May 2026",
        comment: "We sat in the hot tub and watched the sun set directly in front of us. An experience we will tell our grandchildren about."
      }
    ]
  },
  {
    id: "lst_12",
    name: "The Glass Penthouse above Lake Geneva",
    type: "Entire apartment",
    location: "Montreux, Switzerland",
    description: "Located high above the shoreline of Lake Geneva, this penthouse features glass ceilings and walls, offering views of the French Alps and the lake. Features a contemporary interior, a private lift, a wellness deck with sauna, and a fully stocked fireplace.",
    price: 580,
    category: "Lakefront",
    rating: 4.96,
    host: {
      name: "Pierre",
      profilePic: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80",
      yearJoined: 2020,
      superhost: true
    },
    images: [
      `${import.meta.env.BASE_URL}glass_penthouse.png`,
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80",
      `${import.meta.env.BASE_URL}penthouse_bedroom.png`,
      `${import.meta.env.BASE_URL}penthouse_terrace.png`
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Kitchen", "Free parking", "AC", "Fireplace", "Dedicated workspace", "Hot tub"],
    reviews: [
      {
        id: 1201,
        author: "Daniel Craig",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
        date: "June 2026",
        comment: "Breathtaking views. Clean, super-premium luxury. Pierre is a gracious host. I will definitely be back."
      }
    ]
  }
];

export const mockServices = [
  {
    id: "srv_1",
    name: "Creative Candid Photography by Abinash",
    price: 60, // ~$60 USD (₹4,999)
    priceType: "group",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    location: "North Goa"
  },
  {
    id: "srv_2",
    name: "Goa photo shoot by Samuel",
    price: 90, // ~$90 USD (₹7,500)
    priceType: "guest",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
    location: "North Goa"
  },
  {
    id: "srv_3",
    name: "Paperrose Art Studio Photos for all occasions",
    price: 115, // ~$115 USD (₹9,600)
    priceType: "guest",
    rating: null,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    location: "North Goa"
  },
  {
    id: "srv_4",
    name: "Strength and mobility training by Shane",
    price: 6, // ~$6 USD (₹480)
    priceType: "guest",
    rating: null,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    location: "North Goa"
  },
  {
    id: "srv_5",
    name: "Intimate, raw, honest photos by Bhagyashree",
    price: 180, // ~$180 USD (₹15,000)
    priceType: "group",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=600&q=80",
    location: "North Goa"
  },
  {
    id: "srv_6",
    name: "Luxury Photography, Video & Drone Service by Emeka",
    price: 192, // ~$192 USD (₹16,000)
    priceType: "guest",
    rating: null,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
    location: "North Goa"
  },
  {
    id: "srv_7",
    name: "Portrait and fashion shoots by Mayur",
    price: 48, // ~$48 USD (₹4,000)
    priceType: "guest",
    rating: null,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    location: "North Goa"
  }
];

