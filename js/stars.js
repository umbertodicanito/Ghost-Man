var starGeo
var stars

var starsGenerator = function(scene){
    starGeo = new THREE.Geometry();
    for(let i=0;i<6000;i++) {
        star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        starGeo.vertices.push(star);
    }

    let sprite = new THREE.TextureLoader().load( '../images/star.png' );
    sprite.minFilter = THREE.LinearFilter;
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.2,
        map: sprite
    });

    stars = new THREE.Points(starGeo,starMaterial);
    scene.add(stars);

}

function animateStars(){
    starGeo.vertices.forEach(p => {
        if(p.velocity >=150){
            p.velocity += p.acceleration
            p.x -= p.velocity;

            if (p.x < -200) {
                p.x = 200;
                p.velocity = 0;
            }
        }

    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.x +=0.001;
}