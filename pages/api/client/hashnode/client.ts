export async function gql<T>(query, variables = {}) {
    const data = await fetch("https://api.hashnode.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    return (await data.json()).data as Promise<T>;
}
