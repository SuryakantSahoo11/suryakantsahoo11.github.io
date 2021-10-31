// https://observablehq.com/@observablehq/three-js@320
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Three.js
<figcaption>[Docs](https://threejs.org/docs/) | [Examples](https://threejs.org/examples/)</figcaption>`
)});
  main.variable(observer()).define(["renderer"], function(renderer){return(
renderer.domElement
)});
  main.variable(observer()).define(["cube","renderer","scene","camera"], function*(cube,renderer,scene,camera)
{
  while (true) {
    cube.rotation.z += 0.01;
    renderer.render(scene, camera);
    yield null;
  }
}
);
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("cube")).define("cube", ["THREE"], function(THREE)
{
  const material = new THREE.MeshNormalMaterial();
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}
);
  main.variable(observer("scene")).define("scene", ["THREE","cube"], function(THREE,cube)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x001b42);
  scene.add(cube);
  return scene;
}
);
  main.variable(observer("camera")).define("camera", ["width","height","THREE"], function(width,height,THREE)
{
  const fov = 45;
  const aspect = width / height;
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(2, 2, -2)
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
}
);
  main.variable(observer("renderer")).define("renderer", ["THREE","width","height","camera","scene","invalidation"], function(THREE,width,height,camera,scene,invalidation)
{
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  renderer.setPixelRatio(devicePixelRatio);
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", () => renderer.render(scene, camera));
  invalidation.then(() => (controls.dispose(), renderer.dispose()));
  return renderer;
}
);
  main.variable(observer("THREE")).define("THREE", ["require"], async function(require)
{
  const THREE = window.THREE = await require("three@0.130.0/build/three.min.js");
  await require("three@0.130.0/examples/js/controls/OrbitControls.js").catch(() => {});
  return THREE;
}
);
  return main;
}
