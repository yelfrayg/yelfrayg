// Wenn der img-container in den Viewport kommt, soll die Animation starten

const imgContainer = document.querySelector(".img-wrapper");
const textParagraph = document.querySelector(".welcome-text-paragraph");
const textHeading = document.querySelector(".welcome-text-heading");
const keyPoints = document.querySelectorAll("[data-key]");
const keyPointsContainer = document.querySelector(".welcome-key-value");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                imgContainer.style.animation = "slide-in 1s ease-in-out";
                imgContainer.style.transform = "translate(0%, 0%)";
                imgContainer.style.opacity = "1";
            }, 500);
            setTimeout(() => {
                textHeading.style.animation = "fade-in 1s ease-in-out";
                textHeading.style.opacity = "1";
            }, 1000);
            setTimeout(() => {
                textParagraph.style.animation = "fade-in 1s ease-in-out";
                textParagraph.style.opacity = "1";
            }, 1300);
            setTimeout(() => {
                keyPointsContainer.style.animation = "expandX 1s ease-in-out";
                keyPointsContainer.style.width = "100%";
                keyPointsContainer.style.opacity = "1";
            }, 2000);
        }
    });
});

observer.observe(imgContainer);