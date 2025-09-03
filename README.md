# Grocery List App

A modern React Native grocery list management application built with Expo and powered by a JSON Server backend.

## Getting Started

Follow these steps to run the application locally:

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI**
- **iOS Simulator** (for iOS development) or **Android Studio** (for Android development)

### Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   The `.env` file should contain:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:3000
   ```
   
   > **Note:** The `EXPO_PUBLIC_API_URL` variable points to your local JSON Server. Update this URL if you're running the API server on a different host or port.

3. **Start the API server**
   ```bash
   npm run server
   ```
   This will start the JSON Server API that provides the backend for the grocery data.

4. **Start the Expo development server**
   ```bash
   npm run start
   ```
   This will start the Expo development server and open the Expo DevTools in your browser.

5. **Run on your preferred platform**
   - Press `i` to run on **iOS Simulator**
   - Press `a` to run on **Android Emulator**
   - Scan the QR code with the **Expo Go** app on your physical device

### Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `EXPO_PUBLIC_API_URL` | Base URL for the API server | `http://localhost:3000` |

### Important Notes

- Make sure to create the `.env` file from `.env.example` before running the app
- Ensure the API server is running before starting the mobile app
- The API server typically runs on `http://localhost:3000`
- The mobile app will connect to this local API for data operations
- Environment variables prefixed with `EXPO_PUBLIC_` are accessible in the client-side code

---

## App Functionality

The application consists of **3 main screens** that allow users to efficiently manage their grocery shopping list.

### Application Screens

#### Groceries List
<details>
<summary>View Screenshot</summary>

<div align="center">
  <img width="381" height="825" alt="Groceries List Screen" src="https://github.com/user-attachments/assets/16ee4c7a-15e2-4ce1-9860-6923ec2184dd" />
</div>

</details>

#### Grocery Creation
<details>
<summary>View Screenshots</summary>

<div align="center">
  <img width="383" height="818" alt="Grocery Creation Form" src="https://github.com/user-attachments/assets/c0912120-39c8-402f-bf7b-b6172fb67805" />
  <br/><br/>
  <img width="386" height="824" alt="Grocery Creation with Validation" src="https://github.com/user-attachments/assets/b1b8b919-c139-4063-bc12-24972bcda9f1" />
</div>

</details>

#### Grocery Edit
<details>
<summary>View Screenshot</summary>

<div align="center">
  <img width="379" height="821" alt="Grocery Edit Screen" src="https://github.com/user-attachments/assets/ad427f94-b10b-431c-a66d-574dfca9a169" />
</div>

</details>

---

### Features

#### Groceries List Screen

**Header with Summary and Filters**
<details>
<summary>View Screenshot</summary>

<div align="center">
  <img width="392" height="173" alt="Header Section with Summary and Filters" src="https://github.com/user-attachments/assets/df1718fe-af92-4060-bed6-01836dcb84c9" />
</div>

</details>

**List of Groceries**
<details>
<summary>View Screenshot</summary>

<div align="center">
  <img width="382" height="655" alt="Grocery Items List" src="https://github.com/user-attachments/assets/fab5919e-6f64-4459-86eb-f79b5c9405d2" />
</div>

</details>

**Floating Action Button (FAB)**
<details>
<summary>View Screenshot</summary>

<div align="center">
  <img width="74" height="74" alt="Floating Action Button for Adding Items" src="https://github.com/user-attachments/assets/42981884-486e-48f6-928f-5cd0d689499e" />
</div>

Quick access button to create new grocery items.

</details>

**Filters**
<details>
<summary>View Filter Button</summary>

<div align="center">
  <img width="58" height="60" alt="Filter Button" src="https://github.com/user-attachments/assets/3885a305-6db2-4ef3-861d-a3452ae409ac" />
</div>

</details>

<details>
<summary>View Filter Interface</summary>

<div align="center">
  <img width="370" height="605" alt="Filter Interface - Collapsed" src="https://github.com/user-attachments/assets/d0101555-82c7-4c0f-b98a-87233d3455da" />
  <br/><br/>
  <img width="371" height="826" alt="Filter Interface - Expanded" src="https://github.com/user-attachments/assets/acee0f3c-2736-4666-a0b3-6022e364b9aa" />
</div>

Search and filter groceries by name or status.

</details>

---

#### Grocery Item Controls

**Quantity Controls**
<details>
<summary>View Screenshot</summary>

<div align="center">
  <img width="179" height="40" alt="Quantity Increment/Decrement Controls" src="https://github.com/user-attachments/assets/8499179f-fff7-4af5-9b04-7f71f01b64a5" />
</div>

Easily adjust item quantities with + and - buttons.

</details>

**Mark as Bought Button**
<details>
<summary>View Screenshot</summary>

<div align="center">
  <img width="44" height="48" alt="Mark as Bought Button" src="https://github.com/user-attachments/assets/057c4760-cb33-4365-bcb0-c7c0fff6dc61" />
</div>

One-tap button to mark items as purchased (only visible for pending items).

</details>

**Delete Actions**
<details>
<summary>View Screenshots</summary>

<div align="center">
  <img width="50" height="53" alt="Delete Button" src="https://github.com/user-attachments/assets/5887e389-7807-41ad-9697-982464d2a35f" />
  <br/><br/>
  <img width="291" height="159" alt="Delete Confirmation Dialog" src="https://github.com/user-attachments/assets/d191328d-7673-4e90-ad2b-aaeb04c2a559" />
</div>

Safe deletion with confirmation dialog to prevent accidental removals.

</details>

**Status Indication**
<details>
<summary>View Screenshots</summary>

<div align="center">
  <img width="143" height="95" alt="Unchecked Item Status" src="https://github.com/user-attachments/assets/6c193e45-7522-467a-83fb-dde9b32eeab8" />
  <br/><br/>
  <img width="359" height="106" alt="Checked Item with Crossed Out Text" src="https://github.com/user-attachments/assets/21433643-5a34-4f00-9a62-d059343bded9" />
</div>

The checkbox and title work together to show the grocery's purchase status:
- **Unchecked** + Normal title = Item not yet purchased
- **Checked** + Crossed-out title = Item has been purchased

</details>

**Navigate to Edit Screen**
Clicking on the grocery item's title opens the detailed edit screen where users can modify all properties of the grocery item.
