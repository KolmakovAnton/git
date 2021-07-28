type Type<T> = new (...args: any[]) => T;

export class ServiceRegistry {
  private static instance: ServiceRegistry;

  private constructor() {}

  private static services: Map<string, unknown> = new Map();

  public static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  public static register(key: string, service: any): void {
    if (this.services.get(key)) {
      throw new Error(`${key} - already registered`);
    }
    this.services.set(key, service);
  }

  public static unregister(key: string): void {
    this.services.delete(key);
  }

  public static resolve(key: string): unknown {
    return this.services.get(key);
  }

  public static resolveModel<T>(instance: Type<T>): T | undefined {
    return (Array.from(this.services.values()) as T[]).find((v: T) => v instanceof instance);
  }

  public static reset(): void {
    this.services.clear();
  }
}

export interface IZuiApplication {
  serviceRegistry: ServiceRegistry;
}

declare global {
  interface Window {
    ZUI_APP_CORE: IZuiApplication;
  }
}

window.ZUI_APP_CORE = {serviceRegistry: ServiceRegistry.getInstance()};


