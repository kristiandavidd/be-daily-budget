import { Module } from '@nestjs/common';
import { BudgetItemController } from './budget-item.controller';
import { BudgetItemService } from './budget-item.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
    imports: [SupabaseModule], 
    controllers: [BudgetItemController],
    providers: [BudgetItemService],
})
export class BudgetItemModule { }
