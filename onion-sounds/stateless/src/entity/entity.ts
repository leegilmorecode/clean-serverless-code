import { schemaValidator } from '@packages/schema-validator';
import { v4 as uuid } from 'uuid';
export abstract class Entity<T> {
  private readonly _id: string;
  private readonly _created: string;
  private _updated: string;
  protected props: T;

  constructor(props: T, id?: string, created?: string, updated?: string) {
    // set default values on creation
    this._id = id ? id : uuid();
    this._created = created ? created : this.getISOString();
    this._updated = updated ? updated : this.getISOString();
    this.props = {
      ...props,
      id: this.id,
      created: this.created,
      updated: this.updated,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get created(): string {
    return this._created;
  }

  public get updated(): string {
    return this._updated;
  }

  public setUpdatedDate() {
    this._updated = this.getISOString();
  }

  protected validate(schema: Record<string, any>): void {
    schemaValidator(schema, this.props);
  }

  private getISOString(): string {
    return new Date().toISOString();
  }
}
