export type Student = {
    student_id: number, 
    user_id: string, 
    hall_id: number, 
    department_id: number,
    program_id: number,
    fathers_name_bn: string,
    mothers_name_bn: string,
    fathers_name: string,
    mothers_name: string,
    guardians_name: string,
    guardian_address_id: number,
    guardian_name_bn: string,
    guardian_relation: 'Father' | 'Mother' | 'Other',
    academic_session_id : number
}