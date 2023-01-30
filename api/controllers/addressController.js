import Address from "../models/Address";
import Customer from "../models/Customer";

// CREATE ADDRESS
const createAddress = async (req, res) => {
  try {
    const check = await Address.findOne({ customerID: req.body.customerID });
    let newAddress;

    if (check) {

      // If customer already has shipping address and new address is default, set all old address is not default
      if (req.body.isDefault) {
        await Address.findOneAndUpdate(
          { customerID: req.body.customerID, isDefault: true },
          { $set: { isDefault: false } },
          { new: true }
        )
      }
      newAddress = new Address(req.body);
    } else {
      newAddress = new Address({
        ...req.body,
        isDefault: true
      })
    }

    const saveAddress = await newAddress.save();
    res.status(201).json(saveAddress);
  } catch (error) {
    res.status(501).json(error);
  }
};

// GET ALL 
const getAllAddresss = async (req, res) => {
  const addressList = await Address.find({});
  try {
    res.status(200).json(addressList);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET USER ADDRESS LIST
const getUserAddress = async (req, res) => {
  let error = {};
  try {
    const Addresss = await Address.find({ customerID: req.params.id });
    return res.status(201).json(Addresss);
  } catch {
    return res.status(500).json(error);
  }
}

// GET CURRENT ADDRESS
const getCurrentAddress = async (req, res) => {
  try {
    const currentAddress = await Address.findById(req.params.id);
    const { email } = await Customer.findById(currentAddress.customerID, "email");
    const updateInfoAddress = { ...currentAddress._doc, email: email };
    return res.status(200).json(updateInfoAddress);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// UPDATE ADDRESS
const updateAddress = async (req, res) => {
  try {
    if (req.body.isDefault) {
      await Address.updateMany(
        { customerID: req.body.customerID, isDefault: true },
        { $set: { isDefault: false } },
        { new: true }
      )
    }
    const updateAddress = await Address.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updateAddress);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE ADDRESS
const deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createAddress,
  getAllAddresss,
  getCurrentAddress,
  updateAddress,
  deleteAddress,
  getUserAddress
};