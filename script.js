document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Barra de Progresso de Leitura
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 2. Mudança da Navbar ao rolar a página
    const nav = document.querySelector('#mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. Sistema Profissional de Animação de Entrada (Scroll Reveal)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // O elemento anima quando 15% dele aparece na tela
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    // Seleciona elementos individuais
    const singleElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    singleElements.forEach(el => observer.observe(el));

    // 4. Animação em Cascata (Stagger) para os Grids Lado a Lado
    const staggerContainers = document.querySelectorAll('.services-grid, .method-grid, .about-badges');
    
    staggerContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        
        const staggerObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                // Aplica um atraso matemático para cada item aparecer depois do outro
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 200); // 200 milissegundos de diferença entre cada card
                });
                staggerObserver.disconnect();
            }
        }, { threshold: 0.1 });

        staggerObserver.observe(container);
    });

});