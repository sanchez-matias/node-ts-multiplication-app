import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('server-app.ts', () => {

    const customOptions = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: 'test-destination',
        name: 'test-filename',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create ServerApp instance', () => {

        const serverApp = new ServerApp();

        expect(serverApp).toBeInstanceOf(ServerApp);

        // Me aseguro de que el metodo run siempre este ahi y que sea estático
        expect(typeof ServerApp.run).toBe('function');

    });

    test('should run ServerApp with options', () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run(customOptions);

        // Esperar a que se llamen los logs con sus respectivos mensajes
        expect(logSpy).toHaveBeenCalledWith('Server Running...');
        expect(logSpy).toHaveBeenLastCalledWith('ARCHIVO CREADO CORRECTAMENTE ✅');

        // Esperar a que los métodos de crear tablas y de guardado se hayan llamado correctamente
        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({
            base: customOptions.base,
            limit: customOptions.limit,
        });
        
        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            destination: customOptions.destination,
            fileName: customOptions.name,
        });
    });


    test('should run with custom mocked values', () => {
        const logMock = jest.fn();
        const logError = jest.fn();
        const createTableMock = jest.fn().mockReturnValue('2 x 2 = 4');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logError;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(customOptions);

        expect(logMock).toHaveBeenCalledWith('Server Running...');

        // Se crea la tabla y la funcion debe retornar '2 x 2 = 4'
        expect(createTableMock).toHaveBeenCalledWith({base: customOptions.base, limit: customOptions.limit});

        // La funcion recibe '2 x 2 = 4', por lo que debemos esperar ese valor o cualquier string
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '2 x 2 = 4',
            destination: customOptions.destination,
            fileName: customOptions.name,
        });

        // Esperamos la confirmación de que el archivo fue creado
        expect(logError).not.toHaveBeenCalled();

    }); 
});