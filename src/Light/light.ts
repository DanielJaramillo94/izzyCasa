import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Light {
  public id: string | null;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsBoolean()
  @IsNotEmpty()
  public status: boolean;
}