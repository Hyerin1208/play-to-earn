import React, { useEffect } from "react";
import * as THREE from "three";

import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

import * as dat from "dat.gui";
import "./evo-background.css";

const EvoBackGround = () => {
  const gui = new dat.GUI();
  const world = {
    plane: {
      width: 400,
      height: 400,
      widthSegments: 50,
      heightSegments: 50,
    },
  };

  gui.add(world.plane, "width", 1, 500).onChange(generatePlane);
  gui.add(world.plane, "height", 1, 500).onChange(generatePlane);
  gui.add(world.plane, "widthSegments", 1, 100).onChange(generatePlane);
  gui.add(world.plane, "heightSegments", 1, 100).onChange(generatePlane);

  function generatePlane() {
    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(
      world.plane.width,
      world.plane.height,
      world.plane.widthSegments,
      world.plane.heightSegments
    );

    const { array } = planeMesh.geometry.attributes.position;
    const randomValues = [];
    for (let i = 0; i < array.length; i++) {
      if (i % 3 === 0) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];

        array[i] = x + (Math.random() - 0.5) * 3;
        array[i + 1] = y + (Math.random() - 0.5) * 3;
        array[i + 2] = z + (Math.random() - 0.5) * 3;
      }

      randomValues.push(Math.random() * Math.PI * 2);
    }

    planeMesh.geometry.attributes.position.randomValues = randomValues;
    planeMesh.geometry.attributes.position.originalPosition =
      planeMesh.geometry.attributes.position.array;

    const colors = [];
    for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
      colors.push(0, 0.19, 0.4);
    }

    planeMesh.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(colors), 3)
    );
  }

  // three.js로 무언가를 나타내기 위해서는 scene, camera, renderer가 필요

  const raycaster = new THREE.Raycaster();
  console.log(raycaster);
  // scene 생성하기
  const scene = new THREE.Scene();
  // camera 생성 및 설정하기
  const camera = new THREE.PerspectiveCamera(
    75,
    1440 / 800,
    // window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // renderer 생성하기
  const renderer = new THREE.WebGLRenderer();

  //   console.log(scene);
  //   console.log(camera);
  //   console.log(renderer);

  // 렌더링할 구역의 높이와 너비 설정
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  //   const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  //   console.log(boxGeometry);
  //   console.log(material);

  //   const mesh = new THREE.Mesh(boxGeometry, material);
  //   console.log(mesh);

  //   scene.add(mesh);
  new OrbitControls(camera, renderer.domElement);
  camera.position.z = 5;

  const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading,
  });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(planeMesh);

  console.log(planeMesh.geometry.attributes.position.array);

  const { array } = planeMesh.geometry.attributes.position;

  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    // console.log(array[i]);

    array[i + 2] = z + Math.random();
  }

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1);
  scene.add(light);

  const backLight = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, -1);
  scene.add(backLight);

  const mouse = {
    x: undefined,
    y: undefined,
  };

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(planeMesh);
    console.log(intersects);
  }

  animate();

  useEffect((event) => {
    mouse.x = (event.clientX / 1024) * 2 - 1;
    mouse.y = -(event.clientY / 800) * 2 + 1;

    console.log(mouse);
  }, []);

  return (
    <div>
      <div
        id="transform__box"
        className="absolute text-white text-center"
        style={{
          top: "50%",
          left: "50%",
        }}
      >
        {/* <h1 className="font-space-mono text-sm uppercase tracking-wide">
          Christopher Lis
        </h1> */}
        {/* <p className="font-exo text-4xl">
          ONE WITH AN EVERLASTING DESIRE FOR THE UNKNOWN & UNTOLD
        </p> */}
      </div>
    </div>
  );
};

export default EvoBackGround;
