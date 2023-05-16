import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Temperature {
  public id: string | null;

  public userPhone: string | null;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsInt()
  @IsNotEmpty()
  public temperature: number;

  @IsInt()
  @IsNotEmpty()
  public time: number;
}
