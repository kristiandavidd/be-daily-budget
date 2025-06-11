import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BudgetItemService } from './budget-item.service';
import { CreateBudgetItemDto } from './dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget-item.dto';

@Controller('budget-items')
export class BudgetItemController {
    constructor(private readonly budgetItemService: BudgetItemService) { }

    @Post(':activityId')
    create(@Param('activityId') activityId: string, @Body() dto: CreateBudgetItemDto) {
        return this.budgetItemService.createBudgetItem(activityId, dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBudgetItemDto) {
        return this.budgetItemService.updateBudgetItem(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.budgetItemService.deleteBudgetItem(id);
    }
}
