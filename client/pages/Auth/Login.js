import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { styles } from "../../style";
import { useLoginMutation } from "../../redux/auth/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials, setUser } from "../../redux/auth/authSlice";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../component/Loader";

export default function Login({ setOpen, setRoute }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  const [login, { error, isSuccess, isLoading }] = useLoginMutation();

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token }));
      dispatch(setUser({ user }));
    } catch (err) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      router.reload();
    }
  }, [session]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
      setOpen(false);
      router.reload();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, router]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full">
            <h1 className={`${styles.title}`}>Login with ELearning </h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className={`${styles.label}`}>
                Enter your Email
              </label>
              <input
                type="email"
                onChange={handleEmailInput}
                value={email}
                name="email"
                id="email"
                className={`${styles.input} ${error && "border-red-500"}`}
                placeholder="Loginmail@gmail.com"
                required
              />
              {error && <span className="text-red-500 pt-2 block"></span>}
              <div className="w-full mt-5 relative mb-1">
                <label htmlFor="password" className={`${styles.label}`}>
                  Enter your Password
                </label>
                <input
                  type={!show ? "password" : "text"}
                  name="password"
                  value={password}
                  onChange={handlePwdInput}
                  id="password"
                  placeholder="••••••••"
                  className={`${styles.input} ${error && "border-red-500"}`}
                />
                {!show ? (
                  <AiOutlineEyeInvisible
                    className="absolute bottom-3 right-2 z-1 cursor-pointer"
                    size={20}
                    onClick={() => setShow(true)}
                  />
                ) : (
                  <AiOutlineEye
                    className="absolute bottom-3 right-2 z-1 cursor-pointer"
                    size={20}
                    onClick={() => setShow(false)}
                  />
                )}
              </div>
              {error && <span className="text-red-500 pt-2 block"></span>}
              <div className=" w-full mt-5">
                <input type="submit" value="Login" className={styles.button} />
              </div>
              <h5 className=" mt-4 text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                Or Join with
              </h5>
              <div className="flex items-center justify-center my-2">
                <FcGoogle
                  size={30}
                  className=" cursor-pointer mr-2"
                  onClick={() => signIn("google")}
                />
                <AiFillGithub
                  size={30}
                  className=" cursor-pointer mr-2"
                  onClick={() => signIn("github")}
                />
              </div>
              <h5 className=" text-center pt-4 font-Poppins text-[14px]">
                Not have any account?{" "}
                <span
                  className="text-[#2190ff] pt-1 cursor-pointer"
                  onClick={() => setRoute("Sign-up")}
                >
                  Sign up
                </span>
              </h5>
              <br />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
