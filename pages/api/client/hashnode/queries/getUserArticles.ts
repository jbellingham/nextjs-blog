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
