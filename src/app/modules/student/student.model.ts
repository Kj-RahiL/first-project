  import { Schema, model, connect } from 'mongoose';

  import {
    Guardian,
    LocalGuardian,
    Student,
    userName,
  } from './student.interface';


  const userNameSchema = new Schema<userName>({
    firstName: { type: String, required: [true, 'First Name is Required'] },
    middleName: { type: String },
    lastName: {
      type: String,
      required: [true, 'Last Name is Required'],
    },
  });

  const guardianSchema = new Schema<Guardian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
  });

  const localGuardianSchema = new Schema<LocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
  });

  const studentSchema = new Schema<Student>({
    id: { type: String, unique: true },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        // message: "The gender field can only br onr of the following: 'male', 'female' or 'other'. " ,
        message: ' {VALUE} is not valid ',

        // amra cayle custom message dite pari, othoba user theke value niye error dekhayte pari
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
  });

  export const StudentModel = model<Student>('Student', studentSchema);
