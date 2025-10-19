export interface Member {
  _id: string;
  name: string;
  age: number;
  gender: string;
  familyName: string;
  parentIds?: string[];
  spouseId?: string;
}

export interface MemberFormData {
  name: string;
  age: number;
  gender: string;
  familyName: string;
  parentId?: string | null; // Keep for form submission (backend will convert to parentIds)
  spouseId?: string;
  isRootMember?: boolean;
}

export interface FamilyState {
  member: Member | null;
  spouse: Member | null;
  children: Member[];
  loading?: boolean;
  error?: string | null;
}

export interface BreadcrumbProps {
  lineage: Member[];
}
