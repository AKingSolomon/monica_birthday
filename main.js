document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const balloons = document.querySelector('#balloons');
    const cake = document.querySelector('#cake');

    let bx = -300;
    let by = -40;
    let cx = 100;
    let cy= 0;

    setInterval(() => {
        if(bx < -240){
        bx += 1;
        }
        if(cx > 40){
            cx -= 1;
        }
        balloons.style.transform = `translate(${bx}px, ${by}px)`;
        cake.style.transform = `translate(${cx}px, ${cy}px)`;
    }, 15);  
    const form = document.querySelector(".contact_form");
    const successMsg = document.querySelector("#success");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // 🚫 stops redirect

        const formData = new FormData(form);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            successMsg.style.display = "block";
            form.reset();
        }
    });
    
});