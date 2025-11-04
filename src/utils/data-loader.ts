import * as fs from 'fs';
import * as path from 'path';

export class DataLoader {
    static loadJson<T>(filePath: string): T {
        const fullPath = path.resolve(filePath);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        return JSON.parse(fileContent);
    }

    static getCredentials(): { [userType: string]: { username: string; password: string } } {
        const data = this.loadJson<{ [key: string]: { username: string; password: string } }>('tests/data/credentials.json');
        return data;
    }

}