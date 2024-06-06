export type TUser = {
  id: string;
  password: string;
  needsPassword: boolean;
  role: 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
