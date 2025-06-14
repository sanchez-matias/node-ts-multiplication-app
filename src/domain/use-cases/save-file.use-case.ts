import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent: string,
    destination?: string,
    fileName?: string,
}

export class SaveFile implements SaveFileUseCase {
    constructor(
        // repository: StorageRepository
    ) {}

    execute({fileContent, destination = 'outputs', fileName = 'table'}: Options): boolean {
        try {
            fs.mkdirSync(destination, {recursive: true});
            fs.writeFileSync(`${destination}/${fileName}`, fileContent);
            return true;
        } catch (error) {
            return false;
        }
        
    }
}