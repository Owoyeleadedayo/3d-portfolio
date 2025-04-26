import { useEffect, useRef } from "react";
import * as THREE from "three";

const Contact = () => {
  const backgroundRef = useRef(null);
  const nameRef = useRef();
  const messageRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    backgroundRef.current.appendChild(renderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starVertices = [];

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: "#fafafa",
      size: 0.1,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 50;

    const animate = () => {
      requestAnimationFrame(animate);

      // Update star positions for racing effect
      const positions = stars.geometry.attributes.position.array;
      const speed = 0.1; // Adjust speed (larger = faster, smaller = slower)
      for (let i = 2; i < positions.length; i += 3) {
        positions[i] += speed; // Move stars toward camera
        if (positions[i] > 50) {
          positions[i] = -50; // Reset to far distance
          positions[i - 2] = (Math.random() - 0.5) * 100; // New x
          positions[i - 1] = (Math.random() - 0.5) * 100; // New y
        }
      }
      stars.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
      if (backgroundRef.current) {
        backgroundRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const message = messageRef.current.value;
    const fullMessage = `Hi, I'm ${name} and ${message}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const yourWhatsAppNumber = "2348110443114";
    const whatsappUrl = `https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="relative w-screen h-screen">
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full z-0"
      ></div>
      <div
        id="contact"
        className="relative z-10 xl:mt-0 mt-32 md:w-full w-screen md:px-20 px-5"
      >
        <div className="flex flex-col gap-4 padding-x-lg">
          <h1 className="md:text-xl text-lg font-2xl font-MonaSans">
            Get in Touch
          </h1>
          <h1 className="capitalize md:text-5xl text-3xl">
            Let's chat, reach out to me
          </h1>
          <h4 className="md:text-xl text-lg font-2xl">
            Have questions or feedback? I'm here to help. Send me a message, and
            I'll respond within 24 hours
          </h4>
        </div>
        <hr className="mt-10" />
        <div className="flex w-full h-100 justify-center items-center">
          <form className="mx-auto" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6 md:w-full w-screen md:px-20 px-5">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  ref={nameRef}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-200 peer rounded-none"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-200 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  name="floating_phone"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer rounded-none"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-200 peer-focus:dark:text-gray-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number
                </label>
              </div>
            </div>
            <div className="md:w-full w-screen md:px-20 px-5">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your message
              </label>
              <textarea
                id="message"
                ref={messageRef}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
