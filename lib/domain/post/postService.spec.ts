import { getSortedPosts } from "./postService";
describe("postService", () => {
    describe("getSortedPosts", () => {
        it("should return only published posts when include drafts is false", () => {
            const posts = getSortedPosts(false);
            expect(posts.some((p) => p.isDraft)).toBe(false);
            expect(posts.some((p) => !p.isDraft)).toBe(true);
        });

        it("should return published and draft posts when include drafts is true", () => {
            const posts = getSortedPosts(true);
            expect(posts.some((p) => p.isDraft)).toBe(true);
            expect(posts.some((p) => !p.isDraft)).toBe(true);
        });
    });
});
