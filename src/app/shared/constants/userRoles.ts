import { Roles, UserRoles } from "../models/common.model";

export const rolesData: Roles[] = [
    {
        id: 1,
        name: "Admin"
    },
    {
        id: 2,
        name: "Teacher"
    },
    {
        id: 3,
        name: "Student"
    }
];

export const userRolesData: UserRoles[] = [
    // Two admin users
    { userId: 1, roleId: 1 }, // Assuming admin roles have ID 1
    { userId: 2, roleId: 1 },

    // Four teacher users
    { userId: 3, roleId: 2 }, // Assuming teacher roles have ID 2
    { userId: 4, roleId: 2 },
    { userId: 5, roleId: 2 },
    { userId: 6, roleId: 2 },

    // Nine student users
    { userId: 7, roleId: 3 }, // Assuming student roles have ID 3
    { userId: 8, roleId: 3 },
    { userId: 9, roleId: 3 },
    { userId: 10, roleId: 3 },
    { userId: 11, roleId: 3 },
    { userId: 12, roleId: 3 },
    { userId: 13, roleId: 3 },
    { userId: 14, roleId: 3 },
    { userId: 15, roleId: 3 },
]