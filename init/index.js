const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../modals/listing.js");

main().then(res => console.log("connection sucessful")) 
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

const initDB = async () => {
    await Listing.deleteMany({}); 
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "6834949cd769407b5a878876",
    }));
    
    await Listing.insertMany(initData.data);
    // const data = await Listing.find();
    console.log("data");
}

initDB();