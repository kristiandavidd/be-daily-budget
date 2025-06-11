import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateBudgetItemDto } from './dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget-item.dto';

@Injectable()
export class BudgetItemService {
    constructor(private supabaseService: SupabaseService) { }

    async createBudgetItem(activityId: string, dto: CreateBudgetItemDto) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('budget_item')
            .insert([{ activity_id: activityId, item_name: dto.item_name, amount: dto.amount }])
            .select();

        if (error) throw error;
        return data;
    }

    async updateBudgetItem(id: string, dto: UpdateBudgetItemDto) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('budget_item')
            .update({ item_name: dto.item_name, amount: dto.amount })
            .eq('id', id)
            .select();

        if (error) throw error;
        return data;
    }

    async deleteBudgetItem(id: string) {
        const supabase = this.supabaseService.getClient();
        const { error } = await supabase.from('budget_item').delete().eq('id', id);

        if (error) throw error;
        return { message: 'Budget item deleted successfully' };
    }
}
