export class InMemoryStorageFake implements Storage {
  values = new Map<string, any>();

  [name: string]: any;

  readonly length: number = 0;

  clear(): void {
    this.values.clear();
  }

  getItem(key: string): string | null {
    let value = this.values.get(key);
    if (value === undefined) {
      return null;
    } else {
      return value;
    }
  }

  key(index: number): string | null {
    return null;
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
}
