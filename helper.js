module.exports = {
  getPhoneNumber: function (countryCode) {
    const number = Math.floor(1000000000 + Math.random() * 9000000000);
    return `${countryCode}${number}`;
  },
  getElementByText: async function (obj) {
    return await $(`div=${obj.toString()}`);
  },
  getCreditCardNumber: function () {
    const length = 12;
    let number = '';
    for (let i = 0; i < length; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number.replace(/\d{4}/g, '$& ');
  },
  getCreditCardCode: function () {
    const min = 12;
    const max = 99;
    const cvv = Math.floor(Math.random() * (max - min + 1)) + min;
    return cvv.toString().padStart(2, '0');
  },
};
