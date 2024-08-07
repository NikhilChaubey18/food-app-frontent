const Footer = () => {
    return (
      <div className="bg-green-500 py-9">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <span className="text-2xl text-white font-bold tracking-tight">
            EatFood.com by Nikhil 
          </span>
          <span className="text-white font-bold tracking-tight flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </span>
        </div>
      </div>
    );
  };
  
  export default Footer;