import { createContext } from "react";

import { SemesterType } from "@/types/SemesterType";
export interface SemesterContextType { 
  semester: SemesterType, 
  setSemester: (semester: SemesterType) => void
}

export const SemesterContext = createContext<SemesterContextType | undefined>(undefined)