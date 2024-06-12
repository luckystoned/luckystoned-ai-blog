import Header from "../components/Header";
import Comment from "../components/Comment";

export default async function Post() {
  return (
    <>
      <Header />
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl text-white mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Hello World
        </h1>
        <div className="flex justify-between text-white p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span></span>
          <span className="italic">0 mins read</span>
        </div>
        <div className="p-3 max-w-2xl text-white mx-auto w-full post-content border-b border-slate-500 mb-2">
          No Post Content
        </div>
        <Comment />
      </main>
    </>
  );
}