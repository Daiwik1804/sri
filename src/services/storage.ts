import { 
  Product, 
  StitchingService, 
  StitchingEnquiry, 
  Order, 
  GalleryItem, 
  WebsiteSettings 
} from '../types';
import { 
  initialProducts, 
  initialServices, 
  initialGallery, 
  initialSettings, 
  sampleEnquiries, 
  sampleOrders 
} from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'revs_boutique_products_v1',
  SERVICES: 'revs_boutique_services_v1',
  ENQUIRIES: 'revs_boutique_enquiries_v1',
  ORDERS: 'revs_boutique_orders_v1',
  GALLERY: 'revs_boutique_gallery_v1',
  SETTINGS: 'revs_boutique_settings_v1',
  ADMIN_AUTH: 'revs_boutique_admin_session_v1',
  CONTACT_MESSAGES: 'revs_boutique_contact_msgs_v1'
};

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
  status: 'new' | 'replied';
}

class StorageService {
  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event('revs_storage_update'));
    } catch (e) {
      console.error(`Error writing ${key} to storage:`, e);
    }
  }

  // Settings
  getSettings(): WebsiteSettings {
    return this.getItem<WebsiteSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
  }

  updateSettings(settings: Partial<WebsiteSettings>): WebsiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.setItem(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // Products
  getProducts(): Product[] {
    return this.getItem<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
  }

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id || p.code === id);
  }

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    this.setItem(STORAGE_KEYS.PRODUCTS, products);
  }

  deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id);
    this.setItem(STORAGE_KEYS.PRODUCTS, products);
  }

  // Services
  getServices(): StitchingService[] {
    return this.getItem<StitchingService[]>(STORAGE_KEYS.SERVICES, initialServices);
  }

  saveService(service: StitchingService): void {
    const services = this.getServices();
    const index = services.findIndex(s => s.id === service.id);
    if (index >= 0) {
      services[index] = service;
    } else {
      services.push(service);
    }
    this.setItem(STORAGE_KEYS.SERVICES, services);
  }

  // Stitching Enquiries
  getEnquiries(): StitchingEnquiry[] {
    return this.getItem<StitchingEnquiry[]>(STORAGE_KEYS.ENQUIRIES, sampleEnquiries);
  }

  getEnquiryByRef(refNumber: string): StitchingEnquiry | undefined {
    const clean = refNumber.trim().toUpperCase();
    return this.getEnquiries().find(e => e.referenceNumber.toUpperCase() === clean);
  }

  createEnquiry(enquiry: Omit<StitchingEnquiry, 'id' | 'referenceNumber' | 'createdAt' | 'updatedAt' | 'status'>): StitchingEnquiry {
    const enquiries = this.getEnquiries();
    const seq = 1000 + enquiries.length + 1;
    const newEnquiry: StitchingEnquiry = {
      ...enquiry,
      id: 'st-' + Date.now(),
      referenceNumber: `REV-ST-${seq}`,
      status: 'New Enquiry',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    enquiries.unshift(newEnquiry);
    this.setItem(STORAGE_KEYS.ENQUIRIES, enquiries);
    return newEnquiry;
  }

  updateEnquiry(id: string, updates: Partial<StitchingEnquiry>): StitchingEnquiry | null {
    const enquiries = this.getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index === -1) return null;
    enquiries[index] = {
      ...enquiries[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.setItem(STORAGE_KEYS.ENQUIRIES, enquiries);
    return enquiries[index];
  }

  // Orders
  getOrders(): Order[] {
    return this.getItem<Order[]>(STORAGE_KEYS.ORDERS, sampleOrders);
  }

  getOrderByNumber(orderNumber: string): Order | undefined {
    const clean = orderNumber.trim().toUpperCase();
    return this.getOrders().find(o => o.orderNumber.toUpperCase() === clean);
  }

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'status'>): Order {
    const orders = this.getOrders();
    const seq = 5000 + orders.length + 1;
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber: `REV-ORD-${seq}`,
      status: 'Order Received',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.unshift(newOrder);
    this.setItem(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  }

  updateOrder(id: string, updates: Partial<Order>): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    orders[index] = {
      ...orders[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.setItem(STORAGE_KEYS.ORDERS, orders);
    return orders[index];
  }

  // Gallery
  getGallery(): GalleryItem[] {
    return this.getItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
  }

  saveGalleryItem(item: GalleryItem): void {
    const gallery = this.getGallery();
    const index = gallery.findIndex(g => g.id === item.id);
    if (index >= 0) {
      gallery[index] = item;
    } else {
      gallery.unshift(item);
    }
    this.setItem(STORAGE_KEYS.GALLERY, gallery);
  }

  deleteGalleryItem(id: string): void {
    const gallery = this.getGallery().filter(g => g.id !== id);
    this.setItem(STORAGE_KEYS.GALLERY, gallery);
  }

  // Contact Messages
  getContactMessages(): ContactMessage[] {
    return this.getItem<ContactMessage[]>(STORAGE_KEYS.CONTACT_MESSAGES, []);
  }

  createContactMessage(name: string, phone: string, message: string): ContactMessage {
    const msgs = this.getContactMessages();
    const newMsg: ContactMessage = {
      id: 'msg-' + Date.now(),
      name,
      phone,
      message,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    msgs.unshift(newMsg);
    this.setItem(STORAGE_KEYS.CONTACT_MESSAGES, msgs);
    return newMsg;
  }

  // Admin Auth Session
  isAdminLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'authenticated';
  }

  setAdminLoggedIn(val: boolean): void {
    if (val) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'authenticated');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  }

  // Reset to initial demo data
  resetAllData(): void {
    this.setItem(STORAGE_KEYS.PRODUCTS, initialProducts);
    this.setItem(STORAGE_KEYS.SERVICES, initialServices);
    this.setItem(STORAGE_KEYS.GALLERY, initialGallery);
    this.setItem(STORAGE_KEYS.SETTINGS, initialSettings);
    this.setItem(STORAGE_KEYS.ENQUIRIES, sampleEnquiries);
    this.setItem(STORAGE_KEYS.ORDERS, sampleOrders);
  }
}

export const storage = new StorageService();

/**
 * WhatsApp click-to-chat URL helper
 * Always uses the verified WhatsApp number: 918300141583
 */
export function buildWhatsAppLink(message: string, customPhone?: string): string {
  const settings = storage.getSettings();
  const phone = customPhone || settings.whatsappNumber || '918300141583';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

export function getGeneralEnquiryWhatsApp(): string {
  const text = `Hello Rev’s Boutique! I found your website and would like to know more about your products and stitching services. Please share the details.`;
  return buildWhatsAppLink(text);
}

export function getBlouseStitchingWhatsApp(serviceName = 'Customized Blouse Stitching'): string {
  const text = `Hello Rev’s Boutique! I am interested in ${serviceName}. Please share your available designs, stitching charges, and delivery details.`;
  return buildWhatsAppLink(text);
}

export function getProductEnquiryWhatsApp(productName: string, code?: string, price?: number): string {
  let text = `Hello Rev’s Boutique! I am interested in *${productName}*`;
  if (code) text += ` (Code: ${code})`;
  if (price) text += ` - ₹${price}`;
  text += `. Please confirm the price, size or color availability, and ordering details.`;
  return buildWhatsAppLink(text);
}

export function getOrderWhatsAppMessage(order: Order): string {
  let msg = `*NEW ORDER ENQUIRY - REV’S BOUTIQUE*\n`;
  msg += `Order Ref: *${order.orderNumber}*\n`;
  msg += `Customer Name: ${order.customerName}\n`;
  msg += `Mobile: ${order.mobileNumber}\n`;
  msg += `Delivery Address: ${order.deliveryAddress}, ${order.city} - ${order.pinCode}\n\n`;
  msg += `*Ordered Items:*\n`;
  order.items.forEach((item, i) => {
    msg += `${i + 1}. ${item.productName} (${item.productCode})\n`;
    msg += `   Qty: ${item.quantity} | Size: ${item.selectedSize} | Color: ${item.selectedColor}\n`;
    msg += `   Price: ₹${item.price} each\n`;
  });
  msg += `\n*Subtotal:* ₹${order.subtotal}\n`;
  msg += `*Delivery:* ${order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}\n`;
  msg += `*Total Amount:* ₹${order.finalAmount}\n\n`;
  msg += `Please confirm stock availability and finalize my order. Thank you!`;
  return buildWhatsAppLink(msg);
}

export function getEnquiryWhatsAppMessage(enquiry: StitchingEnquiry): string {
  let msg = `*STITCHING ENQUIRY - REV’S BOUTIQUE*\n`;
  msg += `Ref ID: *${enquiry.referenceNumber}*\n`;
  msg += `Customer: ${enquiry.customerName} (${enquiry.mobileNumber})\n`;
  msg += `Garment: ${enquiry.garmentType}\n`;
  msg += `Service: ${enquiry.stitchingService}\n`;
  if (enquiry.preferredDesign) msg += `Design Preference: ${enquiry.preferredDesign}\n`;
  if (enquiry.occasion) msg += `Occasion: ${enquiry.occasion}\n`;
  if (enquiry.requiredDeliveryDate) msg += `Required By: ${enquiry.requiredDeliveryDate}\n`;
  if (enquiry.additionalInstructions) msg += `Notes: ${enquiry.additionalInstructions}\n`;
  msg += `\nHello Rev's Boutique, I have submitted this stitching enquiry on your website. Please check and let me know the stitching charges and appointment schedule.`;
  return buildWhatsAppLink(msg);
}
