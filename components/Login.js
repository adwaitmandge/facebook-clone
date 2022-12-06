import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="grid place-items-center">
      <Image
        src="http://links.papareact.com/t4i"
        height={400}
        width={400}
        className="mb-20"
      />
      <button
        className="p-5 bg-blue-500 rounded-full text-white font-semibold text-center cursor-pointer"
        onClick={signIn}
      >
        Login with Facebook
      </button>
    </div>
  );
};

export default Login;
