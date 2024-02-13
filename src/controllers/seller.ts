import { faker } from '@faker-js/faker';
import { BadRequestError, IBuyerDocument, IEducation, IExperience, ISellerDocument, winstonLogger } from '@hansin91/jobber-shared';
import { config } from '@users/config';
import { generateRandomDegree, generateRandomMayor, generateRandomUniversity } from '@users/helpers';
import { sellerSchema } from '@users/schemes/seller';
import { getRandomBuyers } from '@users/services/buyer.service';
import { createSeller, getRandomSellers, getSellerByEmail, getSellerById, getSellerByUsername, updateSeller } from '@users/services/seller.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { floor, random, sample, sampleSize } from 'lodash';
import { Logger } from 'winston';
import { v4 as uuidv4 } from 'uuid';

class SellerController {

  private log: Logger;
  constructor() {
    this.log = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'SellerController', 'debug');
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = await Promise.resolve(sellerSchema.validate(req.body));
      if (error?.details) {
        throw new BadRequestError(error.details[0].message, 'SellerController createSeller() method error');
      }
      const existingSeller: ISellerDocument | null = await getSellerByEmail(req.body.email);
      if (existingSeller) { throw new BadRequestError('Seller already exist. Update your account', 'SellerController createSeller() method error'); };
      const {description, education, socialLinks, certificates, responseTime, experience, languages, oneliner, country, skills, profilePublicId, fullName, email, profilePicture } = req.body;
      const seller: ISellerDocument = {
        profilePublicId,
        fullName,
        username: req.currentUser!.username,
        email,
        profilePicture,
        description,
        oneliner,
        country,
        skills,
        languages,
        responseTime,
        experience,
        education,
        socialLinks,
        certificates
      };
      const createdSeller: ISellerDocument = await createSeller(seller);
      res.status(StatusCodes.CREATED).json({ message: 'Seller created successfully', seller: createdSeller });
    } catch (error) {
      this.log.log('error', 'SellerController createSeller():', error);
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = await Promise.resolve(sellerSchema.validate(req.body));
      if (error?.details) {
        throw new BadRequestError(error.details[0].message, 'SellerController updateSeller() method error');
      }
      const {description, education, socialLinks, certificates, responseTime, experience, languages, oneliner, country, skills, profilePublicId, fullName, profilePicture } = req.body;
      const seller: ISellerDocument = {
        profilePublicId,
        fullName,
        profilePicture,
        description,
        oneliner,
        country,
        skills,
        languages,
        responseTime,
        experience,
        education,
        socialLinks,
        certificates
      };
      const updatedSeller: ISellerDocument = await updateSeller(req.params.sellerId, seller);
      res.status(StatusCodes.OK).json({ message: 'Seller updated successfully', seller: updatedSeller });
    } catch (error) {
      this.log.log('error', 'SellerController updateSeller():', error);
      res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
  };

  public getById = async(req: Request, res: Response): Promise<void> => {
    try {
      const seller: ISellerDocument | null = await getSellerById(req.params.sellerId);
      res.status(StatusCodes.OK).json({ message: 'Seller profile', seller });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public getByUsername = async(req: Request, res: Response): Promise<void> => {
    try {
      const seller: ISellerDocument | null = await getSellerByUsername(req.params.username);
      res.status(StatusCodes.OK).json({ message: 'Seller profile', seller });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public getRandomSellers = async(req: Request, res: Response): Promise<void> => {
    try {
      const sellers: ISellerDocument[] = await getRandomSellers(parseInt(req.params.size));
      res.status(StatusCodes.OK).json({ message: 'Random sellers profile', sellers });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public seedSeller = async (req: Request, res: Response): Promise<void> => {
    const { count } = req.params;
    const buyers: IBuyerDocument[] = await getRandomBuyers(parseInt(count, 10));
    for (let i=0; i < buyers.length; i++) {
      const buyer: IBuyerDocument = buyers[i];
      const existingSeller: ISellerDocument | null = await getSellerByEmail(`${buyer.email}`);
      if (existingSeller) {
        throw new BadRequestError('Seller already exist.', 'SellerController seedSeller() method error');
      }
      const basicDescription: string = faker.lorem.paragraph(4);
      const skills: string[] = ['JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C#',
      'C++',
      'HTML',
      'CSS',
      'React',
      'Angular',
      'Vue.js',
      'Node.js',
      'Express.js',
      'Django',
      'Spring',
      'ASP.NET',
      'Ruby',
      'PHP',
      'SQL',
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'Firebase',
      'AWS',
      'Azure',
      'Google Cloud Platform',
      'Docker',
      'Kubernetes',
      'Git',
      'Jenkins',
      'CI/CD',
      'Agile',
      'Scrum',
      'Kanban',
      'Machine Learning',
      'Deep Learning',
      'Artificial Intelligence',
      'Natural Language Processing',
      'Computer Vision',
      'Blockchain',
      'Internet of Things (IoT)',
      'Unity',
      'Unreal Engine',
      'TensorFlow',
      'PyTorch',
      'GraphQL',
      'RESTful APIs',
      'Microservices',
      'Serverless',
      'Big Data',
      'Data Science',
      'Data Engineering',
      'DevOps',
      'Frontend Development',
      'Backend Development',
      'Full Stack Development',
      'Mobile Development',
      'Game Development',
      'UI/UX Design',
      'Test Automation',
      'Cybersecurity',
      'Web Scraping',
        'RPA (Robotic Process Automation)'];
      const seller: ISellerDocument = {
        profilePublicId: uuidv4(),
        fullName: faker.person.fullName(),
        username: buyer.username,
        email: buyer.email,
        country: faker.location.country(),
        profilePicture: buyer.profilePicture,
        description: basicDescription.length <= 250 ? basicDescription : basicDescription.slice(0, 250),
        oneliner: faker.word.words({ count: { min: 5, max: 10 }}),
        skills: sampleSize(skills, sample([1, 4])),
        languages: [
          {'language': 'English', 'level': 'Native' },
          {'language': 'Spanish', 'level': 'Basic' },
          {'language': 'German', 'level': 'Basic' },
        ],
        responseTime: parseInt(faker.commerce.price({ min: 1, max: 5, dec: 0 })),
        experience: this.seedRandomExperience(parseInt(faker.commerce.price({ min: 2, max: 4, dec: 0 }))),
        education: this.seedRandomEducation(parseInt(faker.commerce.price({ min: 2, max: 4, dec: 0 }))),
        socialLinks: ['https://kickchatapp.com', 'http://youtube.com', 'https://facebook.com'],
        certificates: [
          {
            'name': 'Flutter App Developer',
            'institution': 'Flutter Academy',
            'year': 2021
          },
          {
            'name': 'Android App Developer',
            'institution': '2019',
            'year': 2020
          },
          {
            'name': 'IOS App Developer',
            'institution': 'Apple Inc.',
            'year': 2019
          }
        ]
      };
      await createSeller(seller);
    }
    res.status(StatusCodes.CREATED).json({ message: 'Sellers created successfully '});
  };

  private seedRandomExperience = (count: number): IExperience[] => {
    const result: IExperience[] = [];
    for (let i=0; i < count; i++) {
      const randomStartYear = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
      const randomEndYear = ['Present', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018','2019', '2020','2021','2022', '2023', '2024'];
      const endYear = randomEndYear[floor(random(0.9) * randomEndYear.length)];
      const experience = {
        company: faker.company.name(),
        title: faker.person.jobTitle(),
        startDate: `${faker.date.month()} ${randomStartYear[floor(random(0.9) * randomStartYear.length)]}`,
        endDate: endYear === 'Present' ? 'Present' : `${faker.date.month()} ${endYear}`,
        description: faker.commerce.productDescription().slice(0, 100),
        currentlyWorkingHere: endYear === 'Present',
      };
      result.push(experience);
    };
    return result;
  };

  private seedRandomEducation = (count: number): IEducation[] => {
    const result: IEducation[] = [];
    for (let i=0; i < count; i++) {
      const randomYear = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
      const education: IEducation = {
        country: faker.location.country(),
        university: generateRandomUniversity(),
        degree: generateRandomDegree(),
        major: generateRandomMayor(),
        year: `${randomYear[floor(random(0.9) * randomYear.length)]}`
      };
      result.push(education);
    };
    return result;
  };
}

export const sellerController: SellerController = new SellerController();