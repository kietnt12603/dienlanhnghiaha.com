'use server';

import dbConnect from "@/lib/db";
import { Booking, Service, Post, Settings } from "@/models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateBookingStatus(id: string, status: string) {
  try {
    await dbConnect();
    await Booking.findByIdAndUpdate(id, { status });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái:', error);
    return { success: false, message: 'Không thể cập nhật trạng thái' };
  }
}

export async function deleteBooking(id: string) {
  try {
    await dbConnect();
    await Booking.findByIdAndDelete(id);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Lỗi khi xóa booking:', error);
    return { success: false, message: 'Không thể xóa yêu cầu này' };
  }
}

export async function loginAdmin(password: string) {
  try {
    await dbConnect();
    const settings = await Settings.findOne();
    const ADMIN_PASSWORD = settings?.adminPassword || process.env.ADMIN_PASSWORD || '123456';
    
    if (password === ADMIN_PASSWORD) {
      (await cookies()).set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return { success: true };
    }
    return { success: false, message: 'Mật khẩu không đúng' };
  } catch (error) {
    return { success: false, message: 'Lỗi hệ thống' };
  }
}

export async function seedServices() {
  try {
    await dbConnect();
    const count = await Service.countDocuments();
    if (count > 0) return { success: false, message: 'Database đã có dữ liệu rồi.' };

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
        name: "Sửa Chữa Tủ Lạnh",
        slug: "sua-chua-tu-lanh",
        description: "Chuyên sửa tủ lạnh không lạnh, yếu lạnh, hư block, chảy nước. Thay thế linh kiện chính hãng cho các hãng Side-by-side, Inverter... <br/><br/> Khu vực phục vụ: Điện Bàn, Nam Phước, Hội An.",
        price: "Liên hệ",
        image: "https://images.unsplash.com/photo-1571175452282-15d44d7f6d23?q=80&w=800&auto=format&fit=crop",
        category: "Tủ lạnh"
      },
      {
        name: "Giặt Vệ Sinh Máy Giặt",
        slug: "sua-chua-may-giat",
        description: "Sửa máy giặt không vắt, không xả, rung lắc mạnh hoặc báo lỗi. Vệ sinh lồng giặt bằng máy chuyên dụng giúp quần áo luôn thơm tho sạch sẽ.",
        price: "200.000đ",
        image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop",
        category: "Máy giặt"
      }
    ];

    await Service.insertMany(services);
    revalidatePath('/dich-vu');
    return { success: true, message: 'Đã nạp thành công 3 dịch vụ mẫu!' };
  } catch (error) {
    console.error('Lỗi khi nạp dữ liệu:', error);
    return { success: false, message: 'Lỗi khi nạp dữ liệu mẫu' };
  }
}

// --- SERVICE ACTIONS ---

export async function upsertService(data: any) {
  try {
    const session = (await cookies()).get('admin_session')?.value;
    if (session !== 'authenticated') {
      return { success: false, error: 'Unauthorized' };
    }

    await dbConnect();
    const { _id, ...updateData } = data;
    console.log('--- UPSERTING SERVICE ---');
    console.log('ID:', _id);
    console.log('Data:', JSON.stringify(updateData, null, 2));

    let res;
    if (_id) {
       res = await Service.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
       console.log('Update result:', !!res);
    } else {
       res = await Service.create(updateData);
       console.log('Create result:', !!res);
    }

    revalidatePath('/admin/services');
    revalidatePath('/dich-vu');
    revalidatePath(`/dich-vu/${updateData.slug || ''}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteService(id: string) {
  try {
    const session = (await cookies()).get('admin_session')?.value;
    if (session !== 'authenticated') {
      return { success: false, error: 'Unauthorized' };
    }

    await dbConnect();
    await Service.findByIdAndDelete(id);
    
    revalidatePath('/admin/services');
    revalidatePath('/dich-vu');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- POST ACTIONS ---

export async function upsertPost(data: any) {
  try {
    const session = (await cookies()).get('admin_session')?.value;
    if (session !== 'authenticated') {
      return { success: false, error: 'Unauthorized' };
    }

    await dbConnect();
    const { _id, ...updateData } = data;

    if (_id) {
      await Post.findByIdAndUpdate(_id, updateData);
    } else {
      await Post.create(updateData);
    }

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePost(id: string) {
  try {
    const session = (await cookies()).get('admin_session')?.value;
    if (session !== 'authenticated') {
      return { success: false, error: 'Unauthorized' };
    }

    await dbConnect();
    await Post.findByIdAndDelete(id);
    
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- SETTINGS ACTIONS ---

export async function getSettings() {
  try {
    await dbConnect();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.error('Lỗi khi lấy cài đặt:', error);
    return {};
  }
}

export async function updateSettings(data: any) {
  try {
    const session = (await cookies()).get('admin_session')?.value;
    if (session !== 'authenticated') {
      return { success: false, error: 'Unauthorized' };
    }

    console.log('--- UPDATING SETTINGS ---');
    console.log('Data:', JSON.stringify(data, null, 2));

    await dbConnect();
    const settings = await Settings.findOne();
    if (settings) {
      await Settings.findByIdAndUpdate(settings._id, data);
    } else {
      await Settings.create(data);
    }

    revalidatePath('/admin/settings');
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error('Lỗi khi cập nhật cài đặt:', error);
    return { success: false, error: error.message };
  }
}
