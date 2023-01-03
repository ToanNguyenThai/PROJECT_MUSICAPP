import { getApp, getApps, initializeApp } from 'firebase/app'
//getApp để lấy thông tin, getApps để lấy danh sách những app đã tạo, initializeApp để khởi tạo hoặc trigger ứng dụng firebase
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_ID,
    appId: process.env.REACT_APP_FIREBASE_APPI_ID,
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig); //lấy thông tin
const storage = getStorage(app);

export { app, storage };