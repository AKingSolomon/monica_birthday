import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVOqPtwjxo3Hbi2Rf_tlZjxhSZS1lzmqI",
  authDomain: "monica-birthday.firebaseapp.com",
  projectId: "monica-birthday",
  storageBucket: "monica-birthday.firebasestorage.app",
  messagingSenderId: "159224805904",
  appId: "1:159224805904:web:215d422dc75a7cb0ca6895"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM fully loaded and parsed");

    const container = document.getElementById("cards_container");
    if(container){
        // ✅ Load existing messages
        const querySnapshot = await getDocs(collection(db, "messages"));

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            const card = document.createElement("div");
            card.innerHTML = `
                <h3>${data.name}</h3>
                <p>${data.message}</p>
            `;

            container.appendChild(card);
        });
    }

    // ✅ Form handling
    const form = document.querySelector(".form");
    if(form){
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.querySelector("#name_box").value;
            const message = document.querySelector("#message_box").value;

            try {
                await addDoc(collection(db, "messages"), {
                    name,
                    message,
                    createdAt: Date.now()
                });

                document.getElementById("success").style.display = "block";
                form.reset();
            } catch (err) {
                console.error("Error adding document:", err);
            }
        });
    }

    console.log("DOM fully loaded and parsed");
    
    const instructions_button = document.getElementById("instructions_button");
    const instructions = document.getElementById("instructions");
    const note_title = document.getElementById("note_title");

    if (instructions_button && instructions && note_title) {
        instructions_button.addEventListener("click", () => {
            instructions.style.display = "none";
            note_title.style.display = "flex";
        });
    }

    const yes_monica = document.getElementById("yesMonica");
    const no_monica = document.getElementById("noMonica");

    const ask_monica = document.getElementById("askMonica");
    const check_monica = document.getElementById("checkMonica");
    const monica_password= document.getElementById("monica_password");

    const not_monica = document.getElementById("notMonica");
    const is_monica = document.getElementById("isMonica");

    const password = "password";

    if(yes_monica){
        yes_monica.addEventListener("click", () =>{
            ask_monica.style.display = "none";
            is_monica.style.display = "none";
            not_monica.style.display = "none";
            check_monica.style.display = "flex";
        })
        monica_password.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const entered = monica_password.value;

                if(entered == password){
                    ask_monica.style.display = "none";
                    is_monica.style.display = "flex";
                    not_monica.style.display = "none";
                    check_monica.style.display = "none";
                }
                else{
                    ask_monica.style.display = "none";
                    is_monica.style.display = "none";
                    not_monica.style.display = "flex";
                    check_monica.style.display = "none";
                }
            }
        });
    }
    if(no_monica){
        no_monica.addEventListener("click", () =>{
            ask_monica.style.display = "none";
            is_monica.style.display = "none";
            not_monica.style.display = "flex";
            check_monica.style.display = "none";
        })
    }
});