import React, { useState } from "react";
import  authService  from "../appwrite/auth"
import { login } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div class="absolute inset-0">
            <img
              class="h-full w-full rounded-md object-cover object-top"
              src="https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTk0fHxkZXNpZ25lcnxlbnwwfHwwfHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
              alt=""
            />
          </div>
        </div>
        <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>
            <p class="mt-2 text-sm text-gray-600">
              Don&#x27;t have an account?{" "}
              <Link
                to="/login"
                class="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Sign in 
              </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            
            <form onSubmit={handleSubmit(create)} className="mt-8">
              <div class="space-y-5">
<div class="mt-2">
                    <Input
                      label="Full Name: "
                      placeholder="Enter your full name"
                      {...register("name", {
                        required: true,
                      })}
                    />
                  </div>
                <div>
                  <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                      required: true,
                      validate: {
                        matchPatern: (value) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            value
                          ) || "Email address must be a valid address",
                      },
                    })}
                  />
                  <div class="mt-2">
                    <Input
                      label="Password: "
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div>
                  <div class="mt-2"></div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                   Create Account{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </form> 
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
