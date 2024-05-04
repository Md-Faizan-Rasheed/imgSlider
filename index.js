const initSlider = () => {
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const imgbox = document.querySelector(".imgbox");
    const scroll_thumb = document.querySelector(".scroll_thumb");
    let maxScrollLeft = imgbox.scrollWidth - imgbox.clientWidth;

    // handle Scroll bar thumb drag 
    scroll_thumb.addEventListener("mousedown",(e)=>{
        const startX = e.clientX;
        const thumbPosition = scroll_thumb.offsetLeft;
        

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Calculate the maximum thumb position based on slider width and thumb width
            const maxThumbPosition = imgbox.clientWidth - scroll_thumb.offsetWidth;
            console.log(imgbox.clientWidth);
            console.log(scroll_thumb.offsetWidth);

            // Ensure the new thumb position stays within bounds
            const boundedPosition = Math.max(0, Math.min(newThumbPosition, maxThumbPosition));
              const scrollPosition = (boundedPosition/maxThumbPosition) * maxScrollLeft;
            // Update the thumb position
            scroll_thumb.style.left = `${boundedPosition}px`; 

            imgbox.scrollLeft = scrollPosition;
        }

        // Remove the event listeners when mouse is released
        const handleMouseUp = ()=>{
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    right.addEventListener("click", () => {
        const scrollAmount = imgbox.clientWidth * 1;
        imgbox.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    left.addEventListener("click", () => {
        const scrollAmount = imgbox.clientWidth * -1;
        imgbox.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    const handleSlider = () => {
        const positions = imgbox.scrollLeft;
        const thumbPosition = (positions / maxScrollLeft) * (imgbox.clientWidth - scroll_thumb.offsetWidth);
        scroll_thumb.style.left = `${thumbPosition}px`;
    };

    const handleSlidButtons = () => {
        left.style.display = imgbox.scrollLeft <= 0 ? "none" : "block";
        right.style.display = imgbox.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    const updateMaxScrollLeft = () => {
        maxScrollLeft = imgbox.scrollWidth - imgbox.clientWidth;
        handleSlidButtons();
        handleSlider();
    };

    imgbox.addEventListener("scroll", () => {
        handleSlidButtons();
        handleSlider();
    });

    window.addEventListener("resize", updateMaxScrollLeft);
};

window.addEventListener("load", initSlider);
