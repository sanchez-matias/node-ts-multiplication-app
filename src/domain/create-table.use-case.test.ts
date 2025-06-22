import { CreateTable } from './use-cases/create-table.use-case';

describe('', () => {
    test('should create a table with default values', () => {

        const createTable = new CreateTable();

        const table = createTable.execute({base: 2});
        const rows = table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows).toBe(11);

    });

    test('should create table with custom values', () => {

        const createTable = new CreateTable();

        const options = {
            base: 3,
            limit: 20,
        };

        const table = createTable.execute(options);
        const rows = table.split('\n').length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows).toBe(21);

    });
});