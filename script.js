document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.getElementById('homeBtn');
    const registerBtn = document.getElementById('registerBtn');
    const viewBtn = document.getElementById('viewBtn');
    const views = document.querySelectorAll('.view');
    const busForm = document.getElementById('busForm');
    const busTable = document.getElementById('busTable').querySelector('tbody');
    const searchInput = document.getElementById('search');
    const preview = document.getElementById('preview');

    const buses = JSON.parse(localStorage.getItem('buses')) || [];

    const showView = (viewId) => {
        views.forEach(view => view.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
    };

    homeBtn.addEventListener('click', () => showView('home'));
    registerBtn.addEventListener('click', () => showView('register'));
    viewBtn.addEventListener('click', () => showView('view'));

    const renderTable = () => {
        busTable.innerHTML = '';
        buses.forEach((bus, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bus.ppu}</td>
                <td>${bus.features}</td>
                <td>${bus.observations}</td>
                <td><img src="${bus.photo}" alt="Foto" style="width: 100px;"></td>
                <td>
                    <button onclick="editBus(${index})">Editar</button>
                    <button onclick="deleteBus(${index})">Eliminar</button>
                </td>
            `;
            busTable.appendChild(row);
        });
    };

    const saveBus = (bus) => {
        buses.push(bus);
        localStorage.setItem('buses', JSON.stringify(buses));
        renderTable();
    };

    const editBus = (index) => {
        const bus = buses[index];
        document.getElementById('ppu').value = bus.ppu;
        document.getElementById('features').value = bus.features;
        document.getElementById('observations').value = bus.observations;
        preview.src = bus.photo;
        preview.style.display = 'block';
        buses.splice(index, 1);
        localStorage.setItem('buses', JSON.stringify(buses));
        renderTable();
    };

    const deleteBus = (index) => {
        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            buses.splice(index, 1);
            localStorage.setItem('buses', JSON.stringify(buses));
            renderTable();
        }
    };

    busForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const ppu = document.getElementById('ppu').value;
        const features = document.getElementById('features').value;
        const observations = document.getElementById('observations').value;
        const photo = preview.src;

        if (buses.some(bus => bus.ppu === ppu)) {
            alert('Ya existe un bus con esta PPU.');
            return;
        }

        const bus = { ppu, features, observations, photo };
        saveBus(bus);
        busForm.reset();
        preview.src = '#';
        preview.style.display = 'none';
        showView('view');
    });

    document.getElementById('photo').addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            preview.src = event.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBuses = buses.filter(bus => bus.ppu.toLowerCase().includes(searchTerm));
        busTable.innerHTML = '';
        filteredBuses.forEach((bus, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bus.ppu}</td>
                <td>${bus.features}</td>
                <td>${bus.observations}</td>
                <td><img src="${bus.photo}" alt="Foto" style="width: 100px;"></td>
                <td>
                    <button onclick="editBus(${index})">Editar</button>
                    <button onclick="deleteBus(${index})">Eliminar</button>
                </td>
            `;
            busTable.appendChild(row);
        });
    });

    renderTable();
});