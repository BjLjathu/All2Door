const address = require("../../models/address");
const Address = require("../../models/address");

const addAddress = async (res, req) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided ! ",
      });
    }
    const newlyCreatedAdress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    await newlyCreatedAdress.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedAdress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

const fetchAllAddress = async (res, req) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required! ",
      });
    }

    const addressList = await Address.find({ userId });
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

const editAddress = async (res, req) => {
  try {
    const { userId, addressId } = req.params;

    const formdata = req.body;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "UserId and addressId are required! ",
      });
    }
    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formdata,
      { new: true }
    );

    if(!address){
        return res.status(404).json({
            success:false,
            message:'Address not found'
        })
    }
    res.statu(200).json({
        success:true,
        data:address
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

const deleteAddress = async (res, req) => {
  try {
     const { userId, addressId } = req.params;
      if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "UserId and addressId are required! ",
      });
    } 

    const address = await Address.findOneAndDelete({
        _id:addressId,userId
    })

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };
