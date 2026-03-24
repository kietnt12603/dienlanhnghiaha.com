const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://conbadung12603:kTfUGncKbJCNBPCI@cluster0.a8knkm6.mongodb.net/dienlanhnghiaha?retryWrites=true&w=majority';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: String },
  image: { type: String },
  category: { 
    type: String, 
    enum: ['Máy lạnh', 'Tủ lạnh', 'Máy giặt', 'Khác'],
    required: true 
  },
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Đã kết nối MongoDB để nạp dữ liệu...');

    const count = await Service.countDocuments();
    if (count > 0) {
      console.log('Database đã có dữ liệu, hủy nạp để tránh trùng lặp.');
      process.exit(0);
    }

    const services = [
      {
        name: "Sửa Chữa & Vệ Sinh Máy Lạnh",
        slug: "sua-chua-ve-sinh-may-lanh",
        description: "Dịch vụ vệ sinh máy lạnh tận nhà chuyên nghiệp. Chúng tôi nhận vệ sinh, nạp gas, sửa chữa tất cả các dòng máy lạnh treo tường, âm trần, tủ đứng tại Điện Bàn, Hội An và Đà Nẵng. <br/><br/> Cam kết: <br/> - Thợ giỏi, trung thực <br/> - Báo giá trước khi làm <br/> - Bảo hành 6 tháng.",
        price: "150.000đ",
        image: "https://images.unsplash.com/photo-1599723091971-dae963fc234c?q=80&w=800&auto=format&fit=crop",
        category: "Máy lạnh"
      },
      {
        name: "Sửa Chữa Tủ Lạnh Tại Nhà",
        slug: "sua-chua-tu-lanh",
        description: "Chuyên sửa tủ lạnh không lạnh, yếu lạnh, hư block, chảy nước. Thay thế linh kiện chính hãng cho các hãng Side-by-side, Inverter... <br/><br/> Khu vực phục vụ: Điện Bàn, Nam Phước, Hội An.",
        price: "Liên hệ",
        image: "https://images.unsplash.com/photo-1571175452282-15d44d7f6d23?q=80&w=800&auto=format&fit=crop",
        category: "Tủ lạnh"
      },
      {
        name: "Sửa Chữa Máy Giặt",
        slug: "sua-chua-may-giat",
        description: "Sửa máy giặt không vắt, không xả, rung lắc mạnh hoặc báo lỗi. Vệ sinh lồng giặt bằng máy chuyên dụng giúp quần áo luôn thơm tho sạch sẽ.",
        price: "200.000đ",
        image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop",
        category: "Máy giặt"
      }
    ];

    await Service.insertMany(services);
    console.log('Đã nạp thành công 3 dịch vụ mẫu!');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi nạp dữ liệu:', error);
    process.exit(1);
  }
}

seed();
