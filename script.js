document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.getElementById('homeBtn');
    const registerBtn = document.getElementById('registerBtn');
    const registerBtnHome = document.getElementById('registerBtnHome');
    const viewBtn = document.getElementById('viewBtn');
    const viewBtnHome = document.getElementById('viewBtnHome');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const views = document.querySelectorAll('.view');
    const busForm = document.getElementById('busForm');
    const busTable = document.getElementById('busTable').querySelector('tbody');
    const searchInput = document.getElementById('search');
    const preview = document.getElementById('preview');
    const togglePhotosBtn = document.getElementById('togglePhotos');
    const loginForm = document.getElementById('loginForm');
    const adminElements = document.querySelectorAll('.admin-only');
    const registrationDate = document.getElementById('registrationDate');

    let showPhotos = true;
    let currentUser = null;
    let isAdmin = false;

    const users = {
        admin: {
            password: 'superadmin',
            isAdmin: true
        },
        user: {
            password: 'dale30albo',
            isAdmin: false
        }
    };

    const buses = JSON.parse(localStorage.getItem('buses')) || [];
    const suggestedBuses = JSON.parse(localStorage.getItem('suggestedBuses')) || [];

    const updateAdminElements = () => {
        adminElements.forEach(element => {
            element.style.display = isAdmin ? 'block' : 'none';
        });
        
        // Actualizar columna de acciones en la tabla
        const actionHeaders = document.querySelectorAll('th.admin-only');
        const actionCells = document.querySelectorAll('td.admin-only');
        [...actionHeaders, ...actionCells].forEach(el => {
            el.style.display = isAdmin ? 'table-cell' : 'none';
        });

        // Si no es admin y está en la vista de registro, redirigir a inicio
        if (!isAdmin && document.getElementById('register').classList.contains('active')) {
            showView('home');
        }
    };

    const showView = (viewId) => {
        // Verificar si el usuario tiene permiso para ver la vista
        if (viewId === 'register' && !isAdmin) {
            alert('Necesita permisos de administrador para acceder a esta sección');
            return;
        }

        views.forEach(view => view.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
        if (viewId === 'view') {
            updateBusTable();
        }
    };

    homeBtn.addEventListener('click', () => showView('home'));
    registerBtn.addEventListener('click', () => showView('register'));
    registerBtnHome.addEventListener('click', () => showView('register'));
    viewBtn.addEventListener('click', () => showView('view'));
    viewBtnHome.addEventListener('click', () => showView('view'));
    loginBtn.addEventListener('click', () => showView('login'));

    // Login functionality
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (users[username] && users[username].password === password) {
            currentUser = username;
            isAdmin = users[username].isAdmin;
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            updateAdminElements();
            showView('home');
            alert('¡Inicio de sesión exitoso!');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        isAdmin = false;
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        updateAdminElements();
        showView('home');
    });

    // Photo preview functionality
    document.getElementById('photo').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Bus registration form handling
    busForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!isAdmin) {
            alert('Necesita permisos de administrador para registrar buses');
            return;
        }

        const currentDate = new Date().toLocaleString('es-CL', { 
            timeZone: 'America/Santiago',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        const newBus = {
            ppu: document.getElementById('ppu').value,
            features: document.getElementById('features').value,
            observations: document.getElementById('observations').value,
            busType: document.getElementById('busType').value,
            photo: preview.style.display !== 'none' ? preview.src : null,
            registrationDate: currentDate
        };

        buses.push(newBus);
        localStorage.setItem('buses', JSON.stringify(buses));
        
        // Reset form
        busForm.reset();
        preview.src = '#';
        preview.style.display = 'none';
        registrationDate.textContent = '';
        
        alert('Bus registrado exitosamente');
        showView('home');
    });

    // Update bus table
    const updateBusTable = () => {
        busTable.innerHTML = '';
        if (buses.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="7">No hay buses registrados</td>';
            busTable.appendChild(row);
            return;
        }

        buses.forEach((bus, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bus.ppu}</td>
                <td>${bus.features}</td>
                <td>${bus.observations}</td>
                <td>${bus.busType}</td>
                <td>${bus.photo ? `<img src="${bus.photo}" alt="Foto del bus" class="table-photo" style="display: ${showPhotos ? 'block' : 'none'}">` : 'No hay foto'}</td>
                <td>${bus.registrationDate || 'No disponible'}</td>
                <td class="admin-only" style="display:${isAdmin ? 'table-cell' : 'none'}">
                    <button onclick="editBus(${index})">Editar</button>
                    <button onclick="deleteBus(${index})">Eliminar</button>
                </td>
            `;
            busTable.appendChild(row);
        });
    };

    // Toggle photos visibility
    togglePhotosBtn.addEventListener('click', () => {
        showPhotos = !showPhotos;
        const photos = document.querySelectorAll('.table-photo');
        photos.forEach(photo => {
            photo.style.display = showPhotos ? 'block' : 'none';
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredBuses = buses.filter(bus => 
            bus.ppu.toLowerCase().includes(searchTerm) ||
            bus.features.toLowerCase().includes(searchTerm) ||
            bus.observations.toLowerCase().includes(searchTerm) ||
            bus.busType.toLowerCase().includes(searchTerm)
        );
        
        busTable.innerHTML = '';
        if (filteredBuses.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="7">No se encontraron buses</td>';
            busTable.appendChild(row);
            return;
        }

        filteredBuses.forEach((bus, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bus.ppu}</td>
                <td>${bus.features}</td>
                <td>${bus.observations}</td>
                <td>${bus.busType}</td>
                <td>${bus.photo ? `<img src="${bus.photo}" alt="Foto del bus" class="table-photo" style="display: ${showPhotos ? 'block' : 'none'}">` : 'No hay foto'}</td>
                <td>${bus.registrationDate || 'No disponible'}</td>
                <td class="admin-only" style="display:${isAdmin ? 'table-cell' : 'none'}">
                    <button onclick="editBus(${index})">Editar</button>
                    <button onclick="deleteBus(${index})">Eliminar</button>
                </td>
            `;
            busTable.appendChild(row);
        });
    });

    // Initial table update and admin elements
    updateBusTable();
    updateAdminElements();

    // Delete bus functionality
    window.deleteBus = (index) => {
        if (!isAdmin) {
            alert('Necesita permisos de administrador para eliminar buses');
            return;
        }

        if (confirm('¿Está seguro de que desea eliminar este bus?')) {
            buses.splice(index, 1);
            localStorage.setItem('buses', JSON.stringify(buses));
            updateBusTable();
        }
    };

    // Edit bus functionality
    window.editBus = (index) => {
        if (!isAdmin) {
            alert('Necesita permisos de administrador para editar buses');
            return;
        }

        const bus = buses[index];
        document.getElementById('ppu').value = bus.ppu;
        document.getElementById('features').value = bus.features;
        document.getElementById('observations').value = bus.observations;
        document.getElementById('busType').value = bus.busType;
        registrationDate.textContent = bus.registrationDate || 'Nueva fecha se generará al guardar';
        if (bus.photo) {
            preview.src = bus.photo;
            preview.style.display = 'block';
        }
        buses.splice(index, 1);
        localStorage.setItem('buses', JSON.stringify(buses));
        showView('register');
    };

    // Set current date in registration form
    const updateRegistrationDate = () => {
        const currentDate = new Date().toLocaleString('es-CL', { 
            timeZone: 'America/Santiago',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        registrationDate.textContent = currentDate;
    };

    // Update date when register view is shown
    document.getElementById('register').addEventListener('click', updateRegistrationDate);
});
