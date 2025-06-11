import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
    constructor(private supabaseService: SupabaseService) { }

    async getAllActivitiesWithItems() {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('activity')
            .select('*, budget_item(*)');

        if (error) throw error;
        return data;
    }

    async createActivity(dto: CreateActivityDto) {
        const supabase = this.supabaseService.getClient();

        const { data: activityData, error: activityError } = await supabase
            .from('activity')
            .insert([{ activity_date: dto.activity_date, name: dto.name }])
            .select();

        if (activityError) throw activityError;

        const activity = activityData?.[0];
        if (!activity) throw new Error("Activity gagal ditambahkan");

        const budgetItems = dto.budget_item.map((item) => ({
            activity_id: activity.id,
            item_name: item.item_name,
            amount: item.amount,
        }));

        const { error: itemError } = await supabase
            .from('budget_item')
            .insert(budgetItems);

        if (itemError) throw itemError;

        return { activity, budget_item: budgetItems };
    }    

    async updateActivity(id: string, dto: UpdateActivityDto) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('activity')
            .update({ activity_date: dto.activity_date, name: dto.name })
            .eq('id', id)
            .select();

        if (error) throw error;
        return data;
    }

    async deleteActivity(id: string) {
        const supabase = this.supabaseService.getClient();
        const { error } = await supabase.from('activity').delete().eq('id', id);

        if (error) throw error;
        return { message: 'Activity deleted successfully' };
    }
}
