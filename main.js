document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const balloons = document.querySelector('#balloons');
    const cake = document.querySelector('#cake');

    let bx = -280;
    let by = -40;
    let cx = 100;
    let cy = -10;

    setInterval(() => {
        if(bx < -180){
        bx += 1;
        }
        if(cx > 0){
            cx -= 1;
        }
        balloons.style.transform = `translate(${bx}px, ${by}px)`;
        cake.style.transform = `translate(${cx}px, ${cy}px)`;
    }, 15);  

    const form = document.querySelector(".form");
    const successMsg = document.querySelector("#success");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); 

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