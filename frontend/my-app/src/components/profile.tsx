import Image from "next/image";
import profile from "../../public/profile.jpeg";
import nextJS from "../../public/nextjs.svg";
import mysql from "../../public/mysql.png";
import typescript from "../../public/typescript.png";
import go from "../../public/go.png";

export default function Profile() {
  return (
    <div className="flex mx-96 my-10 rounded-xl bg-slate-700">
      <div className="rounded-full overflow-hidden m-3">
        <Image
          alt="Profile"
          src={profile}
          width="400"
          height="400"
          priority={true}
        />
      </div>
      <div className="m-3">
        <h2 className="text-center font-bold text-2xl p-5">
          Created by: Kevin Chuquimarca
        </h2>
        <p>
          I am a person interested in the management and development of software
          projects, passionate about learning new technologies, platforms, and
          methodologies to create quality software.
        </p>
        <p className="font-bold">Created with: </p>
        <div className="flex justify-center space-x-6">
          <Image src={mysql} alt="mysql" width={50} height={50} />
          <Image src={go} alt="go" width={50} height={50} />
          <Image src={nextJS} alt="nextJS" width={50} height={50} />
          <Image src={typescript} alt="typescript" width={70} height={50} />
        </div>
        <p className="text-center mt-4">
          <b>GitHub Profile: </b>Kevin-Chuquimarca
        </p>
      </div>
    </div>
  );
}
