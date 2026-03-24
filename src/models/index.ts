import mongoose, { Schema, model, models } from 'mongoose';

// --- SERVICE SCHEMA ---
const ServiceSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true }, // Rich Text
  price: { type: String }, // Có thể là "Liên hệ" hoặc số cụ thể
  image: { type: String },
  category: { 
    type: String, 
    enum: ['Máy lạnh', 'Tủ lạnh', 'Máy giặt', 'Khác'],
    required: true 
  },
  features: { type: [String], default: [] }, // Danh sách các tính năng/chi tiết dịch vụ
}, { timestamps: true });

if (models.Service) {
  delete (models as any).Service;
}
export const Service = model('Service', ServiceSchema);

// --- BOOKING SCHEMA ---
const BookingSchema = new Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }, // Quận/Huyện
  serviceType: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Mới', 'Đang xử lý', 'Hoàn thành'], 
    default: 'Mới' 
  },
}, { timestamps: true });

export const Booking = models.Booking || model('Booking', BookingSchema);

// --- POST SCHEMA ---
const PostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  thumbnail: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
}, { timestamps: true });

export const Post = models.Post || model('Post', PostSchema);

// --- SETTINGS SCHEMA ---
const SettingsSchema = new Schema({
  phone: { type: String, default: "0905.436.359" },
  address: { type: String, default: "KĐT An Phú Quý, Điện Bàn, Quảng Nam" },
  email: { type: String },
  facebook: { type: String },
  messenger: { type: String },
  adminPassword: { type: String }, // Optional override for ENV
}, { timestamps: true });

export const Settings = models.Settings || model('Settings', SettingsSchema);
