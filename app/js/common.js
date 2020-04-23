$(function () {
        $(document).ready(function () {
            var $slider = $('.coaches__slider');
            var $sliderContainer = $('.coaches');

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
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: true,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 660,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            }
        })
});
