// process.argv = ['node', 'app.ts', '-b', '10'];
// import './app';

import { ServerApp } from "./presentation/server-app";

describe('app.ts', () => {
    test('should call Server.run with values', async() => {

        // Seteamos los mocks de las funciones que sabemos que se deben
        // ejecutar al inicializar la funcion principal.
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = [
            'node', 'app.ts',
            '-b', '10',
            '-l', '5',
            '-s', 'false',
            '-n', 'test-file',
            '-d', 'test-destination',
        ];

        // Al importarla, ejecutamos la función principal
        await import('./app');

        // Esperar que la función se llame como lo esperamos
        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: false,
            name: 'test-file',
            destination: 'test-destination',
        });
    });
});