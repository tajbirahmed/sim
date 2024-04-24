export const SemesterHelper = (semester: number): string => {
    return (
        semester === 1 ? "st" :
            semester === 2 ? "nd" :
                semester === 3 ? "rd" :
                    "th"
    );
 }