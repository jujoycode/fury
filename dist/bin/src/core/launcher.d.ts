export default class Launcher {
    private method;
    private cwd;
    constructor();
    setWorkDir(path: string): void;
    run(method: string, option: string[]): Promise<import("execa").Result<{
        cwd: string;
    }>>;
}
