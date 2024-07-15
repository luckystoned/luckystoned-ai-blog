"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMakeCopilotReadable, CopilotKit } from "@copilotkit/react-core";
import {
  CopilotTextarea,
  HTMLCopilotTextAreaElement,
} from "@copilotkit/react-textarea";
import Image from "next/image";
import { addComment } from "@/utils/supabase/AddComment";
import { createClient } from "@/utils/supabase/client";

// Define the Comment component
export default function Comment({ postId }: { postId: any }) {
  // State variables for comment, comments, and article content
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [articleContent, setArticleContent] = useState("");

  useEffect(() => {
    // Define an async function to fetch comments
    const fetchComments = async () => {
      // Create a Supabase client instance
      const supabase = createClient();
      // Fetch comments from the "comments" table
      const { data, error } = await supabase.from("comments").select("*");
      // If data is available, update the comments state
      if (data) {
        setComments(data);
      }
    };
  
    // Define an async function to fetch article content
    const fetchArticleContent = async () => {
      // Create a Supabase client instance
      const supabase = createClient();
      // Fetch article content from the "articles" table
      // Filter by the current postId
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", postId)
        .single();
      // If the fetched article ID matches the current postId
      if (data?.id == postId) {
        // Update the article content state
        setArticleContent(data.content);
      }
    };
  
    // Call the fetch functions
    fetchArticleContent();
    fetchComments();
  }, [postId]);

  useMakeCopilotReadable(
    "Blog article content: " + JSON.stringify(articleContent)
  );

  const copilotTextareaRef = useRef<HTMLCopilotTextAreaElement>(null);

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {/* Form for submitting a comment */}
      <CopilotKit url="/api/copilotkit">
        <form
          action={addComment}
          className="border border-teal-500 rounded-md p-3 mb-4">
          <textarea
            id="content"
            name="content"
            placeholder="Add a comment..."
            rows={3}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="hidden"
          />

          <CopilotTextarea
            className="p-4 w-full rounded-lg mb-2 border text-sm border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
            ref={copilotTextareaRef}
            placeholder="Start typing for content autosuggestion."
            onChange={(event) => setComment(event.target.value)}
            rows={5}
            autosuggestionsConfig={{
              textareaPurpose: articleContent,
              chatApiConfigs: {
                suggestionsApiConfig: {
                  forwardedParams: {
                    max_tokens: 5,
                    stop: ["\n", ".", ","],
                  },
                },
                insertionApiConfig: {},
              },
              debounceTime: 250,
            }}
          />

          <div className="flex justify-between items-center mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </CopilotKit>

      {/* Comments section */}
      <p className="text-white mb-2">Comments:</p>
      {comments?.map(
          (postComment: any) =>
            postComment.postId == postId && (
              <div
                key={postComment.id}
                className="flex p-4 border-b dark:border-gray-600 text-sm">
                <div className="flex-shrink-0 mr-3">
                  <Image
                    className="w-10 h-10 rounded-full bg-gray-200"
                    src={`https://source.unsplash.com/featured/?${encodeURIComponent(
                      "Silhouette"
                    )}`}
                    width={500}
                    height={500}
                    alt="Profile Picture"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-bold text-white mr-1 text-xs truncate">
                      Anonymous
                    </span>
                  </div>
                  <p className="text-gray-500 pb-2">{postComment.content}</p>
                </div>
              </div>
            )
        )}
      {/* Comment item (currently hardcoded) */}
      <div key={""} className="flex p-4 border-b dark:border-gray-600 text-sm">
        <div className="flex-shrink-0 mr-3">
          {/* Profile picture */}
          <Image
            className="w-10 h-10 rounded-full bg-gray-200"
            src="https://placehold.co/500x500/png"
            width={500}
            height={500}
            alt="Profile Picture"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            {/* Username (currently hardcoded as "Anonymous") */}
            <span className="font-bold text-white mr-1 text-xs truncate">
              Anonymous
            </span>
          </div>
          {/* Comment text (currently hardcoded as "No Comments") */}
          <p className="text-gray-500 pb-2">No Comments</p>
        </div>
      </div>
    </div>
  );
}