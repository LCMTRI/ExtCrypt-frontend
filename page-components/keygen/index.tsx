import OptionForm from "@/components/forms/option-form";
import Link from "next/link";

const KeygenPageComponent = () => {
  return (
    <div className="w-full h-full py-16 flex flex-col gap-20 items-center justify-center">
      <div className="flex flex-col text-center lg:mx-0 mx-10 gap-6">
        <h1 className="inline-block text-4xl">Key Generation Options</h1>
        <span className="text-lg mx-auto lg:w-2/3 w-full px-8">
          Choose additional options to generate key with the target machine's
          hardware informations.
        </span>
      </div>
      <div className="px-20 py-2 w-full flex lg:flex-row flex-col-reverse gap-8">
        <div className="w-full py-8 px-12 border rounded">
          {/* <OptionsSection /> */}
          <OptionForm />
        </div>
        <div className="w-full py-8 px-12 border rounded hidden md:block">
          <h1 className="font-semibold text-2xl mb-8">Instructions</h1>
          <ol className=" list-decimal list-inside flex flex-col gap-3 text-lg leading-7">
            <li>
              <span>
                Choose the options of the target machine's information you want
                to get to generate the key.
                <br />
                <span className=" text-gray-500 leading-9">
                  (No options means source code can run on any machine)
                </span>
              </span>
            </li>
            <li>
              <span>When finish, click "Create ticket".</span>
            </li>
            <li>
              <span>
                Receive an according{" "}
                <span className="font-semibold">install.php</span>, run it in
                the target local machine to generate key with the options you
                picked.
              </span>
            </li>
            <li>
              <span>
                A ticket will also be created (visit{" "}
                <Link
                  href={"/tickets"}
                  className="underline underline-offset-1 text-cyan-700 hover:text-cyan-500 font-semibold"
                >
                  tickets
                </Link>{" "}
                to check). Upload the file with generated key and your source
                code in a <span className="font-semibold">.zip</span> file.
                <br />{" "}
                <span className="font-semibold text-red-500 leading-9">
                  Remember:
                </span>{" "}
                Ticket will be expired in 24 hours.
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default KeygenPageComponent;
