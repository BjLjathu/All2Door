import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommonForm from "@/components/comman/form";
import { useEffect, useState } from "react";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const [currentEditedId,setCurrentEditedId] = useState(null)
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(event) {
    event.preventDefault();
    if(addressList.length >= 3 && currentEditedId === null ){
        setFormData(initialAddressFormData)
        toast.error('You can add max 3 address ')
        return
    }

    currentEditedId !== null ? dispatch(editaAddress({userId:user?.id , addressId : currentEditedId ,formData  })).then(data=>{
        if(data?.payload?.success){
            dispatch(fetchAllAddresses(user?.id)),
            setCurrentEditedId(null)
            setFormData(initialAddressFormData)
            toast('Address Edited Successfully')
        }
    }) :
    dispatch(
      addNewAddress({
        ...formData,
        userId: user?.id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setFormData(initialAddressFormData);
         toast('Address Added Successfully')
      }
    });
  }

  function handleDeleteAddress(addressToDelete) {
  dispatch(deleteAddress({ userId: user?.id, addressId: addressToDelete._id }))
    .then((data) => {
      if (data?.payload?.success) {
       
        dispatch(fetchAllAddresses(user?.id)); 
         toast('Address Deleted  Successfully')
      }
    });
}

function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id)
    setFormData({
        ...formData,
        address:getCurrentAddress?.address,
  city: getCurrentAddress?.city,
  phone: getCurrentAddress?.phone,
  pincode: getCurrentAddress?.pincode,
  notes: getCurrentAddress?.notes,

    })
    
}
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(addressList, "AddressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 border-0  gap-2 ">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>{currentEditedId !== null? 'Edit Address':'Add New Address'}</CardTitle>
      </CardHeader>
      <CardContent>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
