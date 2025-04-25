import  Photo  from '../models/photoModel';
import User from '../models/userModel';
import { Sequelize } from 'sequelize';

export const getAdminStats = async () => {
  const totalUploads = await Photo.count();

  const mostActiveUploader = await User.findOne({
    include: [{ model: Photo }],
    order: [[Sequelize.fn('COUNT', Sequelize.col('Photos.id')), 'DESC']],
    group: ['User.id'],
  });

  const largestPhoto = await Photo.findOne({
    order: [['size', 'DESC']],
  });

  return {
    totalUploads,
    mostActiveUploader: mostActiveUploader?.name || 'N/A',
    largestPhoto: largestPhoto?.fileName || 'N/A',
  };
};
