Build SupplyChain Pro using Angular / .Net
Type: Subjective Question
Skill: .Net / Angular
Hard
Summarizing the question
In this capstone, you'll build SupplyChainPro – a digital supply chain management platform providing functionalities such as inventory tracking, order processing, supplier management, and logistics coordination. In the SupplyChainPro Management System, you'll develop an online supply chain platform, SupplyChainPro, using C#, ASP.NET MVC with EF, MSSQL, and Angular.



Functionalities to be built:



User Registration & Profile Management (Manufacturers, Distributors, Retailers, and Logistics Providers):
Frontend Task: Design UI for user registration, login/logout, and profile management. Role-based UI elements (Manufacturer, Distributor, Retailer, Logistics Provider).
Backend Task: Implement user registration, login, and role-based authorization logic. Develop endpoints for profile-related operations.
Middleware: Set up authentication middleware for session management and role-based requests.
Test Cases:
- Confirm successful user registration, login, and logout processes.
- Validate role-based content accessibility.
Inventory Tracking & Management:
Frontend Task: Design interfaces for users to add, view, update, or delete inventory items, including stock levels and product details.
Backend Task: Develop inventory management logic and implement necessary API endpoints.
Test Cases:
- Verify successful addition, viewing, modification, and deletion of inventory items.
- Confirm accurate stock level tracking and alerts for low stock.
Order Processing & Management:
Frontend Task: Design a UI for users to manage orders, including order creation, tracking, and fulfillment.
Backend Task: Handle the order lifecycle, from creation to delivery, including payment processing.
Test Cases:
- Ensure seamless order creation, tracking, and fulfillment.
- Validate payment processing and invoice generation.
Supplier Management & Coordination:
Frontend Task: Allow users to manage supplier details, view supplier performance metrics, and coordinate for raw material procurement.
Backend Task: Implement supplier management logic, including performance tracking.
Test Cases:
- Confirm users can add, modify, and coordinate with suppliers.
- Validate supplier performance metrics generation.
Logistics & Shipment Tracking:
Frontend Task: Design interfaces for users to coordinate logistics, track shipments, and manage delivery schedules.
Backend Task: Implement logistics coordination logic, ensuring timely deliveries and efficient route planning.
Test Cases:
- Ensure users can track shipments in real-time.
- Confirm efficient route planning and delivery schedule management.

Note: For entity use these command:
dotnet new tool-manifest
dotnet tool restore
dotnet dotnet-ef  ---add your command here----

If found project error then remove obj folder and rebuild project again..

API Integration:
here are payload and api end points
/api/Account/login
{
  "userName": "string",
  "password": "string",
  "userId": 0,
  "role": "string",
  "token": "string"
}

api/Account/RegisterUser
{
  "userName": "string",
  "password": "string",
  "userId": 0,
  "role": "string",
  "token": "string"
}

api/Account/UsersByRole/Ad'

/api/Inventory     //for post get put and delete
 {
    "id": 0,
    "name": "string",
    "description": "string",
    "stockLevel": 0,
    "price": 0,
    "createdAt": "2024-10-21T06:05:25.166Z",
    "updatedAt": "2024-10-21T06:05:25.166Z"
  }

/api/Logistics  //for post get delete and update
{
  "id": 0,
  "orderId": 0,
  "status": "string",
  "scheduledDeliveryDate": "2024-10-21T06:06:41.506Z",
  "actualDeliveryDate": "2024-10-21T06:06:41.506Z",
  "carrier": "string",
  "trackingNumber": "string",
  "routeDetails": "string",
  "supplierId": 0,
  "supplier": {
    "id": 0,
    "name": "string",
    "contactPerson": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "rating": 0,
    "totalOrders": 0,
    "createdAt": "2024-10-21T06:06:41.506Z",
    "updatedAt": "2024-10-21T06:06:41.506Z"
  }
}

/api/Order
{
  "id": 0,
  "userId": 0,
  "orderDate": "2024-10-21T06:07:38.282Z",
  "deliveryDate": "2024-10-21T06:07:38.282Z",
  "status": "string",
  "totalAmount": 0,
  "paymentStatus": "string",
  "inventoryItem": [
    {
      "orderItemId": 0,
      "orderId": 0,
      "name": "string",
      "quantity": 0
    }
  ],
  "logistics": {
    "id": 0,
    "orderId": 0,
    "status": "string",
    "scheduledDeliveryDate": "2024-10-21T06:07:38.282Z",
    "actualDeliveryDate": "2024-10-21T06:07:38.282Z",
    "carrier": "string",
    "trackingNumber": "string",
    "routeDetails": "string",
    "supplierId": 0,
    "supplier": {
      "id": 0,
      "name": "string",
      "contactPerson": "string",
      "email": "string",
      "phone": "string",
      "address": "string",
      "rating": 0,
      "totalOrders": 0,
      "createdAt": "2024-10-21T06:07:38.282Z",
      "updatedAt": "2024-10-21T06:07:38.282Z"
    }
  },
  "supplier": {
    "id": 0,
    "name": "string",
    "contactPerson": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "rating": 0,
    "totalOrders": 0,
    "createdAt": "2024-10-21T06:07:38.282Z",
    "updatedAt": "2024-10-21T06:07:38.282Z"
  }
}
api/Order/GetOrderOrderStatus/1

/api/Supplier  //add update delete and update
api/Supplier/performance/1?rating=2
{
  "id": 0,
  "name": "string",
  "contactPerson": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "rating": 0,
  "totalOrders": 0,
  "createdAt": "2024-10-21T06:11:33.970Z",
  "updatedAt": "2024-10-21T06:11:33.970Z"
}