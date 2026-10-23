
const viewport = document.querySelector(".book-viewport");
const track = document.querySelector(".book-track");
const cards = [...document.querySelectorAll(".book-card")];
const dots = [...document.querySelectorAll(".book-dot")];
const prevBtn = document.querySelector(".book-arrow.prev");
const nextBtn = document.querySelector(".book-arrow.next");

let currentIndex = 0;
let autoSlide;

function goToBook(index) {
    currentIndex = (index + cards.length) % cards.length;

    const card = cards[currentIndex];

    viewport.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: "smooth"
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

function startAutoSlide() {
    clearInterval(autoSlide);

    autoSlide = setInterval(() => {
        goToBook(currentIndex + 1);
    }, 5000);
}

prevBtn.addEventListener("click", () => {
    goToBook(currentIndex - 1);
    startAutoSlide();
});

nextBtn.addEventListener("click", () => {
    goToBook(currentIndex + 1);
    startAutoSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        goToBook(index);
        startAutoSlide();
    });
});

// Keep track of manual scrolling and swiping.
let scrollTimeout;

viewport.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        const viewportPosition = viewport.scrollLeft + 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
            const distance = Math.abs(
                card.offsetLeft - track.offsetLeft - viewportPosition
            );

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        currentIndex = closestIndex;

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }, 100);
});

startAutoSlide();
