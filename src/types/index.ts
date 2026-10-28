export type ProductCategory = 
  | 'sarees' 
  | 'salwar-suits' 
  | 'nighties' 
  | 'kurtis' 
  | 'designer-blouses' 
  | 'party-wear' 
  | 'traditional-wear' 
  | 'other';

export interface Product {
  id: string;
  name: string;
  code: string;
  category: ProductCategory;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  isAvailable: boolean;
  isNewArrival: boolean;
  isFeatured: boolean;
  fabric?: string;
  careInstructions?: string;
  isDemo: boolean;
  createdAt: string;
}

export type StitchingCategory = 'blouse' | 'salwar' | 'kurtis-gowns' | 'alterations';

export interface StitchingService {
  id: string;
  name: string;
  category: StitchingCategory;
  description: string;
  features: string[];
  priceNote: string; // e.g. "Price on Request" or "Starts from ₹450"
  startingPrice?: number;
  deliveryDaysEstimate: string;
  image: string;
  isPopular?: boolean;
}

export type StitchingStatus = 
  | 'New Enquiry' 
  | 'Contacted' 
  | 'Confirmed' 
  | 'In Progress' 
  | 'Ready for Collection' 
  | 'Completed' 
  | 'Cancelled';

export interface StitchingMeasurements {
  chest?: string;
  waist?: string;
  blouseLength?: string;
  shoulder?: string;
  armhole?: string;
  sleeveLength?: string;
  sleeveRound?: string;
  frontNeckDepth?: string;
  backNeckDepth?: string;
  bottomLength?: string;
  hip?: string;
  unit: 'inches' | 'cm';
}

export interface StitchingEnquiry {
  id: string;
  referenceNumber: string; // REV-ST-XXXX
  customerName: string;
  mobileNumber: string;
  email?: string;
  garmentType: string;
  stitchingService: string;
  preferredDesign?: string;
  occasion?: string;
  requiredDeliveryDate?: string;
  preferredAppointmentDate?: string;
  referenceImageUrl?: string;
  measurements?: StitchingMeasurements;
  additionalInstructions?: string;
  preferredContactMethod: 'whatsapp' | 'call' | 'either';
  status: StitchingStatus;
  adminNotes?: string;
  confirmedCompletionDate?: string;
  estimatedPrice?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export type OrderStatus = 
  | 'Order Received' 
  | 'Confirmed' 
  | 'Processing' 
  | 'Ready for Dispatch' 
  | 'Shipped' 
  | 'Delivered' 
  | 'Cancelled';

export type PaymentMethod = 'whatsapp_order' | 'cod' | 'pay_at_shop' | 'upi_online';
export type PaymentStatus = 'pending' | 'verified' | 'paid_at_shop' | 'failed';

export interface OrderItem {
  productId: string;
  productName: string;
  productCode: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string; // REV-ORD-XXXX
  customerName: string;
  mobileNumber: string;
  email?: string;
  deliveryAddress: string;
  city: string;
  pinCode: string;
  orderNotes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  finalAmount: number;
  orderType: 'whatsapp' | 'online';
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  trackingNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type GalleryCategory = 
  | 'All'
  | 'Designer Blouses' 
  | 'Bridal Blouses' 
  | 'Traditional Blouses' 
  | 'Embroidery Designs' 
  | 'Party Wear' 
  | 'Sarees' 
  | 'Salwar Suits' 
  | 'Nighties' 
  | 'Kurtis' 
  | 'Festive Collections';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  description: string;
  tags: string[];
  isInspiration: boolean; // Distinction between customer inspiration and boutique collection
}

export interface WebsiteSettings {
  businessName: string;
  tagline: string;
  supportingTagline: string;
  phone: string;
  whatsappNumber: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  aboutText: string;
  missionText: string;
  openingHoursPlaceholder: string;
  emailPlaceholder: string;
  announcementText: string;
  standardDeliveryCharge: number;
  freeDeliveryThreshold: number;
  codEnabled: boolean;
  onlinePaymentEnabled: boolean;
  razorpayKeyId: string;
  instagramUrl: string;
  facebookUrl: string;
  adminPin: string;
}
