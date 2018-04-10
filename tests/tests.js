var nwConfig = require ('../nightwatch.conf.js');
var CONFIGS = require ('../.tests-configs.js');
var CREDENTIALS = require ('../.tests-configs.js').credentials;
var TESTS_CONFIG = require ('../.tests-configs.js').config;
var http = require ('http');
var DOM = require ('./selectors');

module.exports = {
  New_Monfort_project: function (browser) {
    browser
      .url (CONFIGS.global.ResearcherPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText ('body', 'Sign in') // we are in the signin page
      .useXpath ()
      .assert.visible (DOM.inputs.username) // the username field is present
      .assert.visible (DOM.inputs.password) // the password field is present
      .setValue (DOM.inputs.username, CREDENTIALS.pi.username)
      .setValue (DOM.inputs.password, CREDENTIALS.pi.password)
      .click (DOM.buttons.signIn)
      // .........................................................................
      // Step 2: Create a new project
      // Page: Researcher Dashboard
      // .........................................................................
      .pause (1000)
      .click ('//*[@id="profile:j_idt516"]')
      .pause (1000)
      // Switch to researcher module
      // .waitForElementVisible (DOM.buttons.researcherModule)
      .click (DOM.buttons.researcherModule)
      .pause (1500)
      // Create a new project
      .waitForElementVisible (DOM.buttons.newProject)
      .click (DOM.buttons.newProject)
      .pause (1000)
      // ---------------------------------------------------------------
      // 1/5: INITIAL QUESTIONS
      // Is this your project, i.e. are you the Principal Investigator (PI) or Student-PI (4th yr., Masters, PhD project))?
      .waitForElementVisible (DOM.buttons.IamPI)
      .click (DOM.buttons.IamPI)
      .pause (1000)
      // Are you a Hôpital Montfort researcher or is any part of your study being conducted under the auspices of the Hôpital Montfort (e.g., recruitment, intervention, access to medical records, data/biological material collection or storage)?
      .waitForElementVisible (DOM.buttons.IamHopitalMontfortResearcher)
      // Are you hospital montford researcher ?
      .click (
        CONFIGS.e37.IamHopitalMontfortResearcher
          ? DOM.buttons.IamHopitalMontfortResearcher
          : DOM.buttons.IamNotHopitalMontfortResearcher
      )
      .pause (1000)
      // Has this project received ethics approval from another TCPS 2-compliant REB?
      .waitForElementVisible (DOM.buttons.IhaveEthicsApproval)
      .click (DOM.buttons.IhaveEthicsApproval)
      .pause (1000)
      // Save initial question
      .waitForElementVisible (DOM.buttons.saveInitialQuestions)
      .click (DOM.buttons.saveInitialQuestions) // Save
      .pause (2000)
      // ---------------------------------------------------------------
      // 2/5: PROJECT OVERVIEW
      // Project Title
      .waitForElementVisible (DOM.textarea.projectTitle)
      .setValue (DOM.textarea.projectTitle, CONFIGS.e37.projectTitle)
      .pause (1000)
      // Is there a pending deadline by which ethics approval is required?
      .waitForElementVisible (DOM.buttons.noDeadline)
      .click (DOM.buttons.noDeadline)
      .pause (1000)
      // Project Type
      .waitForElementVisible (DOM.buttons.projectType1)
      .click (DOM.buttons.projectType1)
      .pause (1000)
      // Conflicts of Interest Disclosure
      .waitForElementVisible (DOM.buttons.noConflictOfInterest)
      .click (DOM.buttons.noConflictOfInterest)
      .pause (1000)
      // Did you receive funding for this project?
      .waitForElementVisible (DOM.buttons.selectFundingOptions)
      .click (DOM.buttons.selectFundingOptions)
      .pause (1000)
      // No
      .waitForElementVisible (DOM.buttons.noFunding)
      .click (DOM.buttons.noFunding)
      .pause (1000)
      // Next (go to project description)
      .click (DOM.buttons.gotoProjectDescription)
      .pause (1000)
      // ---------------------------------------------------------------
      // 3/5 PROJECT DESCRIPTION
      .pause (1000)
      // Describe the purpose and objectives of the current project. Include the research question(s).
      .waitForElementVisible (DOM.textarea.projectPurpose)
      .setValue (DOM.textarea.projectPurpose, CONFIGS.e37.projectTitle)
      // Describe all methods and procedures that will be used to obtain the data and answer the research question(s).
      .waitForElementVisible (DOM.textarea.projectProcedures)
      .setValue (DOM.textarea.projectProcedures, CONFIGS.e37.projectTitle)
      .pause (1000)
      // Where was the REB approval obtained?
      .waitForElementVisible (DOM.buttons.REBApprovalLocation1)
      .click (DOM.buttons.REBApprovalLocation1)
      .click (DOM.buttons.REBApprovalLocation2)
      // Where will recruitment and data collection occur?
      .waitForElementVisible (DOM.textarea.dataCollectionLocation)
      .setValue (
        DOM.textarea.dataCollectionLocation,
        CONFIGS.e37.dataCollectionLocation
      )
      .pause (1000)
      // Did the primary REB review the project as a full REB file and is it above minimal risk?
      .waitForElementVisible (DOM.buttons.projectBelowMinimalRisk)
      .click (DOM.buttons.projectBelowMinimalRisk)
      .pause (1000)
      // Add attachment
      .waitForElementVisible (DOM.buttons.addAttachments)
      .click (DOM.buttons.addAttachments)
      .pause (1000)
      // wait for the model panel to be visible
      .waitForElementVisible (
        '//div[@id="Form:attachmentList2:attachmentList2_Upload:AttachmentUpload"]'
      )
      // import the attachment
      .setValue (
        '//input[@type="file"]',
        require ('path').resolve (__dirname + '/files/REB_certificate.docx')
      )
      .pause (1000)
      // launch uploading
      .waitForElementVisible (DOM.buttons.upload)
      .click (DOM.buttons.upload)
      // upload is successfull
      .pause (1000)
      .waitForElementVisible (
        '//span[.="Attachment is uploaded successfully."]'
      )
      // close modal
      .waitForElementVisible (DOM.buttons.closeUploadAttachmentModal)
      .click (DOM.buttons.closeUploadAttachmentModal)
      .pause (1000)
      // goto to PI declaration
      .waitForElementVisible (DOM.buttons.gotoPIDeclaration)
      .click (DOM.buttons.gotoPIDeclaration)
      // ---------------------------------------------------------------
      // 4/5: PI DECLARATION
      .waitForElementVisible (DOM.label.PIconfirmation)
      .click (DOM.buttons.PIconfirmation)
      .pause (1000)
      // goto submit for review
      .waitForElementVisible (DOM.buttons.gotoSubmitForReview)
      .click (DOM.buttons.gotoSubmitForReview)
      .pause (1000)
      // ---------------------------------------------------------------
      // 5/5: Submit review
      // submit review
      .waitForElementVisible (DOM.buttons.submitReview)
      .click (CONFIGS.e37.submitReview ? DOM.buttons.submitReview : '//table')
      .pause (10000)
      .end ();
  },
  Other_Project: function (browser) {
    browser
      .url (CONFIGS.global.ResearcherPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText ('body', 'Sign in') // we are in the signin page
      .useXpath ()
      .assert.visible (DOM.inputs.username) // the username field is present
      .assert.visible (DOM.inputs.password) // the password field is present
      .setValue (DOM.inputs.username, CREDENTIALS.pi.username)
      .setValue (DOM.inputs.password, CREDENTIALS.pi.password)
      .click (DOM.buttons.signIn)
      // .........................................................................
      // Step 2: Create a new project
      // Page: Researcher Dashboard
      // .........................................................................
      .pause (1000)
      .click ('//*[@id="profile:j_idt516"]')
      .pause (1000)
      // Switch to researcher module
      // .waitForElementVisible (DOM.buttons.researcherModule)
      .click (DOM.buttons.researcherModule)
      .pause (1500)
      // Create a new project
      .waitForElementVisible (DOM.buttons.newProject)
      .click (DOM.buttons.newProject)
      .pause (1000)
      // ---------------------------------------------------------------
      // 1/5: INITIAL QUESTIONS
      // Is this your project, i.e. are you the Principal Investigator (PI) or Student-PI (4th yr., Masters, PhD project))?
      .waitForElementVisible (DOM.buttons.IamPI)
      .click (DOM.buttons.IamPI)
      .pause (1000)
      // Are you a Hôpital Montfort researcher or is any part of your study being conducted under the auspices of the Hôpital Montfort (e.g., recruitment, intervention, access to medical records, data/biological material collection or storage)?
      .waitForElementVisible (DOM.buttons.IamNotHopitalMontfortResearcher)
      // Are you hospital montford researcher ?
      .click (DOM.buttons.IamNotHopitalMontfortResearcher)
      .pause (1000)
      // Has this project received ethics approval from another TCPS 2-compliant REB?
      .waitForElementVisible (
        '//*[@id="Form:initialQuestionFormTable_data"]/tr[2]/td[2]/table/tbody/tr/td[1]/label'
      )
      .click (
        '//*[@id="Form:initialQuestionFormTable_data"]/tr[2]/td[2]/table/tbody/tr/td[1]/label'
      )
      .pause (1000)
      // Save initial question
      .waitForElementVisible (DOM.buttons.saveInitialQuestions)
      .click (DOM.buttons.saveInitialQuestions) // Save
      .pause (2000)
      // ---------------------------------------------------------------
      // 2/5: PROJECT OVERVIEW
      // Project Title
      .waitForElementVisible (DOM.textarea.projectTitle)
      .setValue (DOM.textarea.projectTitle, CONFIGS.e37.projectTitle)
      .pause (1000)
      // Is there a pending deadline by which ethics approval is required?
      .waitForElementVisible (DOM.buttons.noDeadline)
      .click (DOM.buttons.noDeadline)
      .pause (1000)
      // Project Type
      .waitForElementVisible (DOM.buttons.projectType1)
      .click (DOM.buttons.projectType1)
      .pause (1000)
      // Conflicts of Interest Disclosure
      .waitForElementVisible (DOM.buttons.noConflictOfInterest)
      .click (DOM.buttons.noConflictOfInterest)
      .pause (1000)
      // Did you receive funding for this project?
      .waitForElementVisible (DOM.buttons.selectFundingOptions)
      .click (DOM.buttons.selectFundingOptions)
      .pause (1000)
      // No
      .waitForElementVisible (DOM.buttons.noFunding)
      .click (DOM.buttons.noFunding)
      .pause (1000)
      // Next (go to project description)
      .click (DOM.buttons.gotoProjectDescription)
      .pause (1000)
      // ---------------------------------------------------------------
      // 3/5 PROJECT DESCRIPTION
      .pause (1000)
      // Describe the purpose and objectives of the current project. Include the research question(s).
      .waitForElementVisible (DOM.textarea.projectPurpose)
      .setValue (DOM.textarea.projectPurpose, CONFIGS.e37.projectTitle)
      // Describe all methods and procedures that will be used to obtain the data and answer the research question(s).
      .waitForElementVisible (DOM.textarea.projectProcedures)
      .setValue (DOM.textarea.projectProcedures, CONFIGS.e37.projectTitle)
      .pause (1000)
      // Where was the REB approval obtained?
      .waitForElementVisible (DOM.buttons.REBApprovalLocation1)
      .click (DOM.buttons.REBApprovalLocation1)
      .click (DOM.buttons.REBApprovalLocation2)
      // Where will recruitment and data collection occur?
      .waitForElementVisible (DOM.textarea.dataCollectionLocation)
      .setValue (
        DOM.textarea.dataCollectionLocation,
        CONFIGS.e37.dataCollectionLocation
      )
      .pause (1000)
      // Did the primary REB review the project as a full REB file and is it above minimal risk?
      .waitForElementVisible (DOM.buttons.projectBelowMinimalRisk)
      .click (DOM.buttons.projectBelowMinimalRisk)
      .pause (1000)
      // Add attachment
      .waitForElementVisible (DOM.buttons.addAttachments)
      .click (DOM.buttons.addAttachments)
      .pause (1000)
      // wait for the model panel to be visible
      .waitForElementVisible (
        '//div[@id="Form:attachmentList2:attachmentList2_Upload:AttachmentUpload"]'
      )
      // import the attachment
      .setValue (
        '//input[@type="file"]',
        require ('path').resolve (__dirname + '/files/REB_certificate.docx')
      )
      .pause (1000)
      // launch uploading
      .waitForElementVisible (DOM.buttons.upload)
      .click (DOM.buttons.upload)
      // upload is successfull
      .pause (1000)
      .waitForElementVisible (
        '//span[.="Attachment is uploaded successfully."]'
      )
      // close modal
      .waitForElementVisible (DOM.buttons.closeUploadAttachmentModal)
      .click (DOM.buttons.closeUploadAttachmentModal)
      .pause (1000)
      // goto to PI declaration
      .waitForElementVisible (DOM.buttons.gotoPIDeclaration)
      .click (DOM.buttons.gotoPIDeclaration)
      // ---------------------------------------------------------------
      // 4/5: PI DECLARATION
      .waitForElementVisible (DOM.label.PIconfirmation)
      .click (DOM.buttons.PIconfirmation)
      .pause (1000)
      // goto submit for review
      .waitForElementVisible (DOM.buttons.gotoSubmitForReview)
      .click (DOM.buttons.gotoSubmitForReview)
      .pause (1000)
      // ---------------------------------------------------------------
      // 5/5: Submit review
      // submit review
      .waitForElementVisible (DOM.buttons.submitReview)
      .click (CONFIGS.e37.submitReview ? DOM.buttons.submitReview : '//table')
      .pause (10000)
      .end ();
  },
  e51: function (browser) {
    browser
      .url (CONFIGS.global.ResearcherPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText ('body', 'Sign in') // we are in the signin page
      .useXpath ()
      .assert.visible (DOM.inputs.username) // the username field is present
      .assert.visible (DOM.inputs.password) // the password field is present
      .setValue (DOM.inputs.username, CREDENTIALS.admin.username)
      .setValue (DOM.inputs.password, CREDENTIALS.admin.password)
      .click (DOM.buttons.signIn)
      .pause (1000)
      // .........................................................................
      // Step 2:
      // Page: Approval dashboard
      // .........................................................................
      .click ('//*[@id="profile:j_idt46"]')
      .pause (1000)
      .waitForElementVisible (DOM.buttons.projectDashboard)
      .click (DOM.buttons.projectDashboard)
      .pause (1000)
      // .waitForElementVisible (DOM.inputs.researcherFirstname)
      // .setValue (
      //   DOM.inputs.researcherFirstname,
      //   CONFIGS.e51.researcherFirstname
      // )
      // .setValue (DOM.inputs.ethicsFileNumber, CONFIGS.e51.ethicsFileNumber)
      // .setValue (DOM.inputs.researcherLastname, CONFIGS.e51.researcherLastname)
      // .pause (1000)
      // .waitForElementVisible (
      //   '//*[@id="Form:studyStatus:customRadio"]/div[3]/span'
      // )
      .click ('//*[@id="Form:studyStatus:customRadio"]/div[3]/span')
      .click ('//*[@id="Form:studyStatus:customRadio_panel"]/div/ul/li[6]')
      .pause (1000)
      .click (DOM.buttons.search)
      .pause (1000)
      // Actions
      .waitForElementVisible (
        '//*[@id="Form:j_idt69:0:j_idt99_button"]/span[2]'
      )
      .click ('//*[@id="Form:j_idt69:0:j_idt99_button"]/span[2]')
      .pause (1000)
      // Administration actions
      .waitForElementVisible ('//*[@id="Form:j_idt69:0:j_idt100"]/span')
      .click ('//*[@id="Form:j_idt69:0:j_idt100"]/span')
      .pause (1000)
      // Administration actions arrow-down
      .waitForElementVisible (
        '//*[@id="Form:actionMenu:customRadio"]/div[3]/span'
      )
      .click ('//*[@id="Form:actionMenu:customRadio"]/div[3]/span')
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="Form:actionMenu:customRadio_panel"]/div/ul/li[2]'
      )
      // put project onHold
      .click ('//*[@id="Form:actionMenu:customRadio_panel"]/div/ul/li[2]')
      .pause (1000)
      // Set a comment to explain the reason why project stutus changed
      // .waitForElementVisible ('//*[@id="Form:j_idt72:j_idt80"]/div/iframe')
      // .setValue (
      //   //*[@id="Form:j_idt72:j_idt80"]/div
      //   '//*[@id="Form:j_idt72:j_idt80"]/div/iframe',
      //   'dddd'
      //   // DOM.textarea.onHoldComments
      // )
      // submit
      // Value will be set manually
      .pause (5000)
      .click ('//*[@id="Form:Transmit1"]/span')
      .pause (1000)
      // // Confirm submission
      .acceptAlert ()
      .pause (10000)
      .end ();
  },
  e52: function (browser) {
    browser
      .url (CONFIGS.global.ResearcherPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText ('body', 'Sign in') // we are in the signin page
      .useXpath ()
      .assert.visible (DOM.inputs.username) // the username field is present
      .assert.visible (DOM.inputs.password) // the password field is present
      .setValue (DOM.inputs.username, CREDENTIALS.admin.username)
      .setValue (DOM.inputs.password, CREDENTIALS.admin.password)
      .click (DOM.buttons.signIn)
      .pause (1000)
      // .........................................................................
      // Step 2:
      // Page: Approval dashboard
      // .........................................................................
      .waitForElementVisible (DOM.buttons.projectDashboard)
      .click (DOM.buttons.projectDashboard)
      .pause (1000)
      // .waitForElementVisible (DOM.inputs.researcherFirstname)
      // .setValue (
      //   DOM.inputs.researcherFirstname,
      //   CONFIGS.e51.researcherFirstname
      // )
      // .setValue (DOM.inputs.researcherLastname, CONFIGS.e51.researcherLastname)
      // .pause (1000)
      // .waitForElementVisible (
      //   '//*[@id="Form:studyStatus:customRadio"]/div[3]/span'
      // )
      .click ('//*[@id="Form:studyStatus:customRadio"]/div[3]/span')
      // ----- CLICK ON "ON HOLD"
      .click ('//*[@id="Form:studyStatus:customRadio_panel"]/div/ul/li[3]')
      .pause (1000)
      .click (DOM.buttons.search)
      .pause (1000)
      // Actions
      .waitForElementVisible (
        '//*[@id="Form:j_idt69:0:j_idt99_button"]/span[2]'
      )
      .click ('//*[@id="Form:j_idt69:0:j_idt99_button"]/span[2]')
      .pause (1000)
      // Administration actions
      .waitForElementVisible ('//*[@id="Form:j_idt69:0:j_idt100"]/span')
      .click ('//*[@id="Form:j_idt69:0:j_idt100"]/span')
      .pause (1000)
      // Administration actions --> arrow-down (select project status: on hold ? closed ...)
      .waitForElementVisible ('//*[@id="Form:actionMenu:customRadio_label"]')
      .click ('//*[@id="Form:actionMenu:customRadio_label"]')
      // ----- CLICK ON "Remove Project HOLD"
      .waitForElementVisible (
        '//*[@id="Form:actionMenu:customRadio_panel"]/div/ul/li[2]'
      )
      .click ('//*[@id="Form:actionMenu:customRadio_panel"]/div/ul/li[2]')
      .pause (1000)
      // ----- CLICK ON "Select Status arrow-down"
      .waitForElementVisible ('//*[@id="Form:j_idt69_label"]')
      .click ('//*[@id="Form:j_idt69_label"]')
      // ----- CLIK ON "Select Approved"
      .waitForElementVisible ('//*[@id="Form:j_idt69_panel"]/div/ul/li[2]')
      .click ('//*[@id="Form:j_idt69_panel"]/div/ul/li[2]')
      .pause (1000)
      // Set a comment to explain the reason why project stutus changed
      .setValue (
        '//*[@id="Form:j_idt72:j_idt80"]/div/iframe',
        DOM.textarea.removeOnHoldComments
      )
      // submit
      .click ('//*[@id="Form:Transmit1"]/span')
      .pause (1000)
      // Confirm submission
      .acceptAlert ()
      .pause (10000)
      .end ();
  },
  e53: function (browser) {
    browser
      .url (CONFIGS.global.ResearcherPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText ('body', 'Sign in') // we are in the signin page
      .useXpath ()
      .assert.visible (DOM.inputs.username) // the username field is present
      .assert.visible (DOM.inputs.password) // the password field is present
      .setValue (DOM.inputs.username, CREDENTIALS.admin.username)
      .setValue (DOM.inputs.password, CREDENTIALS.admin.password)
      .click (DOM.buttons.signIn)
      .pause (1000)
      // .........................................................................
      // Step 2:
      // Page: Approval dashboard
      // .........................................................................
      .waitForElementVisible (DOM.buttons.projectDashboard)
      .click (DOM.buttons.projectDashboard)
      .pause (1000)
      // .waitForElementVisible (DOM.inputs.researcherFirstname)
      // .setValue (
      //   DOM.inputs.researcherFirstname,
      //   CONFIGS.e51.researcherFirstname
      // )
      // .setValue (DOM.inputs.ethicsFileNumber, CONFIGS.e51.ethicsFileNumber)
      // .setValue (DOM.inputs.researcherLastname, CONFIGS.e51.researcherLastname)
      // .pause (1000)
      // .waitForElementVisible (
      //   '//*[@id="Form:studyStatus:customRadio"]/div[3]/span'
      // )
      .click ('//*[@id="Form:studyStatus:customRadio"]/div[3]/span')
      .click ('//*[@id="Form:studyStatus:customRadio_panel"]/div/ul/li[6]')
      .pause (1000)
      .click (DOM.buttons.search)
      .pause (1000)
      // Actions
      .waitForElementVisible (
        '//*[@id="Form:j_idt69:0:j_idt99_button"]/span[2]'
      )
      .click ('//*[@id="Form:j_idt69:0:j_idt99_button"]/span[2]')
      .pause (1000)
      // Administration actions
      .waitForElementVisible ('//*[@id="Form:j_idt69:0:j_idt100"]/span')
      .click ('//*[@id="Form:j_idt69:0:j_idt100"]/span')
      .pause (1000)
      // Administration actions arrow-down
      .waitForElementVisible (
        '//*[@id="Form:actionMenu:customRadio"]/div[3]/span'
      )
      .click ('//*[@id="Form:actionMenu:customRadio"]/div[3]/span')
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="Form:actionMenu:customRadio_panel"]/div/ul/li[2]'
      )
      // --- CLICK on "Close project"
      .click ('//*[@id="Form:actionMenu:customRadio_panel"]/div/ul/li[3]')
      .pause (1000)
      // Do it manually
      .pause (5000)
      // Set a comment to explain the reason why project stutus changed
      // .setValue (
      //   '//*[@id="Form:j_idt72:j_idt80"]/div/iframe',
      //   DOM.textarea.onClosedComments
      // )
      // submit
      .click ('//*[@id="Form:Transmit1"]/span')
      .pause (1000)
      // Confirm submission
      .acceptAlert ()
      .pause (10000)
      .end ();
  },
  e54: function (browser) {
    browser
      .url (CONFIGS.global.ResearcherPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText ('body', 'Sign in') // we are in the signin page
      .useXpath ()
      .assert.visible (DOM.inputs.username) // the username field is present
      .assert.visible (DOM.inputs.password) // the password field is present
      .setValue (DOM.inputs.username, CREDENTIALS.admin.username)
      .setValue (DOM.inputs.password, CREDENTIALS.admin.password)
      .click (DOM.buttons.signIn)
      .pause (1000)
      // .........................................................................
      // Step 2:
      // Page: Approval dashboard
      // .........................................................................
      .waitForElementVisible (DOM.buttons.projectDashboard)
      .click (DOM.buttons.projectDashboard)
      .pause (1000)
      // .waitForElementVisible (DOM.inputs.researcherFirstname)
      // .setValue (
      //   DOM.inputs.researcherFirstname,
      //   CONFIGS.e51.researcherFirstname
      // )
      // .setValue (DOM.inputs.ethicsFileNumber, CONFIGS.e51.ethicsFileNumber)
      // .setValue (DOM.inputs.researcherLastname, CONFIGS.e51.researcherLastname)
      // .pause (1000)
      .waitForElementVisible (
        '//*[@id="Form:studyStatus:customRadio"]/div[3]/span'
      )
      .click ('//*[@id="Form:studyStatus:customRadio"]/div[3]/span')
      // --- CLICK on "CLOSED"
      .click ('//*[@id="Form:studyStatus:customRadio_panel"]/div/ul/li[4]')
      .pause (1000)
      .click (DOM.buttons.search)
      .pause (1000)
      // Actions
      .waitForElementVisible (
        '//*[@id="Form:j_idt69:0:j_idt99_button"]/span[2]'
      )
      .click ('//*[@id="Form:j_idt69:0:j_idt99_button"]/span[2]')
      .pause (1000)
      // Administration actions
      .waitForElementVisible ('//*[@id="Form:j_idt69:0:j_idt100"]/span')
      .click ('//*[@id="Form:j_idt69:0:j_idt100"]/span')
      .pause (1000)
      // Administration actions arrow-down
      .waitForElementVisible (
        '//*[@id="Form:actionMenu:customRadio"]/div[3]/span'
      )
      .click ('//*[@id="Form:actionMenu:customRadio"]/div[3]/span')
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="Form:actionMenu:customRadio_panel"]/div/ul/li[2]'
      )
      // --- CLICK on "Reopen project"
      .click ('//*[@id="Form:actionMenu:customRadio_panel"]/div/ul/li[3]')
      .pause (1000)
      // ----- CLICK ON "Select Status arrow-down"
      .waitForElementVisible ('//*[@id="Form:j_idt69_label"]')
      .click ('//*[@id="Form:j_idt69_label"]')
      // ----- CLIK ON "Select Approved"
      .waitForElementVisible ('//*[@id="Form:j_idt69_panel"]/div/ul/li[2]')
      .click ('//*[@id="Form:j_idt69_panel"]/div/ul/li[2]')
      .pause (1000)
      // Set a comment to explain the reason why project stutus changed
      .setValue (
        '//*[@id="Form:j_idt72:j_idt80"]/div/iframe',
        DOM.textarea.onReopenComments
      )
      // submit
      .click ('//*[@id="Form:Transmit1"]/span')
      .pause (1000)
      // Confirm submission
      .acceptAlert ()
      .pause (10000)
      .end ();
  },
  e38: function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.ec.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.ec.password)
      .click ('//*[@id="j_idt102"]')
      // .........................................................................
      // Step 2: Create a new project
      // Page: Researcher Dashboard
      // .........................................................................
      // ---1--- Select the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialList:initialTaskStudy:0:j_idt95"]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialList:initialTaskStudy:0:j_idt95"]'
      )
      .pause (1000)
      // ---2--- Is the request form complete ? => NO
      .click (
        '//*[@id="uOttawaTask1Form:isApplicationComplete"]/tbody/tr/td[4]/label'
      )
      // ---3--- Resubmission Deadline
      .waitForElementVisible (
        '//*[@id="uOttawaTask1Form:deadlineSubmitComment_input"]'
      )
      .setValue (
        '//*[@id="uOttawaTask1Form:deadlineSubmitComment_input"]',
        '30-11-2017'
      )
      .pause (1000)
      // ---4--- Comments for Researcher
      .setValue ('//*[@id="cke_1_contents"]/iframe', CONFIGS.e310.comments)
      .pause (1000)
      // ---5--- Submit
      .click ('//*[@id="uOttawaTask1Form:completeTask"]')
      .pause (1000)
      // ---6--- Confirm Submit
      .click ('//*[@id="FormTemplate:j_idt49"]')
      .pause (10000)
      .end ();
  },
  e39_FB: function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.ec.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.ec.password)
      .click ('//*[@id="j_idt75"]')
      // .........................................................................
      // Step 2: Create a new project
      // Page: Researcher Dashboard
      // .........................................................................

      // ---1--- Select the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialList:initialTaskStudy:1:j_idt95"]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialList:initialTaskStudy:1:j_idt95"]'
      )
      .pause (1000)
      // ---2--- Is the request form complete ? => YES
      .click (
        '//*[@id="uOttawaTask1Form:isApplicationComplete"]/tbody/tr/td[2]/label'
      )
      .pause (1000)
      // ---3--- Review Level
      .click ('//*[@id="uOttawaTask1Form:typeEvaluationRequired_label"]')
      .pause (1000)
      // ---4--- Select FB
      .click (
        '//*[@id="uOttawaTask1Form:typeEvaluationRequired_panel"]/div/ul/li[2]'
      )
      .pause (1000)
      // ---5--- Select Social
      .click ('//*[@id="uOttawaTask1Form:rebReviewFile"]/tbody/tr/td[2]/label')
      .pause (1000)
      // ---6--- REB Chair ... Select chair
      .click ('//*[@id="uOttawaTask1Form:chairMember_label"]')
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="uOttawaTask1Form:chairMember_panel"]/div/ul/li[12]'
      )
      .click (
        `//*[@id="uOttawaTask1Form:chairMember_panel"]/div/ul/li[@data-label="${TESTS_CONFIG.e39.REBChair}"]`
      )
      .pause (1000)
      // ---6.1--- REB Member ... Select non primary member
      .click (
        `//*[@id="uOttawaTask1Form:sshUsersDualList"]/div[1]/ul/li[@data-item-label="${TESTS_CONFIG.e39.REBNonPrimaryMember}"]`
      )
      .pause (1000)
      .click (
        '//*[@id="uOttawaTask1Form:sshUsersDualList"]/div[2]/div/button[1]/span[1]'
      )
      // ---6.2--- REB Member ... Select primary member
      .pause (1000)
      .click (
        `//*[@id="uOttawaTask1Form:hssUsersDualList"]/div[1]/ul/li[@data-item-label="${TESTS_CONFIG.e39.REBPrimaryMember}"]`
      )
      .click (
        '//*[@id="uOttawaTask1Form:hssUsersDualList"]/div[2]/div/button[1]/span[1]'
      )
      .pause (1000)
      // ---8--- REB Member Evaluation Deadline
      .setValue (
        '//*[@id="uOttawaTask1Form:rebMemberEvalDeadline_input"]',
        TESTS_CONFIG.e39.resubmissionDeadline
      )
      .pause (1000)
      // ---9--- Ethics Staff Assigned
      .click ('//*[@id="uOttawaTask1Form:ethicsStaff_label"]')
      .pause (1000)
      // ---10--- Select ethic staff
      .click (
        `//*[@id="uOttawaTask1Form:ethicsStaff_panel"]/div/ul/li[@data-label="${TESTS_CONFIG.e39.EthicStaffAssigned}"]`
      )
      .pause (1000)
      // ---11--- Comments to reviewers
      .setValue ('//*[@id="cke_1_contents"]/iframe', TESTS_CONFIG.e39.comments)
      // ---12---- Submit
      .click ('//*[@id="uOttawaTask1Form:completeTask"]')
      .pause (1000)
      // ---12---- Confirm submission
      .click ('//*[@id="FormTemplate:j_idt49"]/span[2]')
      .pause (15000)
      .end ();
  },
  e39_EXP: function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.ec.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.ec.password)
      .click ('//*[@id="j_idt75"]')
      // .........................................................................
      // Step 2: Create a new project
      // Page: Researcher Dashboard
      // .........................................................................

      // ---1--- Select the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialList:initialTaskStudy:1:j_idt95"]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialList:initialTaskStudy:1:j_idt95"]'
      )
      .pause (1000)
      // ---2--- Is the request form complete ? => YES
      .click (
        '//*[@id="uOttawaTask1Form:isApplicationComplete"]/tbody/tr/td[2]/label'
      )
      .pause (1000)
      // ---3--- Review Level
      .click ('//*[@id="uOttawaTask1Form:typeEvaluationRequired_label"]')
      .pause (1000)
      // ---4--- Select EXP
      .click (
        '//*[@id="uOttawaTask1Form:typeEvaluationRequired_panel"]/div/ul/li[4]'
      )
      .pause (1000)
      // ---5--- Select Social
      .click ('//*[@id="uOttawaTask1Form:rebReviewFile"]/tbody/tr/td[2]/label')
      .pause (1000)
      // ---6--- REB Chair ... Select chair
      .click ('//*[@id="uOttawaTask1Form:chairMember_label"]')
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="uOttawaTask1Form:chairMember_panel"]/div/ul/li[12]'
      )
      .click (
        `//*[@id="uOttawaTask1Form:chairMember_panel"]/div/ul/li[@data-label="${TESTS_CONFIG.e39.REBChair}"]`
      )
      .pause (1000)
      // ---6.1--- REB Member ... Select non primary member
      .click (
        `//*[@id="uOttawaTask1Form:sshUsersDualList"]/div[1]/ul/li[@data-item-label="${TESTS_CONFIG.e39.REBNonPrimaryMember}"]`
      )
      .pause (1000)
      .click (
        '//*[@id="uOttawaTask1Form:sshUsersDualList"]/div[2]/div/button[1]/span[1]'
      )
      // ---6.2--- REB Member ... Select primary member
      .pause (1000)
      .click (
        `//*[@id="uOttawaTask1Form:hssUsersDualList"]/div[1]/ul/li[@data-item-label="${TESTS_CONFIG.e39.REBPrimaryMember}"]`
      )
      .click (
        '//*[@id="uOttawaTask1Form:hssUsersDualList"]/div[2]/div/button[1]/span[1]'
      )
      .pause (1000)
      // ---8--- REB Member Evaluation Deadline
      .setValue (
        '//*[@id="uOttawaTask1Form:rebMemberEvalDeadline_input"]',
        TESTS_CONFIG.e39.resubmissionDeadline
      )
      .pause (1000)
      // ---9--- Ethics Staff Assigned
      .click ('//*[@id="uOttawaTask1Form:ethicsStaff_label"]')
      .pause (1000)
      // ---10--- Select ethic staff
      .click (
        `//*[@id="uOttawaTask1Form:ethicsStaff_panel"]/div/ul/li[@data-label="${TESTS_CONFIG.e39.EthicStaffAssigned}"]`
      )
      .pause (1000)
      // ---11--- Comments to reviewers
      .setValue ('//*[@id="cke_1_contents"]/iframe', TESTS_CONFIG.e39.comments)
      // ---12---- Submit
      .click ('//*[@id="uOttawaTask1Form:completeTask"]')
      .pause (1000)
      // ---12---- Confirm submission
      .click ('//*[@id="FormTemplate:j_idt49"]/span[2]')
      .pause (15000)
      .end ();
  },
  e311_APPROVED: function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Select the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .pause (1000)
      // ---I--- SEND PRE EVALUATION TO CHAIR BOARD
      .click (
        '//*[@id="uOttawaTask2bForm:isApplicationComplete"]/tbody/tr/td[2]/label'
      )
      .pause (1000)
      // ---==>1. Decision for Review: Select Refused
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]')
      .pause (1000)
      // Select Approve
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[2]'
      )
      .click (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[2]'
      )
      .pause (1000)
      // ---==>2. Comments to chair
      .setValue (
        '//*[@id="cke_39_contents"]/iframe',
        `Automated by ${CREDENTIALS.user}`
      )
      .pause (1000)
      // ---==>3. Submit
      .click ('//*[@id="uOttawaTask2bForm:completeTask"]')
      .pause (1000)
      // ---==>4. Confirm submission
      .click ('//*[@id="uOttawaTask2bForm:j_idt1055"]')
      .pause (10000)
      .end ();
  },
  'e311_APPROVED-PARTIAL': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Select the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .pause (1000)
      // ---I--- SEND PRE EVALUATION TO CHAIR BOARD
      .click (
        '//*[@id="uOttawaTask2bForm:isApplicationComplete"]/tbody/tr/td[2]/label'
      )
      .pause (1000)
      // ---==>1. Decision for Review: Select Refused
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]')
      .pause (1000)
      // Select Approve
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[3]'
      )
      .click (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[3]'
      )
      .pause (1000)
      // ---==>2. Comments to chair
      .setValue (
        '//*[@id="cke_39_contents"]/iframe',
        `Automated by ${CREDENTIALS.user}`
      )
      .pause (1000)
      // ---==>3. Submit
      .click ('//*[@id="uOttawaTask2bForm:completeTask"]')
      .pause (1000)
      // ---==>4. Confirm submission
      .click ('//*[@id="uOttawaTask2bForm:j_idt1055"]')
      .pause (10000)
      .end ();
  },
  'e311_REVISION-REQUIRED': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Select the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .pause (1000)
      // ---I--- SEND PRE EVALUATION TO CHAIR BOARD
      .click (
        '//*[@id="uOttawaTask2bForm:isApplicationComplete"]/tbody/tr/td[2]/label'
      )
      .pause (1000)
      // ---==>1. Decision for Review: Select Refused
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]')
      .pause (1000)
      // Select Approve
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[4]'
      )
      .click (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[4]'
      )
      .pause (1000)
      // ---==>2. Comments to chair
      .setValue (
        '//*[@id="cke_39_contents"]/iframe',
        `Automated by ${CREDENTIALS.user}`
      )
      .pause (1000)
      // ---==>3. Submit
      .click ('//*[@id="uOttawaTask2bForm:completeTask"]')
      .pause (1000)
      // ---==>4. Confirm submission
      .click ('//*[@id="uOttawaTask2bForm:j_idt1055"]')
      .pause (10000)
      .end ();
  },
  'e311_ADD-PERMISSIONS-REQUIRED': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Select the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .pause (1000)
      // ---I--- SEND PRE EVALUATION TO CHAIR BOARD
      .click (
        '//*[@id="uOttawaTask2bForm:isApplicationComplete"]/tbody/tr/td[2]/label'
      )
      .pause (1000)
      // ---==>1. Decision for Review: Select Refused
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]')
      .pause (1000)
      // Select Approve
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[5]'
      )
      .click (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[5]'
      )
      .pause (1000)
      // ---==>2. Comments to chair
      .setValue (
        '//*[@id="cke_39_contents"]/iframe',
        `Automated by ${CREDENTIALS.user}`
      )
      .pause (1000)
      // ---==>3. Submit
      .click ('//*[@id="uOttawaTask2bForm:completeTask"]')
      .pause (1000)
      // ---==>4. Confirm submission
      .click ('//*[@id="uOttawaTask2bForm:j_idt1055"]')
      .pause (10000)
      .end ();
  },
  e311_RESUBMIT: function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Select the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .pause (1000)
      // ---I--- SEND PRE EVALUATION TO CHAIR BOARD
      .click (
        '//*[@id="uOttawaTask2bForm:isApplicationComplete"]/tbody/tr/td[2]/label'
      )
      .pause (1000)
      // ---==>1. Decision for Review: Select Refused
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]')
      .pause (1000)
      // Select Approve
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[6]'
      )
      .click (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[6]'
      )
      .pause (1000)
      // ---==>2. Comments to chair
      .setValue (
        '//*[@id="cke_39_contents"]/iframe',
        `Automated by ${CREDENTIALS.user}`
      )
      .pause (1000)
      // ---==>3. Submit
      .click ('//*[@id="uOttawaTask2bForm:completeTask"]')
      .pause (1000)
      // ---==>4. Confirm submission
      .click ('//*[@id="uOttawaTask2bForm:j_idt1055"]')
      .pause (10000)
      .end ();
  },
  e311_REFUSED: function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Select the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialReviewDraftFeedbackList:initialReviewDraftFeedbackStudy:0:j_idt476"]'
      )
      .pause (1000)
      // ---I--- SEND PRE EVALUATION TO CHAIR BOARD
      .click (
        '//*[@id="uOttawaTask2bForm:isApplicationComplete"]/tbody/tr/td[2]/label'
      )
      .pause (1000)
      // ---==>1. Decision for Review: Select Refused
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask2bForm:recommendedDecision2_label"]')
      .pause (1000)
      // Select Approve
      .waitForElementVisible (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[7]'
      )
      .click (
        '//*[@id="uOttawaTask2bForm:recommendedDecision2_panel"]/div/ul/li[7]'
      )
      .pause (1000)
      // ---==>2. Comments to chair
      .setValue (
        '//*[@id="cke_39_contents"]/iframe',
        `Automated by ${CREDENTIALS.user}`
      )
      .pause (1000)
      // ---==>3. Submit
      .click ('//*[@id="uOttawaTask2bForm:completeTask"]')
      .pause (1000)
      // ---==>4. Confirm submission
      .click ('//*[@id="uOttawaTask2bForm:j_idt1055"]')
      .pause (10000)
      .end ();
  },
  'e3XX_Chair-APPROVED': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.chair.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.chair.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Click on <TODO>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      // ---2--- Click in the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      // ---3--CHAIR-> Desision for Review: Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask3Form:recommendedDecision2_label"]')
      // ---4--CHAIR-> Desision for Review: APPROVED
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[2]'
      )
      .click (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[2]'
      )
      .pause (1000)
      // ---5--CHAIR-> Communicate Decision
      .click (
        '//*[@id="uOttawaTask3Form:feedbackContent"]/tbody/tr[1]/td[2]/label'
      )
      .pause (1000)
      // ---6--CHAIR-> Submit
      .click ('//*[@id="uOttawaTask3Form:completeTask"]')
      .pause (1000)
      .waitForElementVisible ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .click ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .pause (10000)
      .end ();
  },
  'e3XX_Chair-APPROVED-PARTIAL': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.chair.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.chair.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Click on <TODO>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      // ---2--- Click in the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      // ---3--CHAIR-> Desision for Review: Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask3Form:recommendedDecision2_label"]')
      // ---4--CHAIR-> Desision for Review: APPROVED-PARTIAL
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[3]'
      )
      .click (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[3]'
      )
      .pause (1000)
      // ---5--CHAIR-> Communicate Decision
      .click (
        '//*[@id="uOttawaTask3Form:feedbackContent"]/tbody/tr[1]/td[2]/label'
      )
      .pause (1000)
      // ---6--CHAIR-> Submit
      .click ('//*[@id="uOttawaTask3Form:completeTask"]')
      .pause (1000)
      .waitForElementVisible ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .click ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .pause (10000)
      .end ();
  },
  'e3XX_Chair-REVISION-REQUIRED': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.chair.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.chair.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Click on <TODO>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      // ---2--- Click in the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      // ---3--CHAIR-> Desision for Review: Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask3Form:recommendedDecision2_label"]')
      // ---4--CHAIR-> Desision for Review: REVISION-REQUIRED
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[4]'
      )
      .click (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[4]'
      )
      .pause (1000)
      // ---5--CHAIR-> Communicate Decision
      .click (
        '//*[@id="uOttawaTask3Form:feedbackContent"]/tbody/tr[1]/td[2]/label'
      )
      .pause (1000)
      // ---6--CHAIR-> Submit
      .click ('//*[@id="uOttawaTask3Form:completeTask"]')
      .pause (1000)
      .waitForElementVisible ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .click ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .pause (10000)
      .end ();
  },
  'e3XX_Chair-ADD-PERMISSIONS-REQUIRED': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.chair.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.chair.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Click on <TODO>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      // ---2--- Click in the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      // ---3--CHAIR-> Desision for Review: Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask3Form:recommendedDecision2_label"]')
      // ---4--CHAIR-> Desision for Review: ADD-PERMISSIONS-REQUIRED
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[5]'
      )
      .click (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[5]'
      )
      .pause (1000)
      // ---5--CHAIR-> Communicate Decision
      .click (
        '//*[@id="uOttawaTask3Form:feedbackContent"]/tbody/tr[1]/td[2]/label'
      )
      .pause (1000)
      // ---6--CHAIR-> Submit
      .click ('//*[@id="uOttawaTask3Form:completeTask"]')
      .pause (1000)
      .waitForElementVisible ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .click ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .pause (10000)
      .end ();
  },
  'e3XX_Chair-RESUBMIT': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.chair.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.chair.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Click on <TODO>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      // ---2--- Click in the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      // ---3--CHAIR-> Desision for Review: Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask3Form:recommendedDecision2_label"]')
      // ---4--CHAIR-> Desision for Review: RESUBMIT
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[6]'
      )
      .click (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[6]'
      )
      .pause (1000)
      // ---5--CHAIR-> Communicate Decision
      .click (
        '//*[@id="uOttawaTask3Form:feedbackContent"]/tbody/tr[1]/td[2]/label'
      )
      .pause (1000)
      // ---6--CHAIR-> Submit
      .click ('//*[@id="uOttawaTask3Form:completeTask"]')
      .pause (1000)
      .waitForElementVisible ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .click ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .pause (10000)
      .end ();
  },
  'e3XX_Chair-REFUSED': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.chair.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.chair.password)
      .click ('//*[@id="j_idt75"]')
      // ---1--- Click on <TODO>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[4]')
      // ---2--- Click in the first element
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:viewInitialDraftFeedRevFullMinReviewList:viewInitialDraftFeedRevFullMinReviewStudy_data"]/tr[1]/td[4]'
      )
      // ---3--CHAIR-> Desision for Review: Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_label"]'
      )
      .click ('//*[@id="uOttawaTask3Form:recommendedDecision2_label"]')
      // ---4--CHAIR-> Desision for Review: REFUSED
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[7]'
      )
      .click (
        '//*[@id="uOttawaTask3Form:recommendedDecision2_panel"]/div/ul/li[7]'
      )
      .pause (1000)
      // ---5--CHAIR-> Communicate Decision
      .click (
        '//*[@id="uOttawaTask3Form:feedbackContent"]/tbody/tr[1]/td[2]/label'
      )
      .pause (1000)
      // ---6--CHAIR-> Submit
      .click ('//*[@id="uOttawaTask3Form:completeTask"]')
      .pause (1000)
      .waitForElementVisible ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .click ('//*[@id="uOttawaTask3Form:j_idt976"]')
      .pause (10000)
      .end ();
  },
  'FROM_CHAIR_PO-APPROVED': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---7--PO-> Click on <TO REVIEWS>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      // ---8--PO-> click first chair review
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .pause (1000)
      // ---9--PO-> Does this request need chair review ? Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask4Form:furtherComment_label"]'
      )
      .click ('//*[@id="uOttawaTask4Form:furtherComment_label"]')
      .pause (1000)
      // ---10--PO-> Does this request need chair review ? : NO
      .click ('//*[@id="uOttawaTask4Form:furtherComment_panel"]/div/ul/li[3]')
      .pause (1000)
      // ---11--PO-> Decision: Select Label
      .click ('//*[@id="uOttawaTask4Form:rebDecision_label"]')
      .pause (1000)
      // ---11--PO-> Decision: APPROVED
      .click ('//*[@id="uOttawaTask4Form:rebDecision_panel"]/div/ul/li[2]')
      .pause (1000)
      //---12--PO-> Submit
      .click ('//*[@id="uOttawaTask4Form:completeTask"]')
      .pause (1000)
      //---13--PO-> Confirm
      .click ('//*[@id="uOttawaTask4Form:j_idt1015"]')
      .pause (10000)
      .end ();
  },
  'FROM_CHAIR_PO-APPROVED-PARTIAL': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---7--PO-> Click on <TO REVIEWS>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      // ---8--PO-> click first chair review
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .pause (1000)
      // ---9--PO-> Does this request need chair review ? Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask4Form:furtherComment_label"]'
      )
      .click ('//*[@id="uOttawaTask4Form:furtherComment_label"]')
      .pause (1000)
      // ---10--PO-> Does this request need chair review ? : NO
      .click ('//*[@id="uOttawaTask4Form:furtherComment_panel"]/div/ul/li[3]')
      .pause (1000)
      // ---11--PO-> Decision: Select Label
      .click ('//*[@id="uOttawaTask4Form:rebDecision_label"]')
      .pause (1000)
      // ---11--PO-> Decision: APPROVED-PARTIAL
      .click ('//*[@id="uOttawaTask4Form:rebDecision_panel"]/div/ul/li[3]')
      .pause (1000)
      //---12--PO-> Submit
      .click ('//*[@id="uOttawaTask4Form:completeTask"]')
      .pause (1000)
      //---13--PO-> Confirm

      .click ('//*[@id="uOttawaTask4Form:j_idt1015"]')
      .pause (10000)
      .end ();
  },
  'FROM_CHAIR_PO-REVISION-REQUIRED': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---7--PO-> Click on <TO REVIEWS>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      // ---8--PO-> click first chair review
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .pause (1000)
      // ---9--PO-> Does this request need chair review ? Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask4Form:furtherComment_label"]'
      )
      .click ('//*[@id="uOttawaTask4Form:furtherComment_label"]')
      .pause (1000)
      // ---10--PO-> Does this request need chair review ? : NO
      .click ('//*[@id="uOttawaTask4Form:furtherComment_panel"]/div/ul/li[3]')
      .pause (1000)
      // ---11--PO-> Decision: Select Label
      .click ('//*[@id="uOttawaTask4Form:rebDecision_label"]')
      .pause (1000)
      // ---11--PO-> Decision: REVISION-REQUIRED
      .click ('//*[@id="uOttawaTask4Form:rebDecision_panel"]/div/ul/li[4]')
      .pause (1000)
      //---12--PO-> Submit
      .click ('//*[@id="uOttawaTask4Form:completeTask"]')
      .pause (1000)
      //---13--PO-> Confirm
      .click ('//*[@id="uOttawaTask4Form:j_idt1015"]')
      .pause (10000)
      .end ();
  },
  'FROM_CHAIR_PO-ADD-PERMISSIONS-REQUIRED': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---7--PO-> Click on <TO REVIEWS>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      // ---8--PO-> click first chair review
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .pause (1000)
      // ---9--PO-> Does this request need chair review ? Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask4Form:furtherComment_label"]'
      )
      .click ('//*[@id="uOttawaTask4Form:furtherComment_label"]')
      .pause (1000)
      // ---10--PO-> Does this request need chair review ? : NO
      .click ('//*[@id="uOttawaTask4Form:furtherComment_panel"]/div/ul/li[3]')
      .pause (1000)
      // ---11--PO-> Decision: Select Label
      .click ('//*[@id="uOttawaTask4Form:rebDecision_label"]')
      .pause (1000)
      // ---11--PO-> Decision: ADD-PERMISSIONS-REQUIRED
      .click ('//*[@id="uOttawaTask4Form:rebDecision_panel"]/div/ul/li[5]')
      .pause (1000)
      //---12--PO-> Submit
      .click ('//*[@id="uOttawaTask4Form:completeTask"]')
      .pause (1000)
      //---13--PO-> Confirm
      .click ('//*[@id="uOttawaTask4Form:j_idt1015"]')
      .pause (10000)
      .end ();
  },
  'FROM_CHAIR_PO-RESUBMIT': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---7--PO-> Click on <TO REVIEWS>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      // ---8--PO-> click first chair review
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .pause (1000)
      // ---9--PO-> Does this request need chair review ? Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask4Form:furtherComment_label"]'
      )
      .click ('//*[@id="uOttawaTask4Form:furtherComment_label"]')
      .pause (1000)
      // ---10--PO-> Does this request need chair review ? : NO
      .click ('//*[@id="uOttawaTask4Form:furtherComment_panel"]/div/ul/li[3]')
      .pause (1000)
      // ---11--PO-> Decision: Select Label
      .click ('//*[@id="uOttawaTask4Form:rebDecision_label"]')
      .pause (1000)
      // ---11--PO-> Decision: RESUBMIT
      .click ('//*[@id="uOttawaTask4Form:rebDecision_panel"]/div/ul/li[6]')
      .pause (1000)
      //---12--PO-> Submit
      .click ('//*[@id="uOttawaTask4Form:completeTask"]')
      .pause (1000)
      //---13--PO-> Confirm
      .click ('//*[@id="uOttawaTask4Form:j_idt1015"]')
      .pause (10000)
      .end ();
  },
  'FROM_CHAIR_PO-REFUSED': function (browser) {
    browser
      .url (CONFIGS.global.ReviewerPortal) // go to researcher login portal
      .waitForElementVisible ('body'); // wait for the body to be rendered

    // once in the researcher portal
    browser.assert
      // .........................................................................
      // Step 1: LOGIN
      // Page: SignIn page
      // .........................................................................
      .containsText (
        'body',
        'Welcome to the eReviews online submission system.'
      ) // we are in the signin page
      .useXpath ()
      .setValue ('//*[@id="username"]', CREDENTIALS.po.username)
      .setValue ('//*[@id="password"]', CREDENTIALS.po.password)
      .click ('//*[@id="j_idt75"]')
      // ---7--PO-> Click on <TO REVIEWS>
      .waitForElementVisible ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      .click ('//*[@id="dashboardForm:initial"]/ul/li[1]')
      // ---8--PO-> click first chair review
      .pause (1000)
      .waitForElementVisible (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .click (
        '//*[@id="dashboardForm:initial:initialTasksReviewChairCommentsList:initialTasksReviewChairCommentsStudy_data"]/tr/td[4]'
      )
      .pause (1000)
      // ---9--PO-> Does this request need chair review ? Select label
      .waitForElementVisible (
        '//*[@id="uOttawaTask4Form:furtherComment_label"]'
      )
      .click ('//*[@id="uOttawaTask4Form:furtherComment_label"]')
      .pause (1000)
      // ---10--PO-> Does this request need chair review ? : NO
      .click ('//*[@id="uOttawaTask4Form:furtherComment_panel"]/div/ul/li[3]')
      .pause (1000)
      // ---11--PO-> Decision: Select Label
      .click ('//*[@id="uOttawaTask4Form:rebDecision_label"]')
      .pause (1000)
      // ---11--PO-> Decision: REFUSED
      .click ('//*[@id="uOttawaTask4Form:rebDecision_panel"]/div/ul/li[7]')
      .pause (1000)
      //---12--PO-> Submit
      .click ('//*[@id="uOttawaTask4Form:completeTask"]')
      .pause (1000)
      //---13--PO-> Confirm
      .click ('//*[@id="uOttawaTask4Form:j_idt1015"]')
      .pause (10000)
      .end ();
  },
};
