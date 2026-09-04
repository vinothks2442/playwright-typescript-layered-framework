export class TestContext {
    private readonly data = new Map<string, unknown>();
  
    set<T>(key: string, value: T): void {
      this.data.set(key, value);
    }
  
    get<T>(key: string): T | undefined {
      return this.data.get(key) as T | undefined;
    }
  
    has(key: string): boolean {
      return this.data.has(key);
    }
  
    clear(): void {
      this.data.clear();
    }
  }