// src/services/index.js

const getAllData = async (model) => {
    try {
        return await model.find();
    } catch (error) {
        throw new Error('Error fetching data: ' + error.message);
    }
};

const getDataById = async (model, id) => {
    try {
        return await model.findById(id);
    } catch (error) {
        throw new Error('Error fetching data by ID: ' + error.message);
    }
};

const createData = async (model, data) => {
    try {
        const newData = new model(data);
        return await newData.save();
    } catch (error) {
        throw new Error('Error creating data: ' + error.message);
    }
};

const updateData = async (model, id, data) => {
    try {
        return await model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error('Error updating data: ' + error.message);
    }
};

const deleteData = async (model, id) => {
    try {
        return await model.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting data: ' + error.message);
    }
};

module.exports = {
    getAllData,
    getDataById,
    createData,
    updateData,
    deleteData
};
