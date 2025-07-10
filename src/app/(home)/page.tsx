import Image from "next/image";

const page = () => {
  return (
    <div>
      <Image src="/next.svg" alt="next" width={200} height={200}/>
        <p>안녕하세요~</p>
    </div>
  );
};

export default page;