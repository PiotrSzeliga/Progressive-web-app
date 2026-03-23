const PlantDiary = {
    getAll() {
        return JSON.parse(localStorage.getItem('plants') || '[]');
    },
    save(plant) {
        const list = this.getAll();
        plant.id = Date.now();
        list.push(plant);
        localStorage.setItem('plants', JSON.stringify(list));
        return plant;
    },
    delete(id) {
        const list = this.getAll().filter((p) => p.id !== Number(id));
        localStorage.setItem('plants', JSON.stringify(list));
    },
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(console.error);
    });
}

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document
        .querySelectorAll('.btn-install')
        .forEach((b) => b.classList.remove('d-none'));
});

window.addEventListener('appinstalled', () => {
    document
        .querySelectorAll('.btn-install')
        .forEach((b) => b.classList.add('d-none'));
});

function installPWA() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
    });
}