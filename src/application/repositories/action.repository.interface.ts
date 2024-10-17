import { Action } from '../../domain/action.entity';

export interface IActionRepository {
  save(action: Action): Promise<void>;
  findByTrxId(trx_id: string): Promise<Action | null>;
}
