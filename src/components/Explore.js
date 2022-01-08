import Post from "./Post";
import { useEffect, useState } from "react";
import data from "./data";
import emptyData from "../assets/emptyData.svg";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  documentId,
} from "firebase/firestore";
const Explore = () => {
  const [posts, setPosts] = useState({});
  const [search, setSearch] = useState("");
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const postsCollectionRef = collection(db, "Posts");
  const fetchPosts = async () => {
    setIsPostsLoading(true);
    const data = await getDocs(postsCollectionRef);
    setPosts(
      data?.docs?.map((doc) => {
        //console.log(doc.data().likes);
        return { post: doc?.data(), postID: doc?.id };
      })
    );
    setIsPostsLoading(false);
  };
  const doSearch = (cards) => {
    return cards?.filter((card) => {
      if (search === "") return card;
      else
        return card?.post?.title
          ?.toLowerCase()
          ?.includes(search?.toLowerCase());
    });
  };

  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);

  return (
    <>
      {isPostsLoading ? (
        <div className='w-full h-screen flex justify-center items-center'>
          <h1 className='text-2xl'>Loading...</h1>
        </div>
      ) : (
        <div className=''>
          <div className='h-96  bg-explorePicture bg-cover bg-no-repeat bg-center w-full  flex flex-col  items-center relative'>
            <div className='bg-black bg-opacity-50 absolute top-0 left-0 right-0 h-full w-full'></div>

            <div className='bg-white shadow-md  w-super_larg lg:w-tour_guide_card flex rounded-full items-center justify-between absolute bottom-10 '>
              <input
                value={search}
                type='text'
                className='w-32 sm:w-3/4  py-2 sm:px-2 px-1 rounded-full sm:ml-10 ml-5 outline-none sm:text-lg text-sm  '
                placeholder='Enter The City Name'
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className=' flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-7 w-7 mr-3 text-gray-500'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M9 9a2 2 0 114 0 2 2 0 01-4 0z' />
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z'
                    clipRule='evenodd'
                  />
                </svg>
                <div className='hidden  w-32 h-8   bg-green-400 rounded-full sm:flex justify-center items-center shadow-md mr-3'>
                  <h1 className='font-bold text-white'>Enjoy</h1>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap justify-center'>
            {doSearch(posts)?.length !== 0 ? (
              doSearch(posts)?.map((post, index) => (
                <Post post={post} key={index} />
              ))
            ) : (
              <div className='flex  items-center justify-center flex-col mt-24 mb-24 mx-2'>
                <img src={emptyData} alt='Empty Data!' className='w-72 h-72' />
                <p className='text-gray-400 text-3xl'>No Data Found!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
