const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const productModel = require('../models/productModel');

const products = [
  {
    name: 'Classic Leather Bag',
    price: 2500,
    discount: 200,
    bgcolor: '#fef3c7',
    panelcolor: '#fde68a',
    textcolor: '#92400e',
    image: 'classic-leather-bag.png'
  },
  {
    name: 'Modern Backpack',
    price: 3200,
    discount: 300,
    bgcolor: '#dbeafe',
    panelcolor: '#93c5fd',
    textcolor: '#1e40af',
    image: 'modern-backpack.png'
  },
  {
    name: 'Elegant Handbag',
    price: 2800,
    discount: 150,
    bgcolor: '#fce7f3',
    panelcolor: '#f9a8d4',
    textcolor: '#831843',
    image: 'elegant-handbag.png'
  },
  {
    name: 'Casual Tote',
    price: 1800,
    discount: 100,
    bgcolor: '#d1fae5',
    panelcolor: '#6ee7b7',
    textcolor: '#064e3b',
    image: 'casual-tote.png'
  }
];

// Copy sample images to public/products
const copyImages = () => {
  const sourceDir = path.join(__dirname, 'sampleImages');
  const destDir = path.join(__dirname, '../public/products');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  products.forEach(product => {
    const src = path.join(sourceDir, product.image);
    const dest = path.join(destDir, product.image);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${product.image} to public/products`);
    } else {
      console.warn(`Image file ${product.image} not found in sampleImages`);
    }
  });
};

const seedProducts = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/your-db-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await productModel.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await productModel.insertMany(products);
    console.log('Inserted sample products');

    copyImages();

    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error seeding products:', err);
  }
};

seedProducts();
