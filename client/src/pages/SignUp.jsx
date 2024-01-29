// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("Please fill out all required fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) return setErrorMessage(data.error);

      navigate("/signin");
      setLoading(false);
      setFormData("");
    } catch (err) {
      setErrorMessage(err);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col p-3 max-w-3xl justify-center items-center  mx-auto  gap-4">
        <div className="bg-black mt-20 pt-8 p-4 rounded-lg ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-white font-semibold text-3xl text-center">
              Create Your Account
            </h1>

            <div>
              <Label className="text-white mb-2" value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                className="mt-1"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-white mb-2" value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@example.com"
                className="mt-1"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-white mb-2" value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                className="mt-1"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="mt-5 text-white text-sm gap-2 flex ">
            <span>Have an account?</span>
            <Link to={"/signin"} className="text-blue-700">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" className="mt-5">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
