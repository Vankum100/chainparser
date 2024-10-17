export class Action {
  constructor(
    public trx_id: string,
    public block_time: string,
    public block_num: number,
  ) {}
}
