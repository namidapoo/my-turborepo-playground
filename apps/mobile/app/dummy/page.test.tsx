import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from "./page";

test("renders dummy page with heading", () => {
	render(<Page />);

	// h1要素が正しく表示されることを確認
	const heading = screen.getByRole("heading", { level: 1 });
	expect(heading).toBeDefined();
	expect(heading.textContent).toBe("Page");
});

test("renders div container", () => {
	const { container } = render(<Page />);

	// divコンテナが存在することを確認
	const divElement = container.querySelector("div");
	expect(divElement).toBeDefined();
});
