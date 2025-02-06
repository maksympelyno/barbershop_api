import { ApiProperty } from '@nestjs/swagger';

export class HistoryChange {
  @ApiProperty({
    description: 'The unique identifier for the price change',
    type: 'number',
  })
  changeNumber: number;

  @ApiProperty({
    description: 'The old price before the change',
    type: 'number',
  })
  oldPrice: number;

  @ApiProperty({
    description: 'The new price after the change',
    type: 'number',
  })
  newPrice: number;

  @ApiProperty({
    description: 'The date and time when the price change occurred',
    type: 'string',
  })
  changedAt: string;

  @ApiProperty({
    description: 'The difference in price between the old and new prices',
    type: 'number',
  })
  priceDifference: number;
}
