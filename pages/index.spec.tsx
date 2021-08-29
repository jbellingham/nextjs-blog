import { render, screen } from "@testing-library/react";
import Home from "./index.page";
describe("index page", () => {
    it("has a previous experience section", () => {
        render(<Home allPosts={[]} />);
        expect(
            screen.getByRole("heading", {
                name: "Section containing my previous experience",
            })
        ).toBeInTheDocument();
    });
});
