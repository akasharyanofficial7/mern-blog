import React from "react";
import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
import { HiLogout } from "react-icons/hi";
const Header = () => {
  const path = useLocation().pathname;

  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-pink-500 rounded-lg text-white">
          Sahand's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <div className="lg:hidden">
        <Button className="w-12 h-10" color="gray" pill>
          <AiOutlineSearch />
        </Button>
      </div>

      <div className="flex gap-2 md:order-2">
        <Button classNamee="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>

        {currentUser && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium">
                {currentUser.email}
              </span>
            </Dropdown.Header>

            <Link to={"/dashboard/tab=profile"} className="">
              <Dropdown.Item>profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}

        <Link to="/sign-in">
          <Button gradientDuoTone="greenToBlue" outline>
            Sign In
          </Button>
        </Link>

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
