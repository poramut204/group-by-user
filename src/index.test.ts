import { groupByDepartment, User, GroupedByDepartment } from './index';

test('should group users by department', () => {
    const users: User[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', department: 'Engineering' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', department: 'Engineering' },
        { id: 3, firstName: 'Mike', lastName: 'Taylor', department: 'HR' },
    ];

    const result: GroupedByDepartment = groupByDepartment(users);

    expect(result['Engineering']).toHaveLength(2);
    expect(result['HR']).toHaveLength(1);
});
