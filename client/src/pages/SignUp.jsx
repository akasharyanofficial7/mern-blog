import React from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const SignUp = () => {
  return (
    <div className="flex flex-col  mx-20 my-20 lg:mx-24 lg:my-24 md:flex-row justify-center items-center">
      <div className="w-full md:w-1/3">
        <div className="flex flex-col justify-center items-center">
          <div className="self-center whitespace-nowrap  px-4 pb-4  lg:px-6   lg:pb-6 text-sm sm:text-xl font-semibold dark:text-white">
            <span className="px-2 py-1 text-2xl  lg:text-5xl  bg-gradient-to-r from-teal-500 via-indigo-500 to-pink-500 rounded-lg text-white">
              InBlog
            </span>
            Blog
          </div>
          <h6 className="text-sm  lg:text-lg">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </h6>
        </div>
      </div>
      <div className="w-full md:w-2/3 md:ml-8">
        <div className="max-w-md mx-auto">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput id="password" type="password" required />
          </div>
          <div className="flex items-center gap-2 px-2 py-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Submit</Button>
          <div className="mt-4">
            <Button gradientDuoTone="greenToBlue" outline>
              SignUp with Google
            </Button>
          </div>
          <div className="mt-2">
            <p>
              Already have an account? <Link to="/sign-in">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
