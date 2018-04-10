module.exports = {
  inputs: {
    username: '//input[@id="j_idt8:j_username"]',
    password: '//input[@id="j_idt8:j_password"]',
    attachment: '//input[@type="file"]',
    //
    // e51 selector
    //
    researcherFirstname: '//input[@name="Form:j_idt30:inputTxtId"]',
    researcherLastname: '//*[@id="Form:j_idt51:inputTxtId"]',
    ethicsFileNumber: '//*[@id="Form:j_idt52:inputTxtId"]',
    projectTitle: '//*[@id="Form:j_idt53:inputTxtId"]',
    projectStatus: '',
  },
  buttons: {
    signIn: '//input[@id="j_idt8:submit"]',
    researcherModule: '//a[@id="profile:j_idt51"]',
    newProject: '//button[@id="Form:j_idt32"]',
    IamPI: '//button[@id="Form:j_idt43"]',
    IamNotPI: '//button[@id="Form:j_idt45"]',
    IamHopitalMontfortResearcher: '//input[@id="Form:initialQuestionFormTable:0:j_idt18:0"]',
    IamNotHopitalMontfortResearcher: '//input[@id="Form:initialQuestionFormTable:0:j_idt18:1"]',
    IhaveEthicsApproval: '//input[@id="Form:initialQuestionFormTable:4:j_idt18:0"]',
    IDontHaveEthicsApproval: '//input[@id="Form:initialQuestionFormTable:1:j_idt18:1"]',
    saveInitialQuestions: '//button[@id="Form:j_idt22"]',
    noDeadline: '//label[@for="Form:pendingDeadlineRequiredId:customRadio:1"]',
    yesDeadline: '//label[@for="Form:pendingDeadlineRequiredId:customRadio:0"]',
    projectType1: '//*[@id="Form:researchTypeId:j_idt121"]/div[2]',
    projectType2: '//*[@id="Form:researchTypeId:j_idt126"]/div[2]',
    projectType3: '//*[@id="Form:researchTypeId:j_idt196"]/div[2]',
    projectType4: '//*[@id="Form:researchTypeId:j_idt202"]/div[2]',
    projectType5: '//*[@id="Form:researchTypeId:j_idt260"]/div[2]',
    projectType6: '//*[@id="Form:researchTypeId:j_idt266"]/div[2]',
    projectType7: '//*[@id="Form:researchTypeId:j_idt312"]/div[2]',
    projectType8: '//*[@id="Form:researchTypeId:j_idt318"]/div[2]',
    projectType9: '//*[@id="Form:researchTypeId:j_idt352"]/div[2]',
    projectType10: '//*[@id="Form:researchTypeId:j_idt358"]/div[2]',
    noConflictOfInterest: '//label[@for="Form:conflictOfInterestId:customRadio:1"]',
    yesConflictOfInterest: '//label[@for="Form:conflictOfInterestId:customRadio:0"]',
    selectFundingOptions: '//label[@id="Form:projectIsFundedId:customRadio_label"]',
    noFunding: '//li[@data-label="No"]',
    yesFunding: '//li[@data-label="Yes"]',
    pendingFunding: '//li[@data-label="Pending"]',
    gotoProjectDescription: '//*[@id="Form:j_idt1000"]',
    REBApprovalLocation1: '//label[@for="Form:idWcted:customRadio:0"]',
    REBApprovalLocation2: '//label[@for="Form:idWcted:customRadio:1"]',
    REBApprovalLocation3: '//label[@for="Form:idWcted:customRadio:2"]',
    REBApprovalLocation4: '//label[@for="Form:idWcted:customRadio:3"]',
    REBApprovalLocation5: '//label[@for="Form:idWcted:customRadio:4"]',
    REBApprovalLocation6: '//label[@for="Form:idWcted:customRadio:5"]',
    REBApprovalLocation7: '//label[@for="Form:idWcted:customRadio:6"]',
    projectAboveMinimalRisk: '//label[@for="Form:primaryRebId:customRadio:0"]',
    projectBelowMinimalRisk: '//label[@for="Form:primaryRebId:customRadio:1"]',
    addAttachments: '//a[.="Add Attachments"]',
    upload: '//button[.="Upload"]',
    closeUploadAttachmentModal: '//button[@id="Form:attachmentList2:attachmentList2_Upload:j_idt93"]',
    gotoPIDeclaration: '//button[@id="Form:j_idt143"]',
    PIconfirmation: '//div[@class="ui-chkbox-box ui-widget ui-corner-all ui-state-default"]',
    gotoSubmitForReview: '//button[@id="Form:j_idt76"]',
    submitReview: '//button[@id="Form:reviewProcessDataTableId:0:j_idt52"]',
    //
    // e51 selector
    //
    projectDashboard: '/html/body/div[@id="window_0"]/div/div[@id="navigation:treeId"]/ul/li/a[@id="navigation:j_idt93"]',
    search: '//button[@name="Form:btn"]',
    actions: '//*[@id="Form:j_idt69:0:j_idt99_button"]/span[2]',
    administrativeActions: '//*[@id="Form:j_idt69:0:j_idt100"]/span',
  },
  textarea: {
    projectTitle: '//*[@id="Form:test:j_idt72"]',
    projectPurpose: '//textarea[@id="Form:j_idt38:j_idt48"]',
    projectProcedures: '//textarea[@id="Form:j_idt52:j_idt48"]',
    dataCollectionLocation: '//textarea[@id="Form:j_idt72:j_idt48"]',
    //
    // e51 selector
    //
    onHoldComments: 'Automated project put on hold for testing purpose.',
    removeOnHoldComments: 'Automated project removed from "on HOLD" for testing purpose.',
    onClosedComments: 'Automated project setted on "CLOSE" for testing purpose.',
    onReopenComments: 'Automated project setted on "REOPEN" for testing purpose.',
  },
  label: {
    PIconfirmation: '//label[@for="Form:j_idt45:"]',
    //
    // e51 selector
    //
  },
};
