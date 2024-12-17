document.addEventListener('DOMContentLoaded', () => {
    // Table des Playermodels (Archer, Mage, Knight supprimés)
    const playermodels = [
        {
            name: "Eren Yeager S4",
            image: "images/playermodel1.png",
            description: "Eren Yeager S4 from Attack on Titan.",
            featured: true
        },
        {
            name: "Rigurd",
            image: "images/playermodel2.png",
            description: "Rigurd, a fierce warrior.",
            featured: true
        },
        {
            name: "Mei Mei",
            image: "images/playermodel3.png",
            description: "Mei Mei, the agile assassin.",
            featured: true
        }
        // Archer, Mage, Knight ont été supprimés
    ];

    // Fonction pour générer le slideshow dans la section Bienvenue
    function generateSlideshow() {
        const slideshowContainer = document.getElementById('slideshow-container');
        const dotContainer = document.getElementById('dot-container');
        let featuredCount = 0;

        playermodels.forEach((model, index) => {
            if (model.featured) {
                featuredCount++;
                // Créer la slide
                const slide = document.createElement('div');
                slide.classList.add('mySlides', 'fade');
                slide.innerHTML = `
                    <img src="${model.image}" alt="${model.name}" class="slide-image">
                    <div class="caption">${model.name}</div>
                `;
                slideshowContainer.appendChild(slide);

                // Créer le dot
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.setAttribute('data-slide', featuredCount);
                dotContainer.appendChild(dot);
            }
        });

        // Initialiser les slides
        showSlides(slideIndex);

        // Ajouter les écouteurs d'événements pour les dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideNumber = parseInt(dot.getAttribute('data-slide'));
                currentSlide(slideNumber);
                resetTimer();
            });
        });

        // Démarrer le changement automatique des slides
        startAutoSlide();
    }

    // Fonction pour générer les playermodels dans la galerie
    function generateGallery() {
        const gallery = document.getElementById('project-gallery');
        playermodels.forEach(model => {
            const item = document.createElement('div');
            item.classList.add('project-item');
            item.innerHTML = `
                <img src="${model.image}" alt="${model.name}" class="zoom-image">
                <p>${model.name}</p>
            `;
            gallery.appendChild(item);
        });

        // Ré-attacher les écouteurs d'événements pour les nouvelles images
        attachLightboxEvents();
    }

    // Fonction pour attacher les événements de Lightbox
    function attachLightboxEvents() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox .close');
        const images = document.querySelectorAll('.zoom-image');

        images.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.classList.add('show');
                lightboxImg.src = image.src;
                lightboxImg.alt = image.alt;
                lightbox.setAttribute('aria-hidden', 'false');
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('show');
            lightbox.setAttribute('aria-hidden', 'true');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== closeBtn) {
                lightbox.classList.remove('show');
                lightbox.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Gestion des onglets
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Retirer la classe active de tous les liens et contenus
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Ajouter la classe active au lien cliqué et afficher le contenu correspondant
            link.classList.add('active');
            const activeTab = link.getAttribute('data-tab');
            document.getElementById(activeTab).classList.add('active');
        });
    });

    // Fonctionnalité Slideshow Automatique avec Animation de Fondu
    let slideIndex = 1;
    let autoSlideInterval;

    function showSlides(n) {
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }
        if (slides[slideIndex-1]) {
            slides[slideIndex-1].style.display = "block";  
            dots[slideIndex-1].className += " active-dot";
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 7000); // 7000 ms = 7 secondes
    }

    function resetTimer() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Gestion du menu responsive
    const navToggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        menu.classList.toggle('open');
    });

    // Fermer le menu lorsqu'un lien est cliqué
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('open')) {
                navToggle.classList.remove('open');
                menu.classList.remove('open');
            }
        });
    });

    // Générer le Slideshow et la Galerie
    generateSlideshow();
    generateGallery();

    // Gestion de la localisation
    const translations = {
        'fr': {
            'title': "Portfolio - G'Playermodels",
            'logo': "<strong>G'Playermodels</strong>",
            'nav_toggle': "Ouvrir le menu",
            'nav_welcome': "Bienvenue",
            'nav_gallery': "Playermodels",
            'nav_contact': "Contact",
            'welcome_text': "Découvrez des <strong>playermodels</strong> uniques pour <strong>Garry's Mod</strong> qui donneront vie à vos jeux. Parcourez ma galerie et contactez-moi pour vos projets personnalisés !",
            'gallery_title': "- PLAYERMODELS -",
            'contact_title': "- CONTACT -",
            'contact_intro': "Vous souhaitez en savoir plus sur mes playermodels ou collaborer avec moi ? Contactez-moi via les moyens suivants :",
            'contact_email': "Email",
            'contact_email_text': "Envoyez-moi un message :",
            'contact_discord': "Discord",
            'contact_discord_text': "Rejoignez mon serveur :",
            'contact_join_discord': "Rejoindre le Discord",
            'contact_social': "Réseaux sociaux",
            'contact_social_text': "Suivez-moi pour plus d'actualités :",
            'footer_text': "&copy; 2024 G'Playermodels | Tous droits réservés"
        },
        'en': {
            'title': "Portfolio - G'Playermodels",
            'logo': "<strong>G'Playermodels</strong>",
            'nav_toggle': "Open menu",
            'nav_welcome': "Welcome",
            'nav_gallery': "Playermodels",
            'nav_contact': "Contact",
            'welcome_text': "Discover unique <strong>playermodels</strong> for <strong>Garry's Mod</strong> that will bring your games to life. Browse my gallery and contact me for your personalized projects!",
            'gallery_title': "- PLAYERMODELS -",
            'contact_title': "- CONTACT -",
            'contact_intro': "Do you want to know more about my playermodels or collaborate with me? Contact me through the following means:",
            'contact_email': "Email",
            'contact_email_text': "Send me a message:",
            'contact_discord': "Discord",
            'contact_discord_text': "Join my server:",
            'contact_join_discord': "Join Discord",
            'contact_social': "Social Networks",
            'contact_social_text': "Follow me for more updates:",
            'footer_text': "&copy; 2024 G'Playermodels | All rights reserved"
        },
        'es': {
            'title': "Portafolio - G'Playermodels",
            'logo': "<strong>G'Playermodels</strong>",
            'nav_toggle': "Abrir menú",
            'nav_welcome': "Bienvenido",
            'nav_gallery': "Playermodels",
            'nav_contact': "Contacto",
            'welcome_text': "Descubre <strong>playermodels</strong> únicos para <strong>Garry's Mod</strong> que darán vida a tus juegos. Explora mi galería y contáctame pour tus proyectos personalizados!",
            'gallery_title': "- PLAYERMODELS -",
            'contact_title': "- CONTACTO -",
            'contact_intro': "¿Quieres saber más sobre mis playermodels o colaborar conmigo? Contáctame a través de los siguientes medios:",
            'contact_email': "Correo electrónico",
            'contact_email_text': "Envíame un mensaje:",
            'contact_discord': "Discord",
            'contact_discord_text': "Únete a mi servidor:",
            'contact_join_discord': "Unirse a Discord",
            'contact_social': "Redes sociales",
            'contact_social_text': "Sígueme para más actualizaciones:",
            'footer_text': "&copy; 2024 G'Playermodels | Todos los derechos reservados"
        },
        'de': {
            'title': "Portfolio - G'Playermodels",
            'logo': "<strong>G'Playermodels</strong>",
            'nav_toggle': "Menü öffnen",
            'nav_welcome': "Willkommen",
            'nav_gallery': "Playermodels",
            'nav_contact': "Kontakt",
            'welcome_text': "Entdecken Sie einzigartige <strong>Playermodels</strong> für <strong>Garry's Mod</strong>, die Ihre Spiele zum Leben erwecken. Durchstöbern Sie meine Galerie und kontaktieren Sie mich für Ihre personalisierten Projekte!",
            'gallery_title': "- PLAYERMODELS -",
            'contact_title': "- KONTAKT -",
            'contact_intro': "Möchten Sie mehr über meine Playermodels erfahren oder mit mir zusammenarbeiten? Kontaktieren Sie mich über die folgenden Mittel:",
            'contact_email': "E-Mail",
            'contact_email_text': "Senden Sie mir eine Nachricht:",
            'contact_discord': "Discord",
            'contact_discord_text': "Treten Sie meinem Server bei:",
            'contact_join_discord': "Discord beitreten",
            'contact_social': "Soziale Netzwerke",
            'contact_social_text': "Folgen Sie mir für weitere Updates:",
            'footer_text': "&copy; 2024 G'Playermodels | Alle Rechte vorbehalten"
        }
        // Vous pouvez ajouter d'autres langues ici
    };

    function setLanguage(lang) {
        if (!translations[lang]) lang = 'fr';

        document.documentElement.lang = lang;

        // Mettre à jour les éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Mettre à jour les attributs aria-label
        document.querySelectorAll('[data-i18n-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-label');
            if (translations[lang][key]) {
                el.setAttribute('aria-label', translations[lang][key]);
            }
        });
    }

    const userLang = navigator.language || navigator.userLanguage;
    const shortLang = userLang.split('-')[0];

    setLanguage(shortLang);
});
