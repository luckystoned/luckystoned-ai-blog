"use client";

// Importing React hooks and components
import { useRef, useState } from "react";
import { QuillEditor } from "./QuillEditor";
import { quillModules } from "./QuillEditor";
import { quillFormats } from "./QuillEditor";
import "react-quill/dist/quill.snow.css";

// Define the CreatePost component
export default function CreatePost() {
  // Initialize state variables for article outline, copilot text, and article title
  const [articleOutline, setArticleOutline] = useState("");
  const [copilotText, setCopilotText] = useState("");
  const [articleTitle, setArticleTitle] = useState("");

  // State variable to track if research task is running
  const [publishTaskRunning, setPublishTaskRunning] = useState(false);

  // Handle changes to the editor content
  const handleEditorChange = (newContent: any) => {
    setCopilotText(newContent);
  };

  return (
    <>
      {/* Main */}
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-white text-3xl my-7 font-semibold">
          Create a post
        </h1>

        {/* Form for creating a post */}
        <form action={""} className="flex flex-col gap-4 mb-2 mt-2">
          <div className="flex flex-col gap-4 sm:flex-row justify-between mb-2">
            {/* Input field for article title */}
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={articleTitle}
              onChange={(event) => setArticleTitle(event.target.value)}
              className="flex-1 block w-full rounded-lg border text-sm border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>

          {/* Hidden textarea for article content */}
          <textarea
            className="p-4 w-full aspect-square font-bold text-xl bg-slate-800 text-white rounded-lg resize-none hidden"
            id="content"
            name="content"
            value={copilotText}
            placeholder="Write your article content here"
            onChange={(event) => setCopilotText(event.target.value)}
          />

          {/* Quill editor component */}
          <QuillEditor
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="h-80 mb-12 text-white"
          />
          {/* Submit button for publishing the post */}
          <button
            type="submit"
            disabled={publishTaskRunning}
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
              publishTaskRunning
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
            onClick={async () => {
              try {
                setPublishTaskRunning(true);
              } finally {
                setPublishTaskRunning(false);
              }
            }}>
            {publishTaskRunning ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </>
  );
}