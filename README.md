# Playwright TypeScript Layered Automation Framework

A scalable UI and API automation framework built using Playwright and TypeScript, demonstrating layered test architecture, reusable components, custom fixtures, API automation, cross-browser testing, and GitHub Actions CI.

> **Portfolio Project:** This is an independent automation project built for demonstration purposes. SauceDemo is used as the application under test.

---

## Project Overview

This project demonstrates how a Playwright automation framework can be structured for maintainability, reusability, and scalability.

The framework separates test scenarios from business workflows, page interactions, API services, test data, and shared test context.

It includes both UI and API automation and is configured to execute tests across Chromium, Firefox, and WebKit.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Playwright | UI and API automation |
| TypeScript | Programming language |
| Node.js | Runtime environment |
| Git | Version control |
| GitHub Actions | CI automation |
| JSONPlaceholder | API test environment |
| SauceDemo | UI test application |

---

## ✨ Key Features

- Playwright automation using TypeScript
- Layered automation architecture
- Page Object Model
- Workflow/business-layer abstraction
- Custom Playwright fixtures
- Reusable API service layer
- TypeScript interfaces for API models
- Test data management and user factory
- Positive and negative test scenarios
- End-to-end checkout workflow
- API GET and POST automation
- HTTP error response validation
- Cross-browser execution
- Automatic test execution through GitHub Actions
- Playwright HTML test reporting
- Screenshots, videos, and traces configured for failure analysis

---

## 🧪 Test Coverage

### UI Automation

#### Authentication

- Login with valid standard user
- Login attempt with locked-out user

#### Checkout

- Login as standard user
- Add product to cart
- Open shopping cart
- Verify selected product
- Proceed to checkout
- Enter customer information
- Complete purchase
- Verify order confirmation

### API Automation

#### GET

- Retrieve an existing post
- Validate response data
- Validate response structure

#### POST

- Create a new post
- Validate created response
- Validate submitted request data

#### Negative Scenario

- Request a non-existent post
- Validate expected HTTP `404` response

---

## 🏗️ Architecture

The framework follows a layered architecture where test scenarios remain separated from UI implementation details and API communication.

```text
                         Playwright Test Runner
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                 UI Tests                    API Tests
                    │                           │
             Custom Fixtures              Custom Fixtures
                    │                           │
          ┌─────────┴─────────┐              │
          │                   │              │
      Workflows          Page Objects    ApiService
          │                   │              │
          └─────────┬─────────┘              │
                    │                        │
                Playwright             APIRequestContext
                    │                        │
                SauceDemo              JSONPlaceholder