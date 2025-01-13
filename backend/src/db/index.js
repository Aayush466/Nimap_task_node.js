import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;


// 1. HTML Page - Category Master with CRUD operations
// 2. HTML Page - Product Master with CRUD operations. A product belongs to a category.
// 3. The product list should also display ProductId, ProductName, CategoryName, CategoryId.
// The product list should have pagination on the server side, which means extract records from DB as per the page size on the view.
// So if the page size is 10 and the user is on page 9 then pull only records from 90 - 100.

// i have made the backend part of this project give me the frontend part of the code in react 