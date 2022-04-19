export const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "jessebellingham") {
            publicationDomain
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                    dateAdded
                }
            }
        }
    }
`;

export const GET_ALL_USER_ARTICLES = `
    query GetUserArticles {
        user(username: "jessebellingham") {
            publicationDomain
            publication {
                posts {
                    title
                    brief
                    slug
                    dateAdded
                }
            }
        }
    }
`;
