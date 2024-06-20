import { Schema, model } from 'mongoose';
import { FacultyModel, TFaculty, TUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
    trim: true,
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'user',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: `{VALUE} is not valid gender`,
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
facultySchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName} `;
});

// filter out deleted documents
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
