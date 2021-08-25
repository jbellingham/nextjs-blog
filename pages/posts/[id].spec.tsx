import React from "react";
import Post from "./[id]";
import { render, screen } from "@testing-library/react";
import { PostData } from "../../lib/posts";

describe("post page", () => {
    it("renders a post given some id in the route", () => {
        const postData: PostData = {
            id: "some-blog-post",
            title: "Some blog post title",
            date: "2020-08-25",
            contentHtml: "<p>Some post content</p>",
        };
        render(<Post postData={postData}></Post>);

        expect(
            screen.getByRole("heading", { name: "Post title" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "Post title" })
        ).toHaveTextContent(postData.title);
    });
});
