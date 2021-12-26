import React from "react";
import Post from "./[id].page";
import { render, screen } from "@testing-library/react";
import { format, parseISO } from "date-fns";
import { IPost } from "../../lib/domain/post/post";

describe("post page", () => {
    it("renders a post given some id in the route", () => {
        const content = "Some post content";
        const post: IPost = {
            id: "some-blog-post",
            title: "Some blog post title",
            date: "2020-08-25",
            contentHtml: `<p>${content}</p>`,
            description: "",
            keywords: "",
            isDraft: false,
        };
        render(<Post post={post}></Post>);

        expect(
            screen.getByRole("heading", { name: "Post title" })
        ).toHaveTextContent(post.title);

        const date = parseISO(post.date);

        expect(
            screen.getByText(format(date, "LLLL d, yyyy"))
        ).toBeInTheDocument();

        expect(screen.getByText(content)).toBeInTheDocument();
    });
});
