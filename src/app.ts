import { fetchUsers, groupByDepartment, User, GroupedByDepartment } from './index';

// ฟังก์ชันหลักในการดึงข้อมูลและแสดงผล
const run = async () => {
    try {
        // ดึงข้อมูลผู้ใช้จาก API
        const users: User[] = await fetchUsers();

        // จัดกลุ่มผู้ใช้ตามแผนก
        const groupedData: GroupedByDepartment = groupByDepartment(users);

        // แสดงผลข้อมูลที่จัดกลุ่มแล้ว
        console.log(groupedData);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// เรียกใช้ฟังก์ชัน
run();