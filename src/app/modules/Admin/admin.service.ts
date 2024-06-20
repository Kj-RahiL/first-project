import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { Admin } from './admin.model';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(),query )
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id)
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
    const { name, ...remainingAdminData } = payload;
  
    const modifiedUpdateData: Record<string, unknown> = {
      ...remainingAdminData,
    };
  
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdateData[`name.${key}`] = value;
      }
    }
  
    const result = await Admin.findByIdAndUpdate(id, modifiedUpdateData, {
      new: true,
      runValidators: true,
    });
  
    return result;
  };
  

const deleteAdminFromDB = async (id: string) => {
  const isAdminExist = await Admin.findById(id);

  if (!isAdminExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Admin does not exist');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }
    // get user id from deleted user
    const userId = deletedAdmin.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete ');
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
