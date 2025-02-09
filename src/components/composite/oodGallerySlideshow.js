import React, { useState, useRef } from 'react';
import SbEditable from 'storyblok-react';
import AspectRatioImage from '../media/aspectRatioImage';
import Slider from 'react-slick';
import Modal from './modal';
import RichTextField from '../../utilities/richTextField';
import 'slick-carousel/slick/slick.css';

const oodGallerySlideshow = ({ blok }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [pagerOffset, setPagerOffset] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const pagerWindow = React.createRef();
  const pager = React.createRef();
  const expandButton = React.createRef();
  const slideshow = useRef(null);
  const modalSlideshow = useRef(null);

  const sliderSettings = {
    arrows: false,
    accessibility: true,
    lazyLoad: true,
    // This provides the JSX template for the lower half of the slider.
    /* eslint-disable-next-line react/display-name */
    appendDots: (dots) => {
      return (
        <div>
          {(blok.showCounter || blok.showExpandLink) && (
            <div className="gallery-slideshow--infobar">
              {blok.showCounter && (
                <div className="gallery-slideshow--counter">
                  {`${activeSlide + 1}/${blok.slides.length}`}
                  <span className="sr-only">{`Slide ${activeSlide + 1} of ${
                    blok.slides.length
                  }`}</span>
                </div>
              )}

              {blok.showExpandLink && (
                <div className="gallery-slideshow--expand">
                  <button
                    onClick={openModal}
                    className="gallery-slideshow--expand-btn"
                    aria-label="Expand gallery"
                    ref={expandButton}
                  >
                    Expand <i className="fas fa-expand" aria-hidden="true"></i>
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="gallery-slideshow--caption">
            <RichTextField data={blok.slides[activeSlide]['caption']} />
          </div>

          <div className="gallery-slideshow--controls">
            <button className="gallery-slideshow--prev" onClick={clickPrev}>
              <span className="sr-only">Previous Slide</span>
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
            </button>
            <div
              className={`gallery-slideshow--pager-window ${
                showOverlay ? 'overlay' : ''
              }`}
              ref={pagerWindow}
            >
              <ul
                className="gallery-slideshow--pager"
                ref={pager}
                style={{ transform: `translateX(${pagerOffset}px)` }}
              >
                {dots}
              </ul>
            </div>
            <button className="gallery-slideshow--next" onClick={clickNext}>
              <span className="sr-only">Next Slide</span>
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      );
    },
    /* eslint-disable-next-line react/display-name */
    customPaging: (i) => {
      const slide = blok.slides[i];
      return (
        <div className="gallery-slideshow--thumbnail" key={slide._uid}>
          <AspectRatioImage
            blok={blok}
            filename={slide.image.filename}
            alt={slide.image.alt}
            classPrefix={'ood-gallery-slide'}
            aspectRatio="16x9"
            imageSize="thumbnail"
          />
        </div>
      );
    },
    afterChange: (i) => {
      setActiveSlide(i);
      adjustPagerPosition();
    },
    dots: true,
    dotsClass: 'gallery-slideshow--bottom',
  };

  const modalSliderSettings = {
    nextArrow: (
      <button>
        <span className="sr-only">Next Slide</span>
        <i className="fas fa-chevron-right" aria-hidden="true"></i>
      </button>
    ),
    prevArrow: (
      <button>
        <span className="sr-only">Previous Slide</span>
        <i className="fas fa-chevron-left" aria-hidden="true"></i>
      </button>
    ),
    afterChange: (i) => {
      setActiveSlide(i);
    },
    initialSlide: activeSlide,
  };

  const adjustPagerPosition = () => {
    const windowBox = pagerWindow.current.getBoundingClientRect();
    const pagerBox = pager.current.getBoundingClientRect();
    const activeItem =
      pagerWindow.current.getElementsByClassName('slick-active')[0];
    const activeItemBox = activeItem.getBoundingClientRect();

    if (activeItemBox.right > windowBox.right) {
      const rightGutter = 26;
      const currentOffset = pagerBox.left - windowBox.left;
      const newOffset =
        currentOffset + (windowBox.right - activeItemBox.right) - rightGutter;
      setPagerOffset(newOffset);
      setShowOverlay(false);
    } else if (activeItemBox.left < windowBox.left) {
      const currentOffset = pagerBox.left - windowBox.left;
      const newOffset = currentOffset + (windowBox.left - activeItemBox.left);
      setPagerOffset(newOffset);
      setShowOverlay(true);
    }
  };

  const clickPrev = () => {
    slideshow.current.slickPrev();
  };

  const clickNext = () => {
    slideshow.current.slickNext();
  };

  const closeModal = () => {
    setModalOpen(false);
    if (expandButton.current) {
      expandButton.current.focus();
    }
    slideshow.current.slickGoTo(activeSlide, true);
  };
  const openModal = () => {
    modalSlideshow.current.slickGoTo(activeSlide, true);
    setModalOpen(true);
  };

  return (
    <SbEditable content={blok}>
      <section
        aria-label={blok.ariaLabel}
        className={`gallery-slideshow
        ${
          !blok.showCounter && !blok.showExpandLink
            ? 'gallery-slideshow--minimal'
            : ''
        }
        ${blok.spacingTop !== 'none' ? `su-pt-${blok.spacingTop}` : ''}
        ${blok.spacingBottom !== 'none' ? `su-pb-${blok.spacingBottom}` : ''}
        ${
          blok.backgroundColor
            ? `su-bg-${blok.backgroundColor}`
            : 'su-bg-transparent'
        }
        ${
          blok.containerWidth == 'constrain-max-width'
            ? 'centered-container'
            : ''
        }
      `}
      >
        <div
          className={`gallery-slideshow--inner su-mx-auto
          ${
            blok.containerWidth == 'constrain-max-width'
              ? 'flex-md-10-of-12 flex-xl-8-of-12'
              : ''
          }
        `}
        >
          <Slider
            className="gallery-slideshow--slides"
            ref={slideshow}
            {...sliderSettings}
          >
            {blok.slides.map((slide, index) => {
              return (
                <div
                  className="gallery-slideshow--slide"
                  index={index}
                  key={slide._uid}
                >
                  <AspectRatioImage
                    blok={blok}
                    filename={slide.image.filename}
                    alt={slide.image.alt}
                    classPrefix={'ood-gallery-slide'}
                    aspectRatio="16x9"
                    imageSize="gallery-slide"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        outerContainerClasses="centered-container flex-container su-pt-1"
        innerContainerClasses="su-pt-2"
        ariaLabel={blok.ariaLabel + ' full screen view'}
      >
        <div className="gallery-slideshow--modal-wrapper">
          <Slider
            className="gallery-slideshow--modal"
            ref={modalSlideshow}
            {...modalSliderSettings}
          >
            {blok.slides.map((slide, index) => {
              return (
                <div
                  className="gallery-slideshow--slide"
                  index={index}
                  key={slide._uid}
                >
                  <AspectRatioImage
                    blok={blok}
                    filename={slide.image.filename}
                    alt={slide.image.alt}
                    classPrefix={'ood-gallery-slide'}
                    aspectRatio="16x9"
                    imageSize="gallery-slide"
                  />
                </div>
              );
            })}
          </Slider>
          <div className="gallery-slideshow--infobar">
            <div
              className="gallery-slideshow--counter"
              aria-label={`Slide ${activeSlide + 1} of ${blok.slides.length}`}
            >
              {`${activeSlide + 1}/${blok.slides.length}`}
            </div>
            <div className="gallery-slideshow--caption">
              <RichTextField data={blok.slides[activeSlide]['caption']} />
            </div>
          </div>
        </div>
      </Modal>
    </SbEditable>
  );
};

export default oodGallerySlideshow;
