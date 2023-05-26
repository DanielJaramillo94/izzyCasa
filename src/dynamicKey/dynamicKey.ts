import { IsInt, IsNotEmpty } from 'class-validator';

export class DynamicKey {
  public id: string | null;

  @IsInt()
  @IsNotEmpty()
  public code: number;

  @IsInt()
  @IsNotEmpty()
  public time: number;
}
