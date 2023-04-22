require('colors');
const { saveDB, readDB } = require('./helpers/saveFile');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

const main = async () => {

    let opt = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if (tasksDB) { // cargar tareas
        tasks.cargarTareasFromArray(tasksDB);
    }
    do {
        // Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                tasks.crearTarea(desc);
                break;

            case '2':
                tasks.listadoCompleto();
                break;

            case '3': // listar completadas
                tasks.listarPendientesCompletadas(true);
                break;

            case '4': // listar pendientes
                tasks.listarPendientesCompletadas(false);
                break;

            case '5': // completado | pendiente
                const ids = await mostrarListadoCheckList(tasks.listArr);
                tasks.toggleCompletadas(ids);
                break;

            case '6': // Borrar
                const id = await listadoTareasBorrar(tasks.listArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if (ok) {
                        tasks.borrarTarea(id);
                        console.log('Tarea borrada'.yellow);
                    }
                }
                break;

        }

        saveDB(tasks.listArr);
        await pausa();
    } while (opt !== '0');
}


main();