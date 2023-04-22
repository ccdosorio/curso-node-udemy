
const Task = require('./task');

/**
 *  _list:
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoeEN:92231 }  },
 */

class Tasks {
    _list = {};

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    borrarTarea(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    crearTarea(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    listadoCompleto() {

        console.log();
        this.listArr.forEach((task, i) => {

            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = task;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);

        });
    }

    listarPendientesCompletadas(completadas = true) {

        console.log();
        let contador = 0;
        this.listArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            if (completadas) {
                // mostrar completadas
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                // mostrar pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }
            }

        });

    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];

            if (!task.completadoEn) {
                task.completadoEn = new Date().toISOString();
            }
        });

        this.listArr.forEach(task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].completadoEn = null;
            }
        });
    }

    cargarTareasFromArray(tasks = []) {

        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

}

module.exports = Tasks;