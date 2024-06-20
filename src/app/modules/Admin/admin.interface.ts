/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  managementDepartment: Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean;
};
// for creating static

export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}

// for creating instance

// export interface StudentMethods  {
//   isUserExits(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>;
