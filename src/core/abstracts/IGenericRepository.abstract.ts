export abstract class IGenericAbstract<T> {
  abstract create(item: T): Promise<T>;

  abstract getById(id: string): Promise<T>;

  abstract getByEmail(email: string): Promise<T>;

  abstract getAll(): Promise<T[]>;

  abstract updateById(id: string, item: T): Promise<T | null>;
}
