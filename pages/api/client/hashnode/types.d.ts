// credit to https://github.com/phuctm97/hashnode-sdk-js

export type Post = {
    title: string;
    brief: string;
    slug: string;
    dateAdded: string;
};

export type Publication = {
    id: string;
    name: string;
    domain: string;
    posts: Post[];
};

export type User = {
    id: string;
    username: string;
    name: string;
    tagline: string;
    publication: Publication;
    publicationDomain: string;
};

export type Article = {
    id: string;
    title: string;
    slug: string;
    url: string;
    canonicalURL?: string;
    contentMarkdown: string;
};

export type Data = {
    user: User;
};
