import { IOrderMessage, IRatingTypes, IReviewMessageDetails, ISellerDocument } from '@hansin91/jobber-shared';
import { SellerModel } from '@users/models/seller.schema';
import mongoose from 'mongoose';
import { updateBuyerIsSeller } from '@users/services/buyer.service';

const getSellerById = async (sellerId: string): Promise<ISellerDocument | null> => {
  const seller: ISellerDocument | null = await SellerModel.findOne({ _id: new mongoose.Types.ObjectId(sellerId) }).exec() as ISellerDocument;
  return seller;
};

const getSellerByUsername = async (username: string): Promise<ISellerDocument | null> => {
  const seller: ISellerDocument | null = await SellerModel.findOne({ username }).exec() as ISellerDocument;
  return seller;
};

const getSellerByEmail = async (email: string): Promise<ISellerDocument | null> => {
  const seller: ISellerDocument | null = await SellerModel.findOne({ email }).exec() as ISellerDocument;
  return seller;
};

const getRandomSellers = async (size: number): Promise<ISellerDocument[]> => {
  const sellers: ISellerDocument[] = await SellerModel.aggregate([{ $sample: { size } }]);
  return sellers;
};

const createSeller = async (sellerData: ISellerDocument): Promise<ISellerDocument> => {
  const createdSeller: ISellerDocument = await SellerModel.create(sellerData) as ISellerDocument;
  await updateBuyerIsSeller(`${createdSeller.email}`);
  return createdSeller;
};

const updateSeller = async (sellerId: string, sellerData: ISellerDocument): Promise<ISellerDocument> => {
  const { profilePublicId, fullName, profilePicture, description, country, skills, oneliner, languages, responseTime, experience, education, socialLinks, certificates } = sellerData;
  const updatedSeller: ISellerDocument = await SellerModel.findOneAndUpdate(
    { _id: sellerId },
    {
      $set: {
        profilePublicId,
        fullName,
        profilePicture,
        description,
        country,
        skills,
        oneliner,
        languages,
        responseTime,
        experience,
        education,
        socialLinks,
        certificates
      }
    },
    { new: true }
  ).exec() as ISellerDocument;
  return updatedSeller;
};

const updateSellerTotalGigsCount = async (sellerId: string, count: number): Promise<void> => {
  await SellerModel.updateOne({ _id: sellerId }, { $inc: { totalGigs: count } }).exec();
};

const updateSellerOngoingJobs = async (sellerId: string, ongoingJobs: number): Promise<void> => {
  await SellerModel.updateOne({ _id: sellerId }, { $inc: { ongoingJobs } }).exec();
};

const updateSellerCancelledJobs = async (sellerId: string): Promise<void> => {
  await SellerModel.updateOne({ _id: sellerId }, { $inc: { ongoingJobs: -1, cancelledJobs: 1 } }).exec();
};

const updateSellerCompletedJobs = async (data: IOrderMessage): Promise<void> => {
  const {sellerId, ongoingJobs, completedJobs, totalEarnings, recentDelivery } = data;
  await SellerModel.updateOne({ _id: sellerId },
    { $inc: {
      ongoingJobs,
      completedJobs,
      totalEarnings
    },
    $set: { recentDelivery: new Date(recentDelivery!)}
  }).exec();
};

const updateSellerReview = async (data: IReviewMessageDetails): Promise<void> => {
  const ratingTypes: IRatingTypes = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
  };
  const ratingKey: string = ratingTypes[`${data.rating}`];
  await SellerModel.updateOne(
    { _id: data.sellerId },
    {
      $inc: {
        ratingsCount: 1,
        ratingSum: data.rating,
        [`ratingCategories.${ratingKey}.value`]: data.rating,
        [`ratingCategories.${ratingKey}.count`]: 1
      }
    }
  ).exec();
};

export {
  getSellerById,
  getSellerByUsername,
  getSellerByEmail,
  getRandomSellers,
  updateSeller,
  createSeller,
  updateSellerTotalGigsCount,
  updateSellerCompletedJobs,
  updateSellerOngoingJobs,
  updateSellerCancelledJobs,
  updateSellerReview
};
