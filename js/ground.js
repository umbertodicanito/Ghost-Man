var meshGround;

var ground = function(scene){
    var radiusTop= 4;
    var radiusBottom= 4;
    var height=16;
    var radialSegments=30;
    var heightSegments=12; 

    var geometryGround = new THREE.CylinderBufferGeometry( radiusTop, radiusBottom, height, radialSegments, heightSegments);
    var materialCylinderGround = new THREE.MeshToonMaterial({
        color: 0x000044,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1});
    meshGround = new THREE.Mesh( geometryGround,materialCylinderGround );

    // horizontal rotation of ground, coins
    meshGround.rotation.z = Math.PI/2;

    scene.add(meshGround);

    //neon ground
    var geometryGroundWireframe = new THREE.WireframeGeometry(new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments));
    var materialGroundWireframe = new THREE.LineBasicMaterial( { color: 0xBD00FF, linewidth: 0 } );
    var meshNeonGround = new THREE.LineSegments(geometryGroundWireframe, materialGroundWireframe);
    meshGround.add(meshNeonGround);
    
    return meshGround
}