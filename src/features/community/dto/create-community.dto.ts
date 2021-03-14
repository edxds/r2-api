import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateCommunityDto {
  @IsNotEmpty({ message: 'O código é obrigatório' })
  @IsString({ message: 'O código precisa ser do tipo texto' })
  @Length(2, 48, { message: 'O código precisa ter entre 2 e 48 caracteres' })
  code: string;

  @IsNotEmpty({ message: 'O nome da comunidade é obrigatório' })
  @IsString({ message: 'O nome precisa ser do tipo texto' })
  @Length(2, 64, { message: 'O nome da comunidade precisa ter entre 2 e 64 caracteres' })
  title: string;

  @IsOptional()
  @IsString({ message: 'A descrição precisa ser do tipo texto' })
  @Length(0, 200, { message: 'A descrição da comunidade só pode ter até 200 caracteres' })
  desc?: string;

  @IsOptional()
  @IsString({ message: 'O campo avatar precisa ser do tipo texto' })
  @IsUrl(undefined, { message: 'O campo avatar precisa ser uma URL' })
  avatar?: string;

  @IsOptional()
  @IsBoolean({ message: 'O campo "privado" precisa ser do tipo booleano' })
  isPrivate?: boolean;
}
