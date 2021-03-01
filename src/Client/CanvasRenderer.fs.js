import { clear, jsOptions, min, max, createAtom } from "./.fable/fable-library.3.1.1/Util.js";
import * as dat from "dat.gui";
import * as three from "three";
import { some } from "./.fable/fable-library.3.1.1/Option.js";
import { op_Subtraction, op_Multiply, op_Division, fromBits, compare, toNumber } from "./.fable/fable-library.3.1.1/Long.js";
import * as three$002Dtrackballcontrols from "three-trackballcontrols";
import { getEnumerator, indexed, iterate } from "./.fable/fable-library.3.1.1/Seq.js";
import { filter } from "./.fable/fable-library.3.1.1/List.js";

export const demoMode2 = createAtom(false);

export const gui = new dat.GUI();

export const THREE = three;

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(30, (window.innerWidth / window.innerHeight), 20, 10000);

export const opt = {
    antialias: true,
    canvas: document.getElementById("myCanvas"),
};

export const renderer = new THREE.WebGLRenderer(opt);

renderer.setClearColor(new THREE.Color(some(16777215)));

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;

export const axes = new THREE.AxesHelper(20);

export const currentContainer = [];

export const lastLController = createAtom(void 0);

export const lastHController = createAtom(void 0);

export function renderPlane(container) {
    const x_2 = toNumber(max(compare, fromBits(1, 0, false), min(compare, fromBits(40, 0, false), op_Division(fromBits(50000, 0, false), op_Multiply(container.Dim.Width, container.Dim.Length))))) / 1.5;
    const x_3 = (compare(op_Multiply(op_Multiply(container.Dim.Width, container.Dim.Length), container.Dim.Height), fromBits(4000, 0, false)) > 0) ? (x_2 / 3.5) : (x_2 / 1.5);
    const value_1 = camera.position.set(500 / x_3, 550 / x_3, -700 / x_3);
    void value_1;
    const value_2 = scene.remove(...currentContainer);
    void value_2;
    const planeGeometry = new THREE.PlaneGeometry(toNumber(container.Dim.Length), toNumber(container.Dim.Width));
    const planeMaterial = new THREE.MeshLambertMaterial(jsOptions((x_4) => {
        let copyOfStruct = x_4;
        copyOfStruct.color = "red";
    }));
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = (-0.5 * 3.141592653589793);
    const value_5 = plane.position.set(0, 0, 0);
    void value_5;
    const value_6 = scene.add(plane);
    void value_6;
    void (currentContainer.push(plane));
    const planeGeometry_1 = new THREE.PlaneGeometry(toNumber(container.Dim.Length), toNumber(container.Dim.Height));
    const planeMaterial_1 = new THREE.MeshLambertMaterial(jsOptions((x_5) => {
        let copyOfStruct_1 = x_5;
        copyOfStruct_1.color = "red";
    }));
    const plane_1 = new THREE.Mesh(planeGeometry_1, planeMaterial_1);
    plane_1.receiveShadow = true;
    plane_1.rotation.z = (1 * 3.141592653589793);
    plane_1.rotation.y = (1 * 3.141592653589793);
    const value_9 = plane_1.position.set(0, toNumber(container.Dim.Height) / 2, toNumber(container.Dim.Width) / 2);
    void value_9;
    const value_10 = scene.add(plane_1);
    void value_10;
    void (currentContainer.push(plane_1));
}

export const cubeMaterial = new THREE.MeshLambertMaterial({
    color: "green",
    wireframe: true,
});

export const wireframeMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    color: "black",
});

export const lineMaterial = new THREE.LineBasicMaterial({
    color: "black",
});

export const cubes = [];

export function renderCube(x, y, z, width, height, length, color, L, W) {
    const L_1 = L;
    const W_1 = W;
    const cubeMaterial_1 = new THREE.MeshLambertMaterial({
        color: color,
        wireframe: false,
    });
    const cubeGeometry = new THREE.BoxGeometry(length, height, width);
    const edgeGeomerty = new THREE.EdgesGeometry(cubeGeometry);
    const wireFrame = new THREE.LineSegments(edgeGeomerty, lineMaterial);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial_1);
    const value = cube.add(wireFrame);
    void value;
    cube.castShadow = true;
    const value_1 = cube.position.set(z - ((L_1 - length) / 2), y + (height / 2), ((W_1 - width) / 2) - x);
    void value_1;
    const value_2 = scene.add(cube);
    void value_2;
    void (cubes.push(cube));
}

export function init() {
    const addSpottLight = (x, y, z, inten) => {
        const spotLight = new THREE.SpotLight(some("white"));
        const value = spotLight.position.set(x, y, z);
        void value;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize = (new THREE.Vector2(1024, 1024));
        spotLight.shadow.camera.far = 130;
        spotLight.shadow.camera.near = 40;
        spotLight.intensity = inten;
        const value_1 = scene.add(spotLight);
        void value_1;
    };
    addSpottLight(-400, 400, 150, 0.4);
    addSpottLight(400, 400, 450, 0.4);
    addSpottLight(-800, 1200, 2450, 0.4);
    addSpottLight(-1400, 1000, 1450, 0.4);
    const dLight = new THREE.DirectionalLight(some("white"), 0.4);
    const value_2 = dLight.translateX(100);
    void value_2;
    const value_3 = dLight.rotateZ(40);
    void value_3;
    const value_4 = dLight.rotateX(10);
    void value_4;
    const value_5 = dLight.rotateY(10);
    void value_5;
    const value_6 = dLight.position.set(-400, 400, -900);
    void value_6;
    const value_7 = scene.add(dLight);
    void value_7;
    const dLight2 = new THREE.DirectionalLight(some("white"), 0.4);
    const value_8 = dLight2.translateX(100);
    void value_8;
    const value_9 = dLight2.rotateZ(40);
    void value_9;
    const value_10 = dLight2.rotateX(10);
    void value_10;
    const value_11 = dLight2.rotateY(10);
    void value_11;
    const value_12 = dLight2.position.set(400, 400, -900);
    void value_12;
    const value_13 = scene.add(dLight2);
    void value_13;
    const value_14 = camera.position.set(500, 550, -700);
    void value_14;
    camera.lookAt(scene.position);
    const initTrackballControls = (tupledArg) => {
        const camera_1 = tupledArg[0];
        const renderer_1 = tupledArg[1];
        const trackballControls = new three$002Dtrackballcontrols(camera_1, renderer_1.domElement);
        trackballControls.rotateSpeed = 1;
        trackballControls.zoomSpeed = 1.2;
        trackballControls.panSpeed = 0.8;
        trackballControls.noZoom = false;
        trackballControls.noPan = false;
        trackballControls.staticMoving = true;
        trackballControls.dynamicDampingFactor = 0.3;
        trackballControls.keys = [65, 83, 68];
        return trackballControls;
    };
    let trackballControls_1;
    const tupledArg_1 = [camera, renderer];
    trackballControls_1 = initTrackballControls([tupledArg_1[0], tupledArg_1[1]]);
    const clock = new THREE.Clock();
    const resizeRendererToDisplaySize = (renderer_2) => {
        const canvas = renderer_2.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = (canvas.width !== width) ? true : (canvas.height !== height);
        if (needResize) {
            renderer_2.setSize(width, height, false);
        }
        return needResize;
    };
    const renderScene = (time) => {
        const time_1 = time * 0.001;
        trackballControls_1.update(clock.getDelta());
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas_1 = renderer.domElement;
            camera.aspect = (canvas_1.clientWidth / canvas_1.clientHeight);
            camera.updateProjectionMatrix();
        }
        if (demoMode2()) {
            iterate((tupledArg_2) => {
                const ndx = tupledArg_2[0] | 0;
                const ob = tupledArg_2[1];
                const speed = 0.1 + (ndx * 0.05);
                const rot = time_1 * speed;
                ob.rotation.x = rot;
                ob.rotation.y = rot;
            }, indexed(cubes));
        }
        renderer.render(scene, camera);
        const value_15 = window.requestAnimationFrame(renderScene);
        void value_15;
    };
    renderScene(0);
}

export function renderResultInner(container, items, demoMode) {
    demoMode2(demoMode, true);
    renderPlane(container);
    const value = scene.remove(...cubes);
    void value;
    clear(cubes);
    const enumerator = getEnumerator(items);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const item = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            renderCube(toNumber(item.Coord.X), toNumber(item.Coord.Y), toNumber(item.Coord.Z), toNumber(item.Item.Dim.Width), toNumber(item.Item.Dim.Height), toNumber(item.Item.Dim.Length), item.Item.Tag, toNumber(container.Dim.Length), toNumber(container.Dim.Width));
        }
    }
    finally {
        enumerator.Dispose();
    }
}

export function renderResult(container, items, demoMode) {
    if (lastLController() != null) {
        const c = lastLController();
        gui.remove(c);
    }
    const h = {
        h_filter: 0,
    };
    const v = {
        v_filter: 0,
    };
    const callback = (list) => filter((i) => {
        if (toNumber(op_Subtraction(container.Dim.Length, i.Coord.Z)) >= h.h_filter) {
            return toNumber(op_Subtraction(container.Dim.Height, i.Coord.Y)) >= v.v_filter;
        }
        else {
            return false;
        }
    }, list);
    lastLController(gui.add(h, "h_filter", 0, toNumber(container.Dim.Length)).onChange((v_1) => {
        renderResultInner(container, callback(items), demoMode2());
    }), true);
    if (lastHController() != null) {
        const c_1 = lastHController();
        gui.remove(c_1);
    }
    lastHController(gui.add(v, "v_filter", 0, toNumber(container.Dim.Height)).onChange((_arg1) => {
        renderResultInner(container, callback(items), demoMode2());
    }), true);
    gui.__closeButton.hidden = true;
    console.log(some(gui));
    gui.updateDisplay();
    renderResultInner(container, items, demoMode);
}

