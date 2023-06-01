import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class Light {
  public id: string | null;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsString()
  @IsNotEmpty()
  public label: string;

  @IsBoolean()
  @IsNotEmpty()
  public status: boolean;
}
