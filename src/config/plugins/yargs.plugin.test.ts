const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./yargs.plugin');

    return yarg;
};

describe('Test yargs.plugin.ts', () => {
    // Parte para resetear los valores del argv entre cada uno de los test
    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values', async() => {

        const argv = await runCommand(['-b', '5']);
        // console.log(argv);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'table',
            d: './outputs',
        }));

    });

    test('should return configuration with custom values', async() => {

        const argv = await runCommand([
            '-b', '9', 
            '-l', '20', 
            '-s', 'true', 
            '-n', 'custom-name', 
            '-d', './custom-directory',
        ]);

        expect(argv).toEqual(expect.objectContaining({
            b: 9,
            l: 20,
            s: true,
            n: 'custom-name',
            d: './custom-directory',
        }));

    });
});