export = spwb;
export as namespace spwb;
declare module spwb {
  interface IConfig {
    contentDir: string;
    designDir: string;
    scriptDir: string;
    styleDir: string;
    siteDir: string;
    siteToken: string;
    siteUrl: string;
  }
  export function build(config: IConfig): Promise<void>;
  export function watchAll(config: IConfig): Promise<void>;
}
