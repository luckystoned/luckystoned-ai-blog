import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import CreatePost from "../components/Post";
import Header from "../components/Header";
import { redirect } from "next/navigation";
import "@copilotkit/react-ui/styles.css";

export default async function WriteArticle() {
  return (
    <>
      <Header />
      <CopilotKit url="/api/copilotkit">
        <CopilotPopup
          instructions="Help the user research a blog article topic."
          defaultOpen={true}
          labels={{
            title: "Blog Article Research AI Assistant",
            initial:
              "Hi! 👋 I can help you research any topic for a blog article.",
          }}
        />
        <CreatePost />
      </CopilotKit>
    </>
  );
}