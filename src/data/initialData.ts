import { Product, StitchingService, GalleryItem, WebsiteSettings, StitchingEnquiry, Order } from '../types';

export const initialSettings: WebsiteSettings = {
  businessName: "Rev’s Boutique",
  tagline: "Your Style, Our Stitching.",
  supportingTagline: "Perfect Fit. Beautiful Designs. Fashion for Every Occasion.",
  phone: "8300141583",
  whatsappNumber: "918300141583",
  landmark: "Near HDFC Bank and Post Office, Karamadai, Tamil Nadu, India",
  city: "Karamadai",
  state: "Tamil Nadu",
  country: "India",
  aboutText: "Welcome to Rev’s Boutique, your destination for beautiful ladies’ fashion and customized stitching in Karamadai. We offer personalized tailoring for designer blouses, party wear, bridal outfits, and function wear, along with a selection of sarees, salwar suits, nighties, kurtis, and other ladies’ clothing. Whether you are preparing for a wedding, festival, special occasion, or everyday wear, Rev’s Boutique helps you explore styles that match your preferences.",
  missionText: "To bring personalized craftsmanship, flawless fitting, and graceful traditional & modern fashion to every woman in Karamadai and surrounding towns.",
  openingHoursPlaceholder: "Contact boutique for current tailoring timings and consultation appointments.",
  emailPlaceholder: "Contact via WhatsApp or Phone for enquiries",
  announcementText: "✨ Rev’s Boutique, Karamadai — Customized Blouse & Dress Stitching | WhatsApp: 8300141583",
  standardDeliveryCharge: 60,
  freeDeliveryThreshold: 1499,
  codEnabled: true,
  onlinePaymentEnabled: false,
  razorpayKeyId: "",
  instagramUrl: "",
  facebookUrl: "",
  adminPin: "8300"
};

export const initialServices: StitchingService[] = [
  {
    id: 'blouse-bridal',
    name: 'Bridal & Wedding Blouse Stitching',
    category: 'blouse',
    description: 'Exquisite bridal blouse tailoring with intricate aari work, zardozi embroidery, maggam patterns, padded lining, and handcrafted tassels designed for your special day.',
    features: ['Padded & reinforced lining', 'Aari & maggam embroidery support', 'Custom sweetheart, boat or deep neck', 'Handmade dori & latkan finishing', 'Multiple trial fitting options'],
    priceNote: 'Price on Request',
    deliveryDaysEstimate: '7-12 days',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'blouse-designer',
    name: 'Designer & Party-Wear Blouses',
    category: 'blouse',
    description: 'Modern and trendy designer cuts including backless, keyhole, halter neck, elbow sleeves, sheer net patterns, and stylish designer borders.',
    features: ['Modern back cut-outs', 'Prince cut / princess cut finish', 'Contrast piping & borders', 'Designer sleeve options (puff, bell, elbow)'],
    priceNote: 'Price on Request',
    deliveryDaysEstimate: '5-7 days',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'blouse-simple',
    name: 'Everyday & Simple Blouses',
    category: 'blouse',
    description: 'Comfortable, perfectly fitted regular daily-wear blouses stitched with neat inner seams, sturdy hooks, and durable stitching.',
    features: ['Classic 4-tuck or katori cut', 'Comfortable cotton lining', 'Neat finishing & sturdy hooks', 'Quick turnaround time'],
    priceNote: 'Price on Request',
    deliveryDaysEstimate: '3-5 days',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'salwar-anarkali',
    name: 'Salwar Kameez, Churidar & Anarkali',
    category: 'salwar',
    description: 'Custom tailored salwar suits, straight cut suits, Punjabi patiala sets, and flowing floor-length Anarkalis made to your exact body measurements.',
    features: ['Custom neckline & yoke design', 'Churidar, pant or patiala stitching', 'Full soft lining inside', 'Side pockets & slit finishing'],
    priceNote: 'Price on Request',
    deliveryDaysEstimate: '5-8 days',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'kurti-custom',
    name: 'Customized Kurtis & Tunics',
    category: 'kurtis-gowns',
    description: 'Tailor-made everyday, office wear, and festive kurtis with collar necks, boat necks, flared silhouettes, and high-low hems.',
    features: ['A-line, straight or flared cuts', 'Designer necklines with button details', 'Breathable fitting for daily comfort'],
    priceNote: 'Price on Request',
    deliveryDaysEstimate: '4-6 days',
    image: 'https://images.unsplash.com/photo-1596783049514-98c47a505b39?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gowns-party',
    name: 'Party Gowns & Function Wear',
    category: 'kurtis-gowns',
    description: 'Grand festive gowns, lehenga cholis, and reception outfits tailored with layered cancan, pleating, and flattering flare.',
    features: ['Cancan net attachment', 'Padded bodice & structured waist', 'Handcrafted waist belts & latkans'],
    priceNote: 'Price on Request',
    deliveryDaysEstimate: '8-14 days',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'alterations-fitting',
    name: 'Garment Alterations & Fitting',
    category: 'alterations',
    description: 'Professional alterations for readymade blouses, salwars, kurtis, pants, and dresses, plus saree fall and pico finishing.',
    features: ['Tightening & loosening of side seams', 'Sleeve length & shoulder adjustment', 'Saree fall & edge pico finishing', 'Prompt same-day or next-day turnaround'],
    priceNote: 'Price on Request',
    deliveryDaysEstimate: '1-3 days',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'p1',
    name: 'Crimson Silk Saree with Gold Zari Border',
    code: 'REV-SAR-01',
    category: 'sarees',
    description: 'Demonstration catalogue item: Rich traditional crimson red soft silk saree featuring an ornate golden temple zari border and pallu. Comes with unstitched blouse piece.',
    price: 2450,
    discountedPrice: 1999,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size (6.3m with blouse)'],
    colors: ['Crimson Red', 'Maroon Wine'],
    stock: 5,
    isAvailable: true,
    isNewArrival: true,
    isFeatured: true,
    fabric: 'Soft Silk',
    careInstructions: 'Dry clean recommended',
    isDemo: true,
    createdAt: '2026-10-01'
  },
  {
    id: 'p2',
    name: 'Handcrafted Aari Work Bridal Blouse (Stitched)',
    code: 'REV-BLS-01',
    category: 'designer-blouses',
    description: 'Demonstration catalogue item: Ready-to-wear deep maroon velvet-finish bridal blouse with intricate golden zari and stone work on back and sleeves.',
    price: 1850,
    discountedPrice: 1599,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['34', '36', '38', '40', 'Custom Size'],
    colors: ['Deep Maroon', 'Royal Gold', 'Emerald Green'],
    stock: 8,
    isAvailable: true,
    isNewArrival: true,
    isFeatured: true,
    fabric: 'Raw Silk with Velvet Touches',
    careInstructions: 'Dry clean only',
    isDemo: true,
    createdAt: '2026-10-02'
  },
  {
    id: 'p3',
    name: 'Pastel Peach Embroidered Anarkali Suit Set',
    code: 'REV-SAL-01',
    category: 'salwar-suits',
    description: 'Demonstration catalogue item: Graceful party-wear pastel peach georgette Anarkali suit with delicate sequin work, matching churidar, and bordered net dupatta.',
    price: 2899,
    discountedPrice: 2399,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    colors: ['Peach Blush', 'Mint Green', 'Powder Blue'],
    stock: 4,
    isAvailable: true,
    isNewArrival: true,
    isFeatured: true,
    fabric: 'Georgette with Santoon Lining',
    careInstructions: 'Gentle handwash or dry clean',
    isDemo: true,
    createdAt: '2026-10-05'
  },
  {
    id: 'p4',
    name: 'Pure Cotton Daily Wear Printed Nighty',
    code: 'REV-NGT-01',
    category: 'nighties',
    description: 'Demonstration catalogue item: 100% pure breathable cotton nighty with floral block print, front button placket, and side pocket for daily home comfort.',
    price: 499,
    discountedPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size (Fits M to XXL)'],
    colors: ['Rose Pink Floral', 'Aqua Blue', 'Lavender'],
    stock: 25,
    isAvailable: true,
    isNewArrival: false,
    isFeatured: true,
    fabric: '100% Combed Cotton',
    careInstructions: 'Machine washable',
    isDemo: true,
    createdAt: '2026-10-06'
  },
  {
    id: 'p5',
    name: 'Straight Cut Rayon Printed Kurti with Yoke Embroidery',
    code: 'REV-KRT-01',
    category: 'kurtis',
    description: 'Demonstration catalogue item: Elegant navy blue and gold rayon calf-length kurti featuring thread embroidery on the yoke and 3/4 sleeves.',
    price: 799,
    discountedPrice: 649,
    images: [
      'https://images.unsplash.com/photo-1596783049514-98c47a505b39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    colors: ['Navy Gold', 'Maroon Gold', 'Forest Green'],
    stock: 12,
    isAvailable: true,
    isNewArrival: true,
    isFeatured: false,
    fabric: 'Soft Rayon',
    careInstructions: 'Hand wash separately in cold water',
    isDemo: true,
    createdAt: '2026-10-08'
  },
  {
    id: 'p6',
    name: 'Kanchipuram Style Traditional Festive Saree',
    code: 'REV-SAR-02',
    category: 'sarees',
    description: 'Demonstration catalogue item: Heavy golden mustard and emerald green dual-tone festive saree woven with rich traditional motifs for temple wear and family celebrations.',
    price: 3200,
    discountedPrice: 2750,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size (6.3m)'],
    colors: ['Mustard & Green', 'Teal & Gold'],
    stock: 3,
    isAvailable: true,
    isNewArrival: false,
    isFeatured: true,
    fabric: 'Art Silk with Heavy Zari',
    careInstructions: 'Dry clean only',
    isDemo: true,
    createdAt: '2026-10-10'
  },
  {
    id: 'p7',
    name: 'Royal Georgette Party-Wear Semi-Stitched Suit',
    code: 'REV-SAL-02',
    category: 'party-wear',
    description: 'Demonstration catalogue item: Deep wine purple georgette semi-stitched salwar kameez with santoon lining material and heavy embroidered dupatta.',
    price: 2199,
    discountedPrice: 1799,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Semi-Stitched (Fits up to 46 inch bust)'],
    colors: ['Wine Purple', 'Deep Emerald'],
    stock: 6,
    isAvailable: true,
    isNewArrival: true,
    isFeatured: false,
    fabric: 'Faux Georgette',
    careInstructions: 'Dry clean recommended',
    isDemo: true,
    createdAt: '2026-10-12'
  },
  {
    id: 'p8',
    name: 'Comfort Alpine Cotton Nighty with Pockets',
    code: 'REV-NGT-02',
    category: 'nighties',
    description: 'Demonstration catalogue item: Premium soft alpine cotton nighty with sweetheart neckline, front zipper for nursing convenience, and deep side pocket.',
    price: 549,
    discountedPrice: 449,
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size (Fits L to XXL)'],
    colors: ['Maroon Paisley', 'Navy Star', 'Teal Leaves'],
    stock: 18,
    isAvailable: true,
    isNewArrival: false,
    isFeatured: false,
    fabric: 'Alpine Cotton',
    careInstructions: 'Gentle machine wash',
    isDemo: true,
    createdAt: '2026-10-14'
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Intricate Maggam Bridal Blouse Back Pattern',
    category: 'Bridal Blouses',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Gold zardozi and peacock motif aari embroidery crafted for bridal muhurtham sarees.',
    tags: ['Bridal', 'Aari Work', 'Zardozi', 'Blouse'],
    isInspiration: true
  },
  {
    id: 'g2',
    title: 'Modern Boat Neck Designer Blouse with Elbow Sleeves',
    category: 'Designer Blouses',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: 'Contemporary boat neckline with subtle cut-out back and elegant pearl beaded border.',
    tags: ['Designer', 'Boat Neck', 'Modern', 'Elbow Sleeves'],
    isInspiration: true
  },
  {
    id: 'g3',
    title: 'Traditional Temple Border Silk Saree Draping',
    category: 'Sarees',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    description: 'Classic Tamil Nadu temple zari woven silk drape matched with a tailored contrast blouse.',
    tags: ['Silk Saree', 'Traditional', 'Temple Border', 'Festive'],
    isInspiration: true
  },
  {
    id: 'g4',
    title: 'Flared Floor-Length Anarkali with Dupatta Work',
    category: 'Salwar Suits',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    description: 'Kalidar flared Anarkali custom tailored with soft cancan lining for evening parties.',
    tags: ['Anarkali', 'Party Wear', 'Flared', 'Custom Fitting'],
    isInspiration: true
  },
  {
    id: 'g5',
    title: 'Handcrafted Floral Thread Embroidery Detail',
    category: 'Embroidery Designs',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80',
    description: 'Close-up of customized floral silk thread embroidery for neckline and sleeve cuffs.',
    tags: ['Embroidery', 'Handwork', 'Neckline', 'Detailing'],
    isInspiration: true
  },
  {
    id: 'g6',
    title: 'Evening Festive Party Gown with Layered Flare',
    category: 'Party Wear',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    description: 'Custom tailored reception gown with structured bodice and flowing georgette fall.',
    tags: ['Reception', 'Gown', 'Party Wear', 'Tailoring'],
    isInspiration: true
  },
  {
    id: 'g7',
    title: 'A-Line Rayon Daily Wear Kurti with Potli Buttons',
    category: 'Kurtis',
    image: 'https://images.unsplash.com/photo-1596783049514-98c47a505b39?auto=format&fit=crop&w=800&q=80',
    description: 'Comfortable straight cut tailored kurti with handcrafted fabric potli button neckline.',
    tags: ['Daily Wear', 'Kurti', 'Comfort', 'Potli Buttons'],
    isInspiration: true
  },
  {
    id: 'g8',
    title: 'Pure Cotton Printed Relaxed Fit Nighty',
    category: 'Nighties',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    description: 'Soft combed cotton daily nightwear with reinforced seams and comfortable yoke.',
    tags: ['Nighty', 'Cotton', 'Daily Comfort', 'Karamadai'],
    isInspiration: true
  }
];

export const sampleEnquiries: StitchingEnquiry[] = [
  {
    id: 'st-01',
    referenceNumber: 'REV-ST-1082',
    customerName: 'Kavitha S.',
    mobileNumber: '9842100000',
    garmentType: 'Blouse',
    stitchingService: 'Bridal & Wedding Blouse Stitching',
    preferredDesign: 'Deep V back neck with aari peacock work and elbow sleeve border',
    occasion: 'Sister\'s Wedding Reception',
    requiredDeliveryDate: '2026-11-05',
    measurements: {
      chest: '36',
      waist: '30',
      blouseLength: '14',
      shoulder: '14.5',
      armhole: '16',
      sleeveLength: '10.5',
      frontNeckDepth: '7',
      backNeckDepth: '9.5',
      unit: 'inches'
    },
    additionalInstructions: 'Please leave 2 inch extra margin inside for future alteration.',
    preferredContactMethod: 'whatsapp',
    status: 'In Progress',
    adminNotes: 'Aari work artisan started work on sleeves. Cloth given on Oct 20.',
    confirmedCompletionDate: '2026-11-04',
    estimatedPrice: '₹1,800',
    createdAt: '2026-10-20T11:30:00Z',
    updatedAt: '2026-10-21T14:15:00Z'
  },
  {
    id: 'st-02',
    referenceNumber: 'REV-ST-1083',
    customerName: 'Priya Mohan',
    mobileNumber: '9789012345',
    garmentType: 'Salwar Kameez',
    stitchingService: 'Salwar Kameez, Churidar & Anarkali',
    preferredDesign: 'Boat neck kurti with straight cigarette pants and side pockets',
    occasion: 'Diwali Celebration',
    requiredDeliveryDate: '2026-11-08',
    additionalInstructions: 'Need comfortable fitting for office and festival wear.',
    preferredContactMethod: 'whatsapp',
    status: 'New Enquiry',
    adminNotes: 'Sent sample neck pattern photos via WhatsApp on Oct 22.',
    createdAt: '2026-10-22T09:40:00Z',
    updatedAt: '2026-10-22T09:40:00Z'
  }
];

export const sampleOrders: Order[] = [
  {
    id: 'ord-01',
    orderNumber: 'REV-ORD-5011',
    customerName: 'Soundarya R.',
    mobileNumber: '9443211111',
    deliveryAddress: 'Near Mariamman Temple, Mettupalayam Road',
    city: 'Karamadai',
    pinCode: '641104',
    items: [
      {
        productId: 'p1',
        productName: 'Crimson Silk Saree with Gold Zari Border',
        productCode: 'REV-SAR-01',
        price: 1999,
        quantity: 1,
        selectedSize: 'Free Size (6.3m with blouse)',
        selectedColor: 'Crimson Red',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 1999,
    deliveryCharge: 0,
    discount: 0,
    finalAmount: 1999,
    orderType: 'online',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'Confirmed',
    trackingNotes: 'Packed and verified. Ready for local doorstep delivery or store pickup.',
    createdAt: '2026-10-21T15:20:00Z',
    updatedAt: '2026-10-22T10:00:00Z'
  }
];
