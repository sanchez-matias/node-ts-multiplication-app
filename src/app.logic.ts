import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

const { b:base, l:limit, s:show } = yarg;

let cadena = `
===============================
       Tabla del ${base}
===============================
`;

for (let i = 1; i <= limit; i++) {
    const dato = `${base} x ${i} = ${base*i}`;
    cadena = `${cadena}\n${dato}`;
}

if (show) {
    console.log(cadena);
}

const outputsPath = `outputs/tablas`;

fs.mkdirSync(outputsPath, {recursive: true});
fs.writeFileSync(`${outputsPath}/tabla-5.txt`, cadena);
console.log('File created!');
