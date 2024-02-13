import { IAuthPayload, IBuyerDocument } from '@hansin91/jobber-shared';
import { Response } from 'express';
import { v4 as uuidV4 } from 'uuid';

export const buyerMockRequest = (request: IAuthMockRequest) => ({
  session: request.sessionData,
  currentUser: request.currentUser,
  params: request.params
});

export const buyerMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export interface IAuthMockRequest {
  sessionData: IJWT,
  currentUser?: IAuthPayload | null,
  params?: IParams
}

export interface IParams {
  username?: string;
}

export interface IJWT {
  jwt?: string
}

export const authUserPayload: IAuthPayload = {
  uuid: uuidV4(),
  username: 'Luffy',
  email: 'luffy@onepiece.com',
  iat: 1235282483
};

export const buyerDocument: IBuyerDocument = {
  _id: uuidV4(),
  username: 'Luffy',
  email: 'luffy@onepiece.com',
  country: 'Japan',
  profilePicture: '',
  purchasedGigs: [],
  isSeller: false,
  createdAt: '2023-12-19T07:42:24.431Z',
};
