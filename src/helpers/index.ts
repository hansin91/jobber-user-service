export const generateRandomUniversity = () => {
  const universityNames = [
    'Harvard University',
    'Stanford University',
    'Massachusetts Institute of Technology',
    'University of California, Berkeley',
    'University of Cambridge',
    'University of Oxford',
    'California Institute of Technology',
    'Princeton University',
    'Yale University',
    'University of Chicago',
    'Columbia University',
    'University of Michigan',
    'University of Pennsylvania',
    'Johns Hopkins University',
    'University of California, Los Angeles',
    'Northwestern University',
    'University of Toronto',
    'University of Washington',
    'Duke University',
    'University College London',
    'Cornell University',
    'University of California, San Diego',
    'University of Texas at Austin',
    'University of California, Davis',
    'University of Illinois at Urbana-Champaign',
    'University of California, Santa Barbara',
    'University of Wisconsin-Madison',
    'University of Minnesota',
    'University of North Carolina at Chapel Hill',
    'University of Southern California',
    'University of California, Irvine',
    'University of Pittsburgh',
    'University of Maryland, College Park',
    'University of British Columbia',
    'University of Virginia',
    'McGill University',
    'University of Edinburgh',
    'University of California, Santa Cruz',
    'New York University',
    'University of Colorado Boulder',
    'University of Florida',
    'University of Manchester',
    'University of Sydney',
    'Boston University',
    'Ohio State University',
    'University of Arizona',
    'University of Auckland',
    'University of Copenhagen',
    'University of Melbourne'
  ];
  // Shuffle the array to get random names
  const shuffledUniversityNames = universityNames.sort(() => Math.random() - 0.5);

  // Take the first 50 elements
  const [randomUniversityNames] = shuffledUniversityNames.slice(0, 50);
  return randomUniversityNames;
};

export const generateRandomMayor = () => {
  const universityMajors = [
    'Computer Science',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Biology',
    'Chemistry',
    'Physics',
    'Mathematics',
    'Psychology',
    'Economics',
    'English Literature',
    'History',
    'Political Science',
    'Sociology',
    'Business Administration',
    'Finance',
    'Accounting',
    'Marketing',
    'Art',
    'Music',
    'Film Studies',
    'Communication',
    'Journalism',
    'Education',
    'Nursing',
    'Health Sciences',
    'Public Health',
    'Environmental Science',
    'Anthropology',
    'Philosophy',
    'Foreign Languages',
    'Geology',
    'Architecture',
    'Urban Planning',
    'Linguistics',
    'Criminal Justice',
    'Theater',
    'Dance',
    'Nutrition',
    'Hospitality Management',
    'Kinesiology',
    'Graphic Design',
    'Industrial Design',
    'Agriculture',
    'Forestry',
    'Veterinary Medicine',
    'Dentistry',
    'Law',
    'Pharmacy'
  ];

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * universityMajors.length);

  // Return the random major
  return universityMajors[randomIndex];
};

export const generateRandomDegree = () => {
  const degrees = [
    'Bachelor of Arts (BA)',
    'Bachelor of Science (BS)',
    'Master of Arts (MA)',
    'Master of Science (MS)',
    'Doctor of Philosophy (PhD)',
    'Doctor of Medicine (MD)',
    'Juris Doctor (JD)',
    'Bachelor of Business Administration (BBA)',
    'Master of Business Administration (MBA)',
    'Bachelor of Engineering (BEng)',
    'Master of Engineering (MEng)',
    'Bachelor of Fine Arts (BFA)',
    'Master of Fine Arts (MFA)',
    'Bachelor of Education (BEd)',
    'Master of Education (MEd)',
    'Bachelor of Nursing (BN)',
    'Master of Public Health (MPH)',
    'Bachelor of Architecture (BArch)',
    'Master of Architecture (MArch)',
    'Bachelor of Laws (LLB)',
    'Master of Laws (LLM)'
  ];

  // Generate a random index
  const randomIndex = Math.floor(Math.random() * degrees.length);

  // Return the random degree
  return degrees[randomIndex];
};