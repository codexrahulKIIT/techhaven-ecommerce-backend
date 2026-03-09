import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('placeholder')
export class PlaceholderController {
  @Get(':width/:height')
  getPlaceholder(@Param('width') width: string, @Param('height') height: string, @Res() res: Response) {
    // For testing, redirect to a public placeholder service
    const url = `https://via.placeholder.com/${width}x${height}`;
    res.redirect(url);
  }
}
