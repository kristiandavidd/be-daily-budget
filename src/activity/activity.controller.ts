import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) { }

    @Get()
    getAllWithItems() {
        return this.activityService.getAllActivitiesWithItems();
    }

    @Post()
    create(@Body() dto: CreateActivityDto) {
        return this.activityService.createActivity(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateActivityDto) {
        return this.activityService.updateActivity(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activityService.deleteActivity(id);
    }
}
