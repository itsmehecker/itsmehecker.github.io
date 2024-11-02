// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

camera.position.z = 5;

// Fetch GitHub repositories
const username = 'itsmehecker'; // Replace with your GitHub username
fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
        repos.forEach((repo, index) => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = (index % 5) * 2 - 5;
            cube.position.y = Math.floor(index / 5) * 2 - 5;
            cube.userData = { url: repo.html_url };
            scene.add(cube);
        });
    });

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    scene.children.forEach(child => {
        child.rotation.x += 0.01;
        child.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
}
animate();

// Add event listener for window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add event listener for click
window.addEventListener('click', (event) => {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        window.open(intersects[0].object.userData.url, '_blank');
    }
});