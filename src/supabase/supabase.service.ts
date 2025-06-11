import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private readonly client: SupabaseClient;

    constructor(private configService: ConfigService) {
        const url = this.configService.get<string>('SUPABASE_URL');
        const key = this.configService.get<string>('SUPABASE_KEY');

        if (!url) throw new Error('SUPABASE_URL is required');
        if (!key) throw new Error('SUPABASE_KEY is required');

        this.client = createClient(url, key);
    }

    getClient(): SupabaseClient {
        return this.client;
    }
}
