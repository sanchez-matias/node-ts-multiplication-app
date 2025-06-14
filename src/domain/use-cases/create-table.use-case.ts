export interface CreateTableOptions {
    base: number,
    limit?: number
}

export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export class CreateTable implements CreateTableUseCase{
    constructor(
        /* 
        Dependency Injection (DI)
        */
    ) {
        
    }

    execute({base, limit = 10}: CreateTableOptions) {
        let outputMessage = '';

        for (let i = 1; i <= limit; i++) {
            const dato = `${base} x ${i} = ${base*i}`;
            outputMessage = `${outputMessage}\n${dato}`;
        }

        return outputMessage;
    }
}