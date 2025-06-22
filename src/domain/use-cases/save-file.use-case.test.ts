import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {

    // Clean Up para los archivos que nos crean los test al probar funciones de escritura.
    // Tuve que reemplazar el afterEach por el afterAll porque daba problemas con los archivos
    // que se creaban de forma asíncrona en cada uno de los test y se quedaban ejecutando
    // instrucciones de guardado cuando el archivo estaba eliminado. Entonces si se hace
    // cuando todo termina, nos aseguramos de que todo está OK antes de ejecutarlo.
    afterAll(() => {

        const outputFolderExists = fs.existsSync('outputs');
        if (outputFolderExists) fs.rmSync('outputs', { recursive: true });

        const customOutputsExists = fs.existsSync('custom-outputs');
        if (customOutputsExists) fs.rmSync('custom-outputs', { recursive: true });

    });

    // Resetear los spy de los test. Esto se debe a que, cuando los declaramos en alguno de los
    // test, los mismos permanecen y siguen comportandose como si estuvieran en su test.
    // beforeEach(() => {
    //     jest.restoreAllMocks();
    // });

    test('should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content',
        };

        // Estímulos de prueba
        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

        // Evaluación de los estímulos
        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();
        const options = {
            fileContent: 'custom content',
            destination: 'custom-outputs/file-destination',
            fileName: 'custom-table-name',
        };
        const fullPath = `${options.destination}/${options.fileName}.txt`;

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(fullPath);
        const fileContent = fs.readFileSync(fullPath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is an error message from DIRECTORIES'); }
        );
        const result = saveFile.execute({fileContent: 'A'});

        expect(mkdirSpy).toHaveBeenCalled();
        expect(result).toBe(false);

        // Cuando los spy tienen una implementación, la limpieza debe ser interna
        // al test.
        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is an error message from WRITING'); }
        );
        const result = saveFile.execute({fileContent: 'B'});

        expect(result).toBe(false);
        expect(writeFileSpy).toHaveBeenCalled();

        writeFileSpy.mockRestore();

    });
});