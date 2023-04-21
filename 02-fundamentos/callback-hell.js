const empleados = [
    {
        id: 1,
        nombre: 'Christian'
    },
    {
        id: 2,
        nombre: 'David'
    },
    {
        id: 3,
        nombre: 'Osorio'
    }
];

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        nombre: 1500
    }
];

const id = 3;

const getEmpleado = (id, callback) => {
    const empleado = empleados.find(e => e.id === id)?.nombre;

    if (empleado) {
        callback(null, empleado);
    } else {
        callback(`Empleado con Id ${id} no existe.`);
    }
};


const getSalario = (id, callback) => {

    const salario = salarios.find(e => e.id === id)?.salario; // null check operator

    if (salario) {
        callback(null, salario);
    } else {
        callback(`No existe salario para el Id. ${id}.`);
    }

}

getEmpleado(id, (err, empleado) => {

    if (err) {
        return console.log(err);
    }
    // console.log(empleado);

    getSalario(id, (err, salario) => {
        if (err) {
            return console.log(err);
        }
        console.log(`El empleado: ${empleado} tiene un salario de: ${salario}`);
    });
});

// getSalario(id, (err, salario) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(salario);
// });