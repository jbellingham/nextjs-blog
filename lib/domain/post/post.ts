import { User } from "../../../pages/api/client/hashnode/types";
export interface IPost {
    url: string;
    title: string;
    date: string;
}

export function fromHashnodeUser(user: User): IPost[] {
    return user.publication.posts.map((post) => ({
        url: `https://${user.publicationDomain}/${post.slug}`,
        title: post.title,
        date: post.dateAdded,
    }));
}
