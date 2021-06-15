import { Controller, UseGuards } from '@nestjs/common';

import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JWTAuthGuard)
@Controller('followers')
export class FollowerController {}
