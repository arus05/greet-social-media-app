const Footer = () => {
  return (
    <footer className="text-text-subtle dark:text-text-subtle-dark
            font-normal text-sm mt-10
    ">
      <div>
        <ul className="flex-center flex-wrap gap-x-3 gap-y-1 mb-5">
            <li>
              <a href="#">Privacy Terms</a>
            </li>
            <li>
              <a href="#">Advertising</a>
            </li>
            <li>
              <a href="#">Cookies</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
        </ul>
        <p className="">
          &copy; 2023 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
    
  );
}
 
export default Footer;