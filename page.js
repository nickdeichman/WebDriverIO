module.exports = {
  // Inputs
  fromField: '#from',
  toField: '#to',
  phoneNumberField: '#phone',
  codeField: '#code',
  cardNumber: '#number',
  cardCode: '#code.card-input',
  commentToDriver: '#comment',

  // Buttons
  callATaxiButton: 'button=Call a taxi',
  phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
  nextButton: 'button=Next',
  confirmButton: 'button=Confirm',
  tariffPicker: '.tariff-picker',
  tariff: '.tcard-title=',
  paymentMethodBtn: '.pp-value-text',
  addCreditCardBtn: 'div=Add card',
  linkCreditCardBtn: 'button=Link',
  closeModalBtn:
    '.payment-picker.open .section.active .close-button.section-close',
  iceCreamPlusBtn: '.counter .counter-plus',
  blanketAndHandkerchiefsBtn: '.switch',
  orderTaxiBtn: '.smart-button',

  //Checkboxes
  blanketAndHandkerchiefsCheckbox: '.switch-input',

  // Fields
  iceCreamCounter: '.counter .counter-value',
  orderHeaderTitle: '.order-header-title',

  // Modals
  phoneNumberModal: '.number-picker .modal',
  paymentPickerModal: '.payment-picker .modal',
  addingCardModal: '.head=Adding a card',
  orderModal: '.order.shown',

  // Functions
  selectTaxiPlan: async function (plan) {
    const tariffPickerDiv = await $(this.tariffPicker);
    await tariffPickerDiv.waitForDisplayed();
    const desiredPlan = await $(`${this.tariff}${plan}`);
    await desiredPlan.click();
  },

  fillAddresses: async function (from, to) {
    const fromField = await $(this.fromField);
    await fromField.setValue(from);
    const toField = await $(this.toField);
    await toField.setValue(to);
    const callATaxiButton = await $(this.callATaxiButton);
    await callATaxiButton.waitForDisplayed();
    await callATaxiButton.click();
  },

  fillPhoneNumber: async function (phoneNumber) {
    const phoneNumberButton = await $(this.phoneNumberButton);
    await phoneNumberButton.waitForDisplayed();
    await phoneNumberButton.click();
    const phoneNumberModal = await $(this.phoneNumberModal);
    await phoneNumberModal.waitForDisplayed();
    const phoneNumberField = await $(this.phoneNumberField);
    await phoneNumberField.waitForDisplayed();
    await phoneNumberField.setValue(phoneNumber);
  },

  fillCreditCardData: async function (creditCardNumber, creditCardCode) {
    const addingCardModal = await $(this.addingCardModal);
    await addingCardModal.waitForDisplayed();
    const cardNumber = await $(this.cardNumber);
    await cardNumber.waitForDisplayed();
    await cardNumber.setValue(creditCardNumber);
    const cardCode = await $(this.cardCode);
    await cardCode.waitForDisplayed();
    await cardCode.setValue(creditCardCode);
    await cardCode.click({ y: -10 });
    const linkCreditCardBtn = await $(this.linkCreditCardBtn);
    await linkCreditCardBtn.waitForDisplayed();
    await linkCreditCardBtn.click();
  },

  addCreditCard: async function (creditCardNumber, creditCardCode) {
    const paymentMethodBtn = await $(this.paymentMethodBtn);
    await paymentMethodBtn.waitForDisplayed();
    await paymentMethodBtn.click();
    const paymentPickerModal = await $(this.paymentPickerModal);
    await paymentPickerModal.waitForDisplayed();
    const addCreditCardButton = await $(this.addCreditCardBtn);
    await addCreditCardButton.waitForDisplayed();
    await addCreditCardButton.click();
    await this.fillCreditCardData(creditCardNumber, creditCardCode);
    const closeModalBtn = await $(this.closeModalBtn);
    await closeModalBtn.waitForDisplayed();
    await closeModalBtn.click();
  },

  submitPhoneNumber: async function (phoneNumber) {
    await this.fillPhoneNumber(phoneNumber);
    // we are starting interception of request from the moment of method call
    await browser.setupInterceptor();
    await $(this.nextButton).click();
    // we should wait for response
    // eslint-disable-next-line wdio/no-pause
    await browser.pause(2000);
    const codeField = await $(this.codeField);
    // collect all responses
    const requests = await browser.getRequests();
    // use first response
    await expect(requests.length).toBe(1);
    const code = await requests[0].response.body.code;
    await codeField.setValue(code);
    await $(this.confirmButton).click();
  },

  fillCommentToDriver: async function (messageForDriver) {
    const commentToDriverField = await $(this.commentToDriver);
    await commentToDriverField.waitForDisplayed();
    await commentToDriverField.setValue(messageForDriver);
  },

  orderBlanketAndHandkerchiefs: async function () {
    const blanketAndHandkerchiefsBtn = await $(this.blanketAndHandkerchiefsBtn);
    await blanketAndHandkerchiefsBtn.waitForDisplayed();
    await blanketAndHandkerchiefsBtn.click();
  },

  orderIceCream: async function (count) {
    const iceCreamPlusBtn = await $(this.iceCreamPlusBtn);
    await iceCreamPlusBtn.waitForDisplayed();
    for (let i = 0; i < count; i++) {
      await iceCreamPlusBtn.click();
    }
  },

  orderTaxi: async function (
    tariffPlan,
    creditCardNumber,
    creditCardCode,
    messageForDriver
  ) {
    await this.selectTaxiPlan(tariffPlan);
    await this.addCreditCard(creditCardNumber, creditCardCode);
    await this.fillCommentToDriver(messageForDriver);
    await this.orderBlanketAndHandkerchiefs();
    await this.orderIceCream(2);
    const orderTaxiBtn = await $(this.orderTaxiBtn);
    await orderTaxiBtn.waitForDisplayed();
    await orderTaxiBtn.click();
  },

  checkOrderModalInfo: async function () {
    const orderModal = await $(this.orderModal);
    await orderModal.waitForDisplayed();
    const orderButtons = await $('.order-buttons');
    return await orderButtons.waitUntil(
      async function () {
        const childElements = await orderButtons.$$('.order-btn-group'); // Get all child div elements
        const length = await childElements.length; // Get the length of child elements
        return length === 3;
      },
      { timeout: 40000 }
    );
  },
};
