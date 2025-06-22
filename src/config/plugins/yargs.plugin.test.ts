import { yarg } from './yargs.plugin';


// Modifico my process.argv para que solo tenga los parámetros que yo necesito que tenga
// Después importo de forma dinámica el plugin y lo retorno en la función para su uso especifico
const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./yargs.plugin');

    return yarg;
};

describe('Test yargs.plugin.ts', () => {
    test('should return default values', async () => {
        // const argv = await runCommand(['-b', '5']);
        console.log(yarg);

        expect(true).toBe(true);
    });
});