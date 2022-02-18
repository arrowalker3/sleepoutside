function numberMinMaxCycle(number, min, max) {
    if (number < min) {
        number = max;
    } else if (number > max) {
        number = min;
    }

    return number;
}

function imageCarouselCallback(clone, imageData) {
  // Set the src to url and alt to name of product
  const imageElement = clone.querySelector(".image-actual");
  imageElement.src = imageData.Src;
  imageElement.alt = imageData.Title;

  return clone;
}

export default class SlideController {
    constructor() {
        this.slideIndex = 0;
        this.slideList = [];
    }

    init() {
        // Whatever is needed
    }

    primeSlideController(slideClassName) {
        // get slides
        this.slideList = document.querySelectorAll(slideClassName);

        if (this.slideList.length > 1) {
            const prev = document.querySelector(".prev");
            const next = document.querySelector(".next");
            
            // Add click events to arrows
            prev.addEventListener("click", this.plusSlides.bind(this, -1));
            next.addEventListener("click", this.plusSlides.bind(this, 1));

            // show arrows
            prev.classList.remove("hide");
            next.classList.remove("hide");
        }

        this.updateSlides();
    }

    plusSlides(n) {
        console.log(n);

        const oldIndex = this.slideIndex;

        this.slideIndex += n;
        
        // Check range of slideIndex
        this.slideIndex = numberMinMaxCycle(this.slideIndex, 0, this.slideList.length - 1);

        if (oldIndex !== this.slideIndex) {
            // show slides
            this.updateSlides();
        }
    }

    jumpToSlide(n) {
        // Check range of n
        n = numberMinMaxCycle(n, 0, this.slideList.length - 1);

        // only update if change
        if (n !== this.slideIndex) {
            this.slideIndex = n;
    
            // Update
            this.updateSlides();
        }

    }

    updateSlides() {
        // Hide all images
        this.slideList.forEach(element => {
            element.classList.add("hide");
        });

        // Show current image
        this.slideList[this.slideIndex].classList.remove("hide");
    }
}