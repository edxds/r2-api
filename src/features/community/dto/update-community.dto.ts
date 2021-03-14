import { PartialType, OmitType } from '@nestjs/mapped-types';

import { CreateCommunityDto } from './create-community.dto';

export class UpdateCommunityDto extends PartialType(OmitType(CreateCommunityDto, ['code'])) {}
