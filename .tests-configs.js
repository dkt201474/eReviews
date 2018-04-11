function getCredentials () {
  const jsonfile = require ('jsonfile');
  const filename = './tests/credentials.json';

  credentials = jsonfile.readFileSync (filename);

  return credentials;
}

function getConfig () {
  const jsonfile = require ('jsonfile');
  const credentialsPath = './tests/credentials.json';
  const configPath = './tests/config.json';

  name = jsonfile.readFileSync (credentialsPath).user;

  config = jsonfile.readFileSync (configPath)[name];

  return config;
}

module.exports = {
  // Configs used in every tests
  global: {
    ResearcherPortal: 'https://uottawa-test.evision.ca/uottawa/faces/login.xhtml',
    ReviewerPortal: 'https://uottawa-test.evision.ca/uOttawaProcess/pages/login.xhtml',
  },
  credentials: getCredentials (),
  config: getConfig (),
  e37: {
    // INITIAL QUESTIONS
    // Are you a Hôpital Montfort researcher or is any part of your study being conducted under the auspices of the Hôpital Montfort (e.g., recruitment, intervention, access to medical records, data/biological material collection or storage)?
    IamHopitalMontfortResearcher: true, // default: true
    projectTitle: 'Automated Project test',
    // Has the project Received ethics approval at another Canadian Institution ?
    IhaveEthicsApproval: true, // default: true
    // Is there a pending deadline by which ethics approval is required?
    noDeadline: true, // default: true
    projectType1: true, // default: true,
    projectType2: true, // default: true,
    projectType3: false, // default: false,
    projectType4: false, // default: false,
    projectType5: false, // default: false,
    projectType6: false, // default: false,
    projectType7: false, // default: false,
    projectType8: false, // default: false,
    projectType9: false, // default: false,
    projectType10: false, // default: false,
    // Conflicts of Interest Disclosure
    // Does anyone on the research team have an actual or potential, apparent or perceived conflict of interest (financial, personal or other) in regards to this research project ?
    noConflictOfInterest: true, // default: true
    // Funding Information
    // Did you receive funding for this project?
    noFunding: true, // default: true
    yesFunding: false, // default: false. TRUE ONLY IF false = noFunding = pendingFunding
    pendingFunding: false, // default: false. TRUE ONLY IF false = yesFunding = pendingFunding
    //
    // PROJECT DESCRIPTION
    // Describe the purpose and objectives of the current project. Include the research question(s).
    projectPurpose: 'For automated test purpose', // default
    projectProcedures: 'Following automated test procedures', // default
    // General information
    REBApprovalLocation1: true, // default: true
    REBApprovalLocation2: true, // default: true
    REBApprovalLocation3: false, // default: false
    REBApprovalLocation4: false, // default: false
    REBApprovalLocation5: false, // default: false
    REBApprovalLocation6: false, // default: false
    REBApprovalLocation7: false, // default: false
    REBApprovalLocation8: false, // default: false
    REBApprovalLocation9: false, // default: false
    REBApprovalLocation10: false, // default: false
    // Where will recruitment and data collection occur?
    dataCollectionLocation: 'University of Ottawa',
    // Did the primary REB review the project as a full REB file and is it above minimal risk?
    projectBelowMinimalRisk: true, // default: true
    // Confirm review submission
    submitReview: true, // default: true
  },
  e51: {
    // Project dashboard
    //    Search for project
    researcherFirstname: 'Sadeck',
    researcherLastname: 'YN',
    ethicsFileNumber: '',
    projectTitle: '',
    projectStatus: '',
  },
  e310: {
    comments: 'Testing email template "3.8": Form incomplete',
    resubmissionDeadline: '30-11-2017',
  },
};
