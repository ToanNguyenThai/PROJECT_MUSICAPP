import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
    { id: 2, name: "Rap", value: "rap" },
    { id: 3, name: "Melody", value: "melody" },
    { id: 4, name: "Rock", value: "rock" },
    { id: 5, name: "Karaoke", value: "karaoke" },
];

export const filterByLanguage = [
    { id: 1, name: "VietNam", value: "vietnam" },
    { id: 2, name: "English", value: "english" },
    { id: 3, name: "Japanese", value: "japanese" },
    { id: 4, name: "Chinese", value: "chinese" },
    { id: 5, name: "Korean", value: "korean" },
];

export const deleteAnObject = (referenceUrl) => {
    const deleteRef = ref(storage, referenceUrl);
    deleteObject(deleteRef)
        .then(() => {
            return true;
        })
        .catch((error) => {
            return false;
        });
};