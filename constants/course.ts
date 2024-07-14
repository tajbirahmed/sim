

export interface Course {
   course_code: string;
   course_id: number;
   course_title: string;
   course_type: string;
   credit: number;
   department_id: number;
   exam_minutes: number;
   academic_session_id: number;
   catm_submit_date: string | null;
   is_catm_submitted: number;
   result_status: string;
   result_submit_date: string;
   teacher_id: number;
   title: string;
   designation: string;
   area_of_interest: string;
   email: string;
   first_name: string;
   last_name: string;
   first_name_bn: string;
   last_name_bn: string;
   phone: string;
   profile_image_id: number;
}

export const NavData =[
   {
    title: "Data Communication",
    tName:"Kazi Ashrafuzzaman",
    course_id:"CSE-511",
    course_credit:"3"
   },
   {
    title:"Telecommunication",
    tName:"Abu Nowshad Chowdhury",
    course_id:"CSE-611",
    course_credit:"3"
   },
   {
    title:"Networking",
    tName:"Farah Jahan",
    course_id:"CSE-612",
    course_credit:"3"
   },
   {
    title:"Technical Writing",
    tName:"Rudra Pratap Deb Nath",
    course_id:"CSE-612",
    course_credit:"1"
   },
   {
    title:"Web Engineering",
    tName:"Ikbal Sumon",
    course_id:"CSE-613",
    course_credit:"3"
   },
]
   
