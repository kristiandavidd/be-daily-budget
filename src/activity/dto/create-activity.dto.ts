export class CreateActivityDto {
    name: string;
    activity_date: string;
    budget_item: {
        item_name: string;
        amount: number;
    }[];
}
