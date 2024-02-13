import { Request, Response } from 'express';
import { IAuthMockRequest, authUserPayload, buyerDocument, buyerMockRequest, buyerMockResponse } from '@users/controllers/test/mocks/buyer.mock';
import * as buyer from '@users/services/buyer.service';
import { buyerController } from '@users/controllers/buyer';

jest.mock('@users/services/buyer.service');
jest.mock('@hansin91/jobber-shared');
jest.mock('@elastic/elasticsearch');

describe('Buyer Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getByEmail method', () => {
    it ('should return buyer profile data', async () => {
      const requestPayload: IAuthMockRequest = { sessionData: {}, currentUser: authUserPayload };
      const req: Request = buyerMockRequest(requestPayload) as unknown as Request;
      const res: Response = buyerMockResponse();
      jest.spyOn(buyer, 'getBuyerByEmail').mockResolvedValue(buyerDocument);

      await buyerController.getByEmail(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Buyer profile', buyer: buyerDocument });
    });
  });

  describe('getCurrentUser method', () => {
    it ('should return buyer profile data', async () => {
      const requestPayload: IAuthMockRequest = { sessionData: {}, currentUser: authUserPayload };
      const req: Request = buyerMockRequest(requestPayload) as unknown as Request;
      const res: Response = buyerMockResponse();
      jest.spyOn(buyer, 'getBuyerByUsername').mockResolvedValue(buyerDocument);

      await buyerController.getByCurrentUsername(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Buyer profile', buyer: buyerDocument });
    });
  });

  describe('getByUsername method', () => {
    it ('should return buyer profile data', async () => {
      const requestPayload: IAuthMockRequest = { sessionData: {}, currentUser: authUserPayload, params: { username: 'Luffy'} };
      const req: Request = buyerMockRequest(requestPayload) as unknown as Request;
      const res: Response = buyerMockResponse();
      jest.spyOn(buyer, 'getBuyerByUsername').mockResolvedValue(buyerDocument);

      await buyerController.getByUsername(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Buyer profile', buyer: buyerDocument });
    });
  });

});