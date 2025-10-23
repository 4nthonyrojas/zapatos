// app.js - Script de control de color usando índices de material.

const modelViewer = document.querySelector('#tacon-viewer'); // Usa el ID del visor

// Índices esperados de los materiales en el archivo GLB:
const MAIN_BODY_INDEX = 0; // Se asume que el cuerpo principal es el primer material
const SOLE_BODY_INDEX = 1; // Se asume que la suela/tacón es el segundo material

let mainMaterial = null;
let soleMaterial = null;

// Función para inicializar y obtener los materiales por índice
function setupColorControls() {
    if (!modelViewer.model) {
        console.error("El modelo 3D aún no se ha cargado.");
        return;
    }

    const materials = modelViewer.model.materials;

    // 1. Obtener el material del cuerpo principal
    if (materials[MAIN_BODY_INDEX]) {
        mainMaterial = materials[MAIN_BODY_INDEX];
    } else {
        console.warn(`Advertencia: No se encontró el material principal en el índice ${MAIN_BODY_INDEX}.`);
    }

    // 2. Obtener el material de la suela/tacón
    if (materials[SOLE_BODY_INDEX]) {
        soleMaterial = materials[SOLE_BODY_INDEX];
    } else {
        console.warn(`Advertencia: No se encontró el material de la suela en el índice ${SOLE_BODY_INDEX}.`);
    }
    
    // 3. Asignar los manejadores de eventos (Cuerpo Principal)
    if (mainMaterial) {
        document.querySelectorAll('.color-swatch[data-target="main"]').forEach(button => {
            button.addEventListener('click', () => {
                const newColor = button.dataset.color;
                mainMaterial.pbrMetallicRoughness.setBaseColorFactor(newColor);
            });
        });
    }

    // 4. Asignar los manejadores de eventos (Suela/Tacón)
    if (soleMaterial) {
        document.querySelectorAll('.color-swatch[data-target="sole"]').forEach(button => {
            button.addEventListener('click', () => {
                const newColor = button.dataset.color;
                soleMaterial.pbrMetallicRoughness.setBaseColorFactor(newColor);
            });
        });
    }
    
    console.log('Controles de color inicializados por índice numérico.');
}

// Ejecutar la configuración una vez que el modelo 3D esté cargado.
modelViewer.addEventListener('load', setupColorControls);