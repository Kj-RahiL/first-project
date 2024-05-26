import { Request, Response } from 'express';
import { studentServices } from './student.service';
import studentValidationSchema from './student.zod.validation';
// import studentValidationSchema from '../student.joi.valdation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // joi validation schema
    const { student: studentData } = req.body;

    // joi validation schema
  //  const {error, value} = studentValidationSchema.validate(studentData)

  // Zod validation schema

  const zodParseData = studentValidationSchema.parse(studentData)


    const result = await studentServices.createStudentIntoDB(zodParseData);



    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went is wrong",
    //     error: error.details
    //   })
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Students is retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
