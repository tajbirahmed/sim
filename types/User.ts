export type User = {
    user_id: string; // char(36)
    profile_image_id?: number; // int, nullable
    sign_id?: number; // int, nullable
    permanent_address_id: number; // int
    email: string; // varchar(250)
    phone?: string; // varchar(20), nullable
    first_name_bn?: string; // varchar(250), nullable
    last_name_bn?: string; // varchar(250), nullable
    first_name: string; // varchar(250)
    last_name: string; // varchar(250)
    dob: string; // date
    gender?: string; // varchar(64), nullable
    blood_group?: string; // varchar(4), nullable
    religion?: string; // varchar(128), nullable
    ethnicity?: string; // varchar(128), nullable
    nationality?: string; // varchar(128), nullable
    password: string; // varchar(32)
    present_address_id: number; // int
};
