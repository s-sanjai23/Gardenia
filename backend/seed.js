const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { pathToFileURL } = require('url');
const Plant = require('./models/Plant');
const Accessory = require('./models/Accessory');
const CareGuide = require('./models/CareGuide');
const Order = require('./models/Order');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    await Plant.deleteMany();
    await Accessory.deleteMany();
    await CareGuide.deleteMany();

    const plantsDataPath = path.join(__dirname, '..', 'frontend', 'src', 'data', 'plants.js');
    const plantsDataURL = pathToFileURL(plantsDataPath);
    const { DUMMY_PLANTS } = await import(plantsDataURL);
    await Plant.insertMany(DUMMY_PLANTS);

    // Import Accessories
    const accessoriesDataPath = path.join(__dirname, '..', 'frontend', 'src', 'data', 'accessories.js');
    const accessoriesDataURL = pathToFileURL(accessoriesDataPath);
    const { DUMMY_ACCESSORIES } = await import(accessoriesDataURL);
    await Accessory.insertMany(DUMMY_ACCESSORIES);

    // Import Care Guides
    const careGuidesDataPath = path.join(__dirname, '..', 'frontend', 'src', 'data', 'careGuides.js');
    const careGuidesDataURL = pathToFileURL(careGuidesDataPath);
    const { getCareGuide } = await import(careGuidesDataURL);
    const careGuidesToInsert = [];
    for (const plant of DUMMY_PLANTS) {
      const guides = getCareGuide(plant.id);
      if (guides.length > 0) {
        careGuidesToInsert.push({ plantId: plant.id, guides });
      }
    }
    await CareGuide.insertMany(careGuidesToInsert);



    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Plant.deleteMany();
    await Accessory.deleteMany();
    await CareGuide.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}