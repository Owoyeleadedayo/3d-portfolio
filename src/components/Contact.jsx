import { useRef } from "react";

const Contact = () => {
    const nameRef = useRef();
    const messageRef = useRef();

    const handleSubmit = (e) => {
      e.preventDefault();

      const name = nameRef.current.value;
      const message = messageRef.current.value;

      const fullMessage = `Hi, I'm ${name} and ${message}`;
      const encodedMessage = encodeURIComponent(fullMessage);

      const yourWhatsAppNumber = "2348012345678"; // YOUR WhatsApp number
      const whatsappUrl = `https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
    };
  return (
    <>
      <div id="contact" className="xl:mt-0 mt-32">
        <div className="flex flex-col gap-4 padding-x-lg">
          <div>
            <h1 className="md:text-xl text-lg font-2xl font-MonaSans">Get in Touch</h1>
          </div>
          <div>
            <h1 className="capitalize md:text-5xl text-3xl">Let's chat, reach out to me</h1>
          </div>
          <div>
            <h4 className="md:text-xl text-lg font-2xl">
              Have questions or feedback? I'm here to help. Send me a message,
              and I'll respond within 24hours
            </h4>
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex w-full h-100 justify-center items-center">
          <form className="mx-auto" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  ref={nameRef}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer rounded-none"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_first_name"
                  className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  //   pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="floating_phone"
                  id="floating_phone"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer rounded-none"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_phone"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number
                </label>
              </div>
            </div>
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your message
              </label>
              <textarea
                id="message"
                ref={messageRef}
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <div className="flex justify-center items-center"> 
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
