export abstract class ServerInstance {
	protected abstract isSetupSuccessfully: boolean;

	abstract setup(): Promise<void>;
	abstract listen(): Promise<void>;
}
