const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=1600&fit=crop', thumb: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=120&h=120&fit=crop', alt: 'Urban Planning' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop', thumb: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=120&h=120&fit=crop', alt: 'City View' },
    { src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=1800&fit=crop', thumb: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=120&h=120&fit=crop', alt: 'Cityscape' },
    { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop', thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=120&h=120&fit=crop', alt: 'Buildings' },
    { src: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1200&h=1400&fit=crop', thumb: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=120&h=120&fit=crop', alt: 'Architecture' },
    { src: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&h=800&fit=crop', thumb: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=120&h=120&fit=crop', alt: 'Urban' },
    { src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=1600&fit=crop', thumb: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=120&h=120&fit=crop', alt: 'City Life' },
    { src: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?w=1200&h=800&fit=crop', thumb: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?w=120&h=120&fit=crop', alt: 'Skyline' },
    { src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&h=1200&fit=crop', thumb: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=120&h=120&fit=crop', alt: 'Map' },
    { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=1800&fit=crop', thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=120&h=120&fit=crop', alt: 'Planning' },
    { src: 'https://images.unsplash.com/photo-1512921514218-52d31e400e1b?w=1200&h=800&fit=crop', thumb: 'https://images.unsplash.com/photo-1512921514218-52d31e400e1b?w=120&h=120&fit=crop', alt: 'City View' },
    { src: 'https://images.unsplash.com/photo-1479839672679-a455b180eda7?w=1200&h=1400&fit=crop', thumb: 'https://images.unsplash.com/photo-1479839672679-a455b180eda7?w=120&h=120&fit=crop', alt: 'Architecture' }
];

// Populate gallery
const galleryGrid = document.getElementById('galleryGrid');
galleryImages.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="${img.src.replace('w=1200', 'w=600').replace('h=1600', 'h=800').replace('h=1800', 'h=900').replace('h=1400', 'h=700')}" alt="${img.alt}">`;
    item.addEventListener('click', () => openModal(index));
    galleryGrid.appendChild(item);
});

// Populate modal thumbnails
galleryImages.forEach((img, index) => {
    const thumb = document.createElement('div');
    thumb.className = 'modal-thumb';
    thumb.innerHTML = `<img src="${img.thumb}" alt="${img.alt}">`;
    thumb.addEventListener('click', () => openModal(index));
    modalThumbnails.appendChild(thumb);
});

let currentIndex = 0;
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalThumbnails = document.getElementById('modalThumbnails');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

function openModal(index) {
    currentIndex = index;
    updateModal();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateModal() {
    const img = galleryImages[currentIndex];
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    
    document.querySelectorAll('.modal-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === currentIndex);
    });
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModal();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateModal();
}

modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', prevImage);
modalNext.addEventListener('click', nextImage);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
});

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
});

// Observe spec cards
document.querySelectorAll('.spec-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Add visible styles
const style = document.createElement('style');
style.textContent = `
    .project-card.visible, .spec-card.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
