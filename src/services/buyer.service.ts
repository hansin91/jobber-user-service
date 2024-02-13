import { IBuyerDocument } from '@hansin91/jobber-shared';
import { BuyerModel } from '@users/models/buyer.schema';

const getBuyerByEmail = async (email: string): Promise<IBuyerDocument | null> => {
  const buyer: IBuyerDocument | null = await BuyerModel.findOne({ email }).exec() as IBuyerDocument;
  return buyer;
};

const getBuyerByUsername = async (username: string): Promise<IBuyerDocument | null> => {
  const buyer: IBuyerDocument | null = await BuyerModel.findOne({ username }).exec() as IBuyerDocument;
  return buyer;
};

const getRandomBuyers = async (count: number): Promise<IBuyerDocument[]> => {
  const buyers: IBuyerDocument[] = await BuyerModel.aggregate([{ $sample: { size: count } }]);
  return buyers;
};

const createBuyer = async (buyerData: IBuyerDocument): Promise<void> => {
  const existingBuyer: IBuyerDocument | null = await getBuyerByEmail(`${buyerData.email}`);
  if (!existingBuyer) {
    await BuyerModel.create(buyerData);
  }
};

const updateBuyerIsSeller = async (email: string): Promise<void> => {
  await BuyerModel.updateOne(
    {email},
    {
      $set: {
        isSeller: true
      }
    }
  ).exec();
};

const updateBuyerPurchasedGigs = async (buyerId: string, purchasedGigId: string, type: string): Promise<void> => {
  await BuyerModel.updateOne(
    {_id: buyerId},
    type === 'purchased-gigs' ?
    {
      $push: {
        purchasedGigs: purchasedGigId
      }
    } : {
      $pull: {
        purchasedGigs: purchasedGigId
      }
    }
  ).exec();
};

export { getBuyerByEmail, getBuyerByUsername, getRandomBuyers, createBuyer, updateBuyerIsSeller, updateBuyerPurchasedGigs };

