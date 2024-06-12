import CreatePost from "../components/Post";
import Header from "../components/Header";
import { redirect } from "next/navigation";

export default async function WriteArticle() {
  return (
    <>
      <Header />
      <CreatePost />
    </>
  );
}