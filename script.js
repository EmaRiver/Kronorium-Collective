 document.addEventListener('DOMContentLoaded', function() {
            const header = document.getElementById('header');
            const scrollIndicator = document.getElementById('scrollIndicator');
            const mainTitle = document.getElementById('mainTitle');
            const logo = document.getElementById('logo');
            const upIcon = document.getElementById('upIcon');
            const spheres = document.querySelectorAll('.sphere');
            const submenus = document.querySelectorAll('.submenu');
            const contentSections = document.querySelectorAll('.content-section');
            
            // Función para contraer el header
            function contraerHeader() {
                header.classList.add('contraido');
                mainTitle.style.opacity = '0';
            }
            
            // Función para expandir el header y volver al inicio
            function expandirHeader() {
                header.classList.remove('contraido');
                mainTitle.style.opacity = '1';
                
                // Oculta todas las secciones de contenido y muestra la predeterminada
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById('defaultContent').classList.add('active');
                
                // Cierra todos los submenús
                submenus.forEach(menu => {
                    menu.classList.remove('active');
                });
                
                // Desplaza hacia arriba
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
            // Contrae el header al hacer clic en él o en el indicador de scroll
            header.addEventListener('click', contraerHeader);
            scrollIndicator.addEventListener('click', contraerHeader);
            
            // Expande el header al hacer clic en el logo o en el icono de subir
            logo.addEventListener('click', function(e) {
                e.stopPropagation();
                expandirHeader();
            });
            
            upIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                expandirHeader();
            });
            
            // También contrae el header al hacer scroll
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100 && !header.classList.contains('contraido')) {
                    contraerHeader();
                }
            });
            
            // Abre/cierra submenús al hacer clic en las esferas
            spheres.forEach(sphere => {
                sphere.addEventListener('click', function(e) {
                    e.stopPropagation(); // Evita que el clic se propague al header
                    const submenuId = this.getAttribute('data-submenu');
                    const submenu = document.getElementById(submenuId);
                    
                    // Cierra todos los submenús
                    submenus.forEach(menu => {
                        if (menu !== submenu) {
                            menu.classList.remove('active');
                        }
                    });
                    
                    // Abre/cierra el submenú seleccionado
                    submenu.classList.toggle('active');
                });
            });
            
            // Muestra contenido al hacer clic en opciones del submenú
            document.querySelectorAll('.submenu a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const contentId = this.getAttribute('data-content');
                    
                    // Oculta todas las secciones de contenido
                    contentSections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Muestra la sección de contenido seleccionada
                    document.getElementById(contentId).classList.add('active');
                    
                    // Cierra todos los submenús
                    submenus.forEach(menu => {
                        menu.classList.remove('active');
                    });

                    // Contrae el header si está expandido
                    if (!header.classList.contains('contraido')) {
                        contraerHeader();
                    }
                    
                    // Desplaza suavemente hacia el contenido
                    window.scrollTo({
                        top: document.getElementById('mainContent').offsetTop - 80,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Cierra submenús al hacer clic fuera de ellos
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.sphere') && !e.target.closest('.submenu')) {
                    submenus.forEach(menu => {
                        menu.classList.remove('active');
                    });
                }
            });
        });