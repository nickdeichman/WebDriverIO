# Project Name
__Sprint 8 project__

## Description:

This project automates end-to-end (e2e) tests for the Urban Routes application, ensuring a seamless taxi ordering experience. The tests cover the entire process from setting the address to receiving driver information, verifying each crucial step.

## Technologies:

* Testing Framework: WebDriverIO
* JavaScript: Used to write the automated test scripts
* Mocha
* Node.js

## Techniques:
* Page Object Model (POM)

   For example, in page.js, elements like fromField, toField, and phoneNumberField are encapsulated within a class to streamline their usage across different test cases.

* Network Request Interceptor

   For example, await browser.setupInterceptor(); starts intercepting requests, and const requests = await browser.getRequests(); collects and inspects them. In the case of our testing, this allows for the system to retrieve the verification code sent in order to verify the phone number.

* Randomized Data Generation

   You can find the function for generating randomized data in the helper.js file of the project. For example, the getPhoneNumber function in helper.js creates new phone numbers for each test execution.

* Element Visibility Checks

   For example, await $(this.callATaxiButton).waitForDisplayed(); ensures the button is visible before clicking it.

* Element Interaction

   For example, await $(this.nextButton).click(); simulates a user clicking the "Next" button.

## How to Run the Tests:

### Prerequisites:

* Ensure you have Node.js and npm (or yarn) installed on your system.
* Clone the project repository.
* Install Dependencies:
  * Open a terminal in the project directory.
  * Run `npm install` to install the required test dependencies.

## Run the Tests:

Run `npm test`  to execute the automated tests.

## Additional Notes:

* The tests are located in the test/specs/createAnOrder.e2e.js file.
* The tests cover setting the address, selecting a supportive plan, entering phone number, adding a credit card, writing a message for the driver, ordering additional items (blanket, handkerchiefs, ice creams), and verifying the driver search and assignment process.
* Consider including a section on how to contribute to the project if applicable.
