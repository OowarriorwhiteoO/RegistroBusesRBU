document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.getElementById('homeBtn');
    const registerBtn = document.getElementById('registerBtn');
    const viewBtn = document.getElementById('viewBtn');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const views = document.querySelectorAll('.view');
    const busForm = document.getElementById('busForm');
    const busTable = document.getElementById('busTable').querySelector('tbody');
    const searchInput = document.getElementById('search');
    const preview = document.getElementById('preview');
    const togglePhotosBtn = document.getElementById('togglePhotos');
    const loginForm = document.getElementById('loginForm');

    let showPhotos = true;
    let currentUser = null;

    const users = {
        admin: 'admin123',
        user: 'user123'
    };

    const buses = JSON.parse(localStorage.getItem('buses')) || [];
    const suggestedBuses = JSON.parse(localStorage.getItem('suggestedBuses')) || [];

    const showView = (viewId) => {
        views.forEach(view => view.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
    };

    homeBtn.addEventListener('click', () =>
