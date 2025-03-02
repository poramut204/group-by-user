import axios from 'axios';

// Define types for the user and grouped data
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    hair: { color: string; type: string };
    address: {
        postalCode: string;
    };
    company: {
        department: string;
    };
}

export interface DepartmentSummary {
    male: number;
    female: number;
    ageRange: string;
    hair: { [color: string]: number };
    addressUser: { [userName: string]: string };
}

export interface GroupedByDepartment {
    [department: string]: DepartmentSummary;
}

// Helper function to determine the age range
const getAgeRange = (age: number): string => {
    if (age >= 20 && age < 30) return '20-29';
    if (age >= 30 && age < 40) return '30-39';
    if (age >= 40 && age < 50) return '40-49';
    if (age >= 50 && age < 60) return '50-59';
    return '60+';
};

// Fetch users from API
export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get('https://dummyjson.com/users');
    return response.data.users;
};

// Group users by department and generate the summary
export const groupByDepartment = (users: User[]): GroupedByDepartment => {
    return users.reduce((acc, user) => {
        const department = user.company.department;

        if (!acc[department]) {
            acc[department] = {
                male: 0,
                female: 0,
                ageRange: '',
                hair: {},
                addressUser: {},
            };
        }

        // Count male/female
        if (user.gender.toLowerCase() === 'male') {
            acc[department].male += 1;
        } else if (user.gender.toLowerCase() === 'female') {
            acc[department].female += 1;
        }

        // Determine age range
        acc[department].ageRange = getAgeRange(user.age);

        // Count hair color occurrences
        const hairColor = user.hair.color;
        acc[department].hair[hairColor] = (acc[department].hair[hairColor] || 0) + 1;

        // Map user name to postal code
        const userName = `${user.firstName}${user.lastName}`;
        acc[department].addressUser[userName] = user.address.postalCode;

        return acc;
    }, {} as GroupedByDepartment);
};

// Main function to fetch and group data
const main = async () => {
    const users = await fetchUsers();
    const grouped = groupByDepartment(users);
    console.log(grouped);
};

main().catch((error) => console.error(error));
