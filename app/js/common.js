$(document).ready(function () {
    var $slider = $('.slider');
    var $sliderContainer = $('.section');
    if ($slider.length) {
        var currentSlide;
        var slidesCount;
        var sliderCounter = document.createElement('div');
        sliderCounter.classList.add('slider-counter');

        var updateSliderCounter = function (slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = slick.slideCount;
            $(sliderCounter).text(currentSlide + ' of ' + slidesCount)
        };

        $slider.on('init', function (event, slick) {
            $sliderContainer.append(sliderCounter);
            updateSliderCounter(slick);
        });

        $slider.on('afterChange', function (event, slick, currentSlide) {
            updateSliderCounter(slick, currentSlide);
        });

        $slider.slick({
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            adaptiveHeight: true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1.2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 651,
                    settings: {
                        slidesToShow: 1.2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    }

    var $servicesSlider = $('.our-services');
    $servicesSlider.slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2.2,
                    dots: true
                }
            },
            {
                breakpoint: 651,
                settings: {
                    slidesToShow: 1.2,
                    dots: true

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.2,
                }
            }
        ]
    });
});
