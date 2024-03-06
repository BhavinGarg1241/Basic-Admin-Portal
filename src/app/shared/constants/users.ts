import { User } from "../models/common.model";
import { randomDate } from "../utils/helper";

// To generate random dates of birth within a reasonable range
const startDate = new Date(1980, 0, 1);
const endDate = new Date(2005, 11, 31);

export const UsersData: User[] = [
    // Two admin users
    { name: "Admin 1", email: "admin1@example.com", password: "admin123", gender: "Male", dob: randomDate(startDate, endDate) },
    { name: "Admin 2", email: "admin2@example.com", password: "admin456", gender: "Female", dob: randomDate(startDate, endDate) },

    // Four teacher users
    { name: "Teacher 1", email: "teacher1@example.com", password: null, gender: "Male", dob: randomDate(startDate, endDate) },
    { name: "Teacher 2", email: "teacher2@example.com", password: null, gender: "Female", dob: randomDate(startDate, endDate) },
    { name: "Teacher 3", email: "teacher3@example.com", password: null, gender: "Male", dob: randomDate(startDate, endDate) },
    { name: "Teacher 4", email: "teacher4@example.com", password: null, gender: "Female", dob: randomDate(startDate, endDate) },

    // Nine student users
    { name: "Student 1", email: "student1@example.com", password: null, gender: "Male", dob: randomDate(startDate, endDate) },
    { name: "Student 2", email: "student2@example.com", password: null, gender: "Female", dob: randomDate(startDate, endDate) },
    { name: "Student 3", email: "student3@example.com", password: null, gender: "Male", dob: randomDate(startDate, endDate) },
    { name: "Student 4", email: "student4@example.com", password: null, gender: "Female", dob: randomDate(startDate, endDate) },
    { name: "Student 5", email: "student5@example.com", password: null, gender: "Male", dob: randomDate(startDate, endDate) },
    { name: "Student 6", email: "student6@example.com", password: null, gender: "Female", dob: randomDate(startDate, endDate) },
    { name: "Student 7", email: "student7@example.com", password: null, gender: "Male", dob: randomDate(startDate, endDate) },
    { name: "Student 8", email: "student8@example.com", password: null, gender: "Female", dob: randomDate(startDate, endDate) },
    { name: "Student 9", email: "student9@example.com", password: null, gender: "Male", dob: randomDate(startDate, endDate) },
]