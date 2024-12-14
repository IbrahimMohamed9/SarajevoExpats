"use client";

import { useState, useRef, useEffect } from "react";
import { IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const Carousel = ({ items, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [startClientX, setStartClientX] = useState(0);
  const [lastClientX, setLastClientX] = useState(0);
  const [dragVelocity, setDragVelocity] = useState(0);
  const containerRef = useRef(null);
  const lastTimeRef = useRef(Date.now());
  const velocityTracker = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = 216;
      const newItemsPerView = Math.max(3, Math.floor((containerWidth) / itemWidth));
      setItemsPerView(newItemsPerView % 2 === 0 ? newItemsPerView + 1 : newItemsPerView);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => {
      window.removeEventListener("resize", updateItemsPerView);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const maxIndex = Math.max(0, items.length - 1);
  const slideWidth = 216;
  const slideGap = 16; 
  const containerPadding = containerRef.current ? (containerRef.current.offsetWidth - slideWidth) / 2 : 0;

  const getTranslateX = (index) => {
    return -(index * (slideWidth + slideGap)) + containerPadding;
  };

  const updateVelocity = (clientX) => {
    const now = Date.now();
    const deltaTime = now - lastTimeRef.current;
    const deltaX = clientX - lastClientX;
    
    if (deltaTime > 0) {
      const velocity = deltaX / deltaTime;
      velocityTracker.current.push(velocity);
      if (velocityTracker.current.length > 5) {
        velocityTracker.current.shift();
      }
      const avgVelocity = velocityTracker.current.reduce((a, b) => a + b, 0) / velocityTracker.current.length;
      setDragVelocity(avgVelocity);
    }
    
    setLastClientX(clientX);
    lastTimeRef.current = now;
  };

  const handleDragStart = (e) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsDragging(true);
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setStartX(clientX);
    setStartClientX(clientX);
    setLastClientX(clientX);
    setDragVelocity(0);
    velocityTracker.current = [];
    setCurrentTranslate(getTranslateX(currentIndex));
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    updateVelocity(clientX);
    
    const currentX = clientX;
    const diff = currentX - startX;
    // Decreased drag speed from 1.0 to 0.4 for more controlled movement
    const newTranslate = currentTranslate + diff * 0.4;
    
    const slidePosition = -newTranslate + containerPadding;
    const nearestSlide = Math.round(slidePosition / (slideWidth + slideGap));
    const newIndex = Math.max(0, Math.min(maxIndex, nearestSlide));
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
    
    if (newTranslate > containerPadding) {
      const overscroll = newTranslate - containerPadding;
      const dampedTranslate = containerPadding + (overscroll * Math.exp(-overscroll / 500));
      setCurrentTranslate(dampedTranslate);
    } else if (newTranslate < getTranslateX(maxIndex)) {
      const overscroll = newTranslate - getTranslateX(maxIndex);
      const dampedTranslate = getTranslateX(maxIndex) + (overscroll * Math.exp(overscroll / 500));
      setCurrentTranslate(dampedTranslate);
    } else {
      setCurrentTranslate(newTranslate);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const velocityThreshold = 0.2;
    const velocityMultiplier = 100;
    const projectedTranslate = currentTranslate + (dragVelocity * velocityMultiplier);
    const projectedSlide = Math.round((-projectedTranslate + containerPadding) / (slideWidth + slideGap));
    
    let targetIndex;
    if (Math.abs(dragVelocity) > velocityThreshold) {
      targetIndex = Math.max(0, Math.min(maxIndex, projectedSlide));
    } else {
      targetIndex = currentIndex;
    }
    
    animateToIndex(targetIndex);
  };

  const animateToIndex = (targetIndex) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTranslate = currentTranslate;
    const targetTranslate = getTranslateX(targetIndex);
    const startTime = performance.now();
    const duration = 2000;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      const easeProgress = progress === 1 
        ? 1 
        : 1 - Math.pow(2, -8 * progress) * Math.cos(progress * Math.PI * 0.3) * Math.exp(-progress);
      
      const currentPosition = startTranslate + (targetTranslate - startTranslate) * easeProgress;
      setCurrentTranslate(currentPosition);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentIndex(targetIndex);
        animationRef.current = null;
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex && !isDragging) {
      animateToIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0 && !isDragging) {
      animateToIndex(currentIndex - 1);
    }
  };

  return (
    <div 
      className="relative w-full group select-none overflow-hidden"
      ref={containerRef}
    >
      <div 
        className="relative h-full"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onTouchCancel={handleDragEnd}
      >
        <div
          className="flex gap-4 transform-gpu"
          style={{
            transform: `translateX(${currentTranslate}px)`,
            width: `${items.length * (slideWidth + slideGap)}px`,
            // Decreased slide transition from 2000ms to 800ms
            transition: isDragging ? 'none' : 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {items.map((item, index) => {
            const isActive = index === currentIndex;
            const distance = Math.abs(index - currentIndex);
            
            return (
              <div
                key={index}
                className="flex-shrink-0 w-[200px] relative"
                style={{
                  zIndex: isActive ? 10 : 5 - distance,
                }}
              >
                <div
                  style={{
                    transform: isDragging 
                      ? 'scale(1)'
                      : isActive 
                        ? 'scale(1.02)'
                        : distance === 1
                          ? 'scale(0.98)'
                          : distance === 2
                            ? 'scale(0.96)'
                            : 'scale(0.94)',
                    filter: isDragging
                      ? 'brightness(0.95)'
                      : isActive
                        ? 'brightness(1)'
                        : distance === 1
                          ? 'brightness(0.95)'
                          : distance === 2
                            ? 'brightness(0.9)'
                            : 'brightness(0.85)',
                    boxShadow: isActive && !isDragging ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
                    // Decreased visual transitions from 400ms to 250ms
                    transition: 'transform 250ms ease-out, filter 250ms ease-out, box-shadow 250ms ease-out',
                    transformOrigin: index <= currentIndex ? 'left center' : 'right center',
                  }}
                >
                  {renderItem(item)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 flex items-center">
          {currentIndex > 0 && !isDragging && (
            <IconButton
              onClick={handlePrev}
              className="pointer-events-auto ml-2 bg-white/80 text-main hover:bg-main hover:text-white shadow-md z-10 transition-all duration-300"
              size="small"
            >
              <NavigateBeforeIcon />
            </IconButton>
          )}
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          {currentIndex < maxIndex && !isDragging && (
            <IconButton
              onClick={handleNext}
              className="pointer-events-auto mr-2 bg-white/80 text-main hover:bg-main hover:text-white shadow-md z-10 transition-all duration-300"
              size="small"
            >
              <NavigateNextIcon />
            </IconButton>
          )}
        </div>
      </div>

      <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-1.5">
        {Array.from({ length: Math.min(7, items.length) }).map((_, i) => {
          const totalSections = Math.ceil(items.length / Math.max(1, Math.floor((items.length - 1) / 6)));
          const currentSection = Math.floor(currentIndex / totalSections);
          const dotIndex = Math.min(items.length - 1, i * totalSections);
          
          return (
            <button
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSection === i
                  ? "bg-main w-4"
                  : Math.abs(currentSection - i) === 1
                  ? "bg-main/60 w-2"
                  : "bg-gray-300 w-2 hover:bg-main/40"
              }`}
              onClick={() => !isDragging && animateToIndex(dotIndex)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
