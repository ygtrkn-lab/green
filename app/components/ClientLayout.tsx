'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import NotificationPrompt from './NotificationPrompt'
import ComparisonToast from './ComparisonToast'
import CartToast from './CartToast'
import ComparisonDock from './ComparisonDock'
import { ComparisonProvider } from '../context/ComparisonContext'
import { CartProvider } from '../context/CartContext'

// Performans için sabit değerler
const SCROLL_THROTTLE = 16; // 60fps için optimum değer
const PARALLAX_INTENSITY = 0.15;
const OBSERVER_OPTIONS = {
  rootMargin: '50px 0px',
  threshold: 0
} as const;

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const rafId = useRef<number | null>(null);
  const lastScrollTime = useRef<number>(0);
  const parallaxElements = useRef<Set<HTMLElement>>(new Set());
  const observer = useRef<IntersectionObserver | null>(null);
  const isScrolling = useRef<boolean>(false);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Scroll progress güncellemesi
  const updateScrollProgress = useCallback(() => {
    if (!isBrowser) return;
    
    const progressElement = document.getElementById('scroll-progress');
    if (!progressElement) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = scrollTop / docHeight;
    
    progressElement.style.transform = `translate3d(0,0,0) scaleX(${scrolled})`;
  }, [isBrowser]);

  // Parallax efekti güncellemesi
  const updateParallax = useCallback(() => {
    if (!isBrowser || parallaxElements.current.size === 0) return;

    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;

    parallaxElements.current.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const speed = parseFloat(element.dataset.speed || '0.5');
        const yPos = -(scrollTop * speed * PARALLAX_INTENSITY);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });
  }, [isBrowser]);

  // Optimize edilmiş scroll handler
  const handleScroll = useCallback(() => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    rafId.current = requestAnimationFrame(() => {
      const now = performance.now();
      if (now - lastScrollTime.current >= SCROLL_THROTTLE) {
        updateScrollProgress();
        updateParallax();
        lastScrollTime.current = now;
      }
      isScrolling.current = false;
    });
  }, [updateScrollProgress, updateParallax]);

  // Parallax elementlerinin başlatılması
  const initParallax = useCallback(() => {
    if (!isBrowser) return;

    const elements = document.querySelectorAll<HTMLElement>('.parallax');
    if (elements.length === 0) return;

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          parallaxElements.current.add(element);
        } else {
          parallaxElements.current.delete(element);
        }
      });
    }, OBSERVER_OPTIONS);

    elements.forEach(el => observer.current?.observe(el));
  }, []);

  // Anchor tıklama işleyicisi
  const handleAnchorClick = useCallback((e: Event) => {
    if (!isBrowser) return;

    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (!anchor) return;
    
    e.preventDefault();
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const targetElement = document.querySelector(href);
    if (!targetElement) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    targetElement.scrollIntoView({ 
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;

    // Event listener'ların eklenmesi
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleAnchorClick, { passive: false });

    // Parallax başlatma
    initParallax();

    // Cleanup
    return () => {
      if (isBrowser) {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('click', handleAnchorClick);
        
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        
        if (observer.current) {
          observer.current.disconnect();
        }

        parallaxElements.current.clear();
      }
    }
  }, [handleScroll, handleAnchorClick, initParallax, isBrowser]);

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <CartProvider>
        <ComparisonProvider>
          <>
            {children}
            <NotificationPrompt />
            <ComparisonDock />
            <ComparisonToast />
            <CartToast />
          </>
        </ComparisonProvider>
      </CartProvider>
    </SessionProvider>
  );
}
