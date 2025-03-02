import { groupByDepartment, User } from './index';

test('should correctly group users by department and generate summary', () => {
    const users: User[] = [
        {
            id: 1,
            firstName: 'Emily',
            lastName: 'Johnson',
            gender: 'female',
            age: 28,
            hair: { color: 'Brown', type: 'Curly' },
            address: { postalCode: '37657' },
            company: { department: 'Engineering' },
        },
        {
            id: 2,
            firstName: 'John',
            lastName: 'Doe',
            gender: 'male',
            age: 34,
            hair: { color: 'Blond', type: 'Straight' },
            address: { postalCode: '75001' },
            company: { department: 'Engineering' },
        },
        {
            id: 3,
            firstName: 'Jane',
            lastName: 'Smith',
            gender: 'female',
            age: 40,
            hair: { color: 'Chestnut', type: 'Straight' },
            address: { postalCode: '29112' },
            company: { department: 'HR' },
        },
    ];

    const result = groupByDepartment(users);

    expect(result['Engineering']).toBeDefined();
    expect(result['HR']).toBeDefined();

    expect(result['Engineering'].male).toBe(1);
    expect(result['Engineering'].female).toBe(1);
    expect(result['HR'].male).toBe(0);
    expect(result['HR'].female).toBe(1);

    expect(result['Engineering'].ageRange).toBe('30-39');
    expect(result['HR'].ageRange).toBe('40-49');

    expect(result['Engineering'].hair['Brown']).toBe(1);
    expect(result['Engineering'].hair['Blond']).toBe(1);
    expect(result['HR'].hair['Chestnut']).toBe(1);

    expect(result['Engineering'].addressUser['EmilyJohnson']).toBe('37657');
    expect(result['Engineering'].addressUser['JohnDoe']).toBe('75001');
    expect(result['HR'].addressUser['JaneSmith']).toBe('29112');
});
