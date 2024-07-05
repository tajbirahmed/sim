export type AddressType = 'Permanent' | 'Present';

export interface Address {
    address_id: number;
    country: string;
    division: string;
    district: string;
    upazila: string;
    union_name: string;
    post_office: string;
    village: string;
    postal_code?: number | null;
    thana: string;
    address_type: AddressType;
}
