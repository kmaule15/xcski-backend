import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

// creates a type with all the fields of CreateEventDto set as optional
export class UpdateEventDto extends PartialType(CreateEventDto) {}
