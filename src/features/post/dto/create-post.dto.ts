import { IsDefined, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'O corpo do post não pode estar vazio' })
  @IsString({ message: 'O código precisa ser do tipo texto' })
  content: string;

  @IsDefined({ message: 'O ID da comunidade é obrigatório' })
  @IsInt({ message: 'O ID da comunidade precisa ser um número' })
  communityId: number;

  @IsOptional()
  @IsInt({ message: 'O ID da resposta precisa ser um número' })
  parentPostId: number;
}
