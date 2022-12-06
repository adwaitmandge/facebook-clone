import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import db, { storage } from "../firebase";
import firebase from "firebase/compat/app";

const InputBox = () => {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") return;
    db.collection("posts")
      .add({
        email: session.user.email,
        image: session.user.image,
        name: session.user.name,
        message: inputRef.current.value,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            //This is how we get the progress
            null,
            (error) => console.error(error),
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    inputRef.current.value = "";
  };

  const addPostToImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md text-gray-500 font-medium mt-6 ">
      <div className="flex space-x-4 p-3 items-center">
        <Image
          src={session.user.image}
          className="rounded-full"
          height={40}
          width={40}
        />
        <form className="flex flex-1">
          <input
            ref={inputRef}
            type="text"
            className="px-5 focus:outline-none h-12 bg-gray-100 rounded-full flex-grow"
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer "
          >
            <img src={imageToPost} className="h-12 object-contain" />
            <p className="text-xs text-center text-red-500">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t ">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          className="inputIcon"
          onClick={() => filePickerRef.current.click()}
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            type="file"
            hidden
            ref={filePickerRef}
            onChange={addPostToImage}
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};
export default InputBox;
