import { database } from "./firebaseConfig.js";
import { ref, get, child } from "firebase/database";

const fetchUserById = async (userId) => {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val(); // Return user data if exists
    } else {
        return null; // User with specified ID does not exist
    }
};
