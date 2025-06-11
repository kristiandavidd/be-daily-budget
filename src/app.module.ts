import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { BudgetItemModule } from './budget-item/budget-item.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 

    }), 
    ActivityModule,
    BudgetItemModule,
    SupabaseModule,
  ]
})
export class AppModule { }
