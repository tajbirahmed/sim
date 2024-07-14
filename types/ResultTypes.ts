export interface ResultDataType {
    exam_id: number;
    department_id: number;
    academic_session_id: number;
    exam_name: string;
    exam_centre: string;
    exam_session: string;
    exam_end_date: Date;
    exam_start_date: Date;
    is_result_submitted: number;
    result_submit_date: Date;
    committee_created: number;
    course_id: number;
    student_id: number;
    fem: number;
    catm: number;
    gpa: number;
    course_code: string;
    course_title: string;
    credit: number;
    course_type: string;
    exam_minutes: number;
}
