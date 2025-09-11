import accImg from '../../assets/account.jpg'


function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={accImg} alt="" />
      </div>
      
    </div>
  );
}

export default ShoppingAccount;
