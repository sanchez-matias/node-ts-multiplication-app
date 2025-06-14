import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

// Funcion local auto invocada. Se encierra entre paréntesis y se manda a llamar con
// otros paréntesis.
(async() => {
    await main();
    console.log('Fin del programa');
})();

async function main() {
    const {b:base, l:limit, s:showTable, n:name, d:destination} = yarg;

    // console.log(yarg);
    ServerApp.run({base, limit, showTable, name, destination});
}