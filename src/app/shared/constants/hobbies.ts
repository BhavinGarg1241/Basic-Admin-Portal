import { Hobbies, UserHobbies } from "../models/common.model";
import { getRandomNumber } from "../utils/helper";
import { UsersData } from "./users";

export const hobbiesData: Hobbies[] = [
    { id: 1, name: "Reading" },
    { id: 2, name: "Cooking" },
    { id: 3, name: "Coding" },
    { id: 4, name: "Painting" },
    { id: 5, name: "Traveling" }
];

// Generate UserHobbies data
const UserHobbiesData: UserHobbies[] = [];

// Assign unique user IDs
let userIdCounter = 1;
for (const user of UsersData) {
    const userId = userIdCounter++;
    const assignedHobbies = new Set(); // To keep track of assigned hobbies for the current user

    // Generate a random number of hobbies for each user (between 1 and 3, for example)
    const numHobbies = getRandomNumber(1, 3);

    // Generate random hobby IDs and assign them to the user
    for (let i = 0; i < numHobbies; i++) {
        let hobbyId:number;
        do {
            const randomHobbyIndex = getRandomNumber(0, hobbiesData.length - 1);
            hobbyId = hobbiesData[randomHobbyIndex].id;
        } while (assignedHobbies.has(hobbyId)); // Check if the hobby has already been assigned

        // Add the hobby to the set of assigned hobbies
        assignedHobbies.add(hobbyId);

        // Add the hobby assignment to the data
        UserHobbiesData.push({ userId, hobbyId });
    }
}

export { UserHobbiesData };