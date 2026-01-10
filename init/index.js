const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/Listing.js");
const methodOverride = require("method-override");
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
app.use(methodOverride('_method'));

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderLust';

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        // 1. Clear old data
        await Listing.deleteMany({});
        
        // 2. FIX: Use your REAL User ID (shreya0015)
        initData.data = initData.data.map((obj) => ({
            ...obj, owner: "696082573e799c0d593e2f6c" 
        }));
        
        // 3. Insert new data with correct owner
        await Listing.insertMany(initData.data);
        console.log("Data initialized successfully with valid owner!");
        
    } catch (err) {
        console.log("Error initializing database:", err);
    }
};
initDB();
