import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // static method

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }

  const result = await Student.create(studentData); //built in static method
  //   const student = new Student(studentData); //create instance

  // if(await student.isUserExits(studentData.id)){
  //   throw new Error("User already exists")
  // }
  // const result = await student.save() //built in instance method

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
};
