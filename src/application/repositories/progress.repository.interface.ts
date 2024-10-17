import { IProgress } from '../../interfaces/progress.interface';

export interface IProgressRepository {
  save(progress: IProgress): Promise<void>;
  findByAccountName(accountName: string): Promise<IProgress>;
}
