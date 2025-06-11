import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase.service';

@Module({
    imports: [ConfigModule],
    providers: [SupabaseService],
    exports: [SupabaseService], // agar bisa dipakai di module lain
})
export class SupabaseModule { }
