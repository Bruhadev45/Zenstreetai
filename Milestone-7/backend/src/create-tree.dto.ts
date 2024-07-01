import { IsObject, IsString } from 'class-validator';

export class CreateTreeDto {
  @IsString()
  readonly username: string;

  @IsObject()
  readonly tree: Record<string, any>;
}
