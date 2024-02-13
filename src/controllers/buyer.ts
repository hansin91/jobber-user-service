import { IBuyerDocument, winstonLogger } from '@hansin91/jobber-shared';
import { config } from '@users/config';
import { getBuyerByEmail, getBuyerByUsername } from '@users/services/buyer.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';

class BuyerController {

  public log: Logger;
  constructor() {
    this.log = winstonLogger (`${config.ELASTIC_SEARCH_URL}`, 'BuyerController', 'debug');
  }
  public getByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const buyer: IBuyerDocument | null = await getBuyerByEmail(req.currentUser!.email);
      res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
    } catch (error) {
      this.log.log('error', 'BuyerController getByEmail():', error);
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };

  public getByCurrentUsername = async (req: Request, res: Response): Promise<void> => {
    try {
      const buyer: IBuyerDocument | null = await getBuyerByUsername(req.currentUser!.username);
      res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
    } catch (error) {
      this.log.log('error', 'BuyerController getByCurrentUsername():', error);
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };

  public getByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
      const buyer: IBuyerDocument | null = await getBuyerByUsername(req.params.username);
      res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
    } catch (error) {
      this.log.log('error', 'BuyerController getByUsername():', error);
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };
}

export const buyerController: BuyerController = new BuyerController();