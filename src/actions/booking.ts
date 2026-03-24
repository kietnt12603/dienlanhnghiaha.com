'use server';

import dbConnect from '@/lib/db';
import { Booking } from '@/models';
import { revalidatePath } from 'next/cache';

export async function createBooking(formData: FormData) {
  try {
    await dbConnect();

    const customerName = formData.get('customerName');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const serviceType = formData.get('serviceType');

    if (!customerName || !phone || !address || !serviceType) {
      return { success: false, message: 'Vui lòng điền đầy đủ thông tin!' };
    }

    const newBooking = new Booking({
      customerName,
      phone,
      address,
      serviceType,
    });

    await newBooking.save();

    // Revalidate trang admin nếu có
    revalidatePath('/admin');

    return { success: true, message: 'Đặt lịch thành công! Chúng tôi sẽ liên hệ lại trong 30 phút.' };
  } catch (error) {
    console.error('Lỗi khi đặt lịch:', error);
    return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại sau!' };
  }
}
