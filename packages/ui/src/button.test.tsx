import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

// Mock window.alert
Object.defineProperty(window, "alert", {
	value: vi.fn(),
	writable: true,
});

describe("Button", () => {
	it("renders children correctly", () => {
		render(<Button appName="test">Click me</Button>);
		expect(screen.getByText("Click me")).toBeInTheDocument();
	});

	it("applies className correctly", () => {
		render(
			<Button appName="test" className="custom-class">
				Click me
			</Button>,
		);
		const button = screen.getByText("Click me");
		expect(button).toHaveClass("custom-class");
	});

	it("shows alert with correct app name when clicked", () => {
		const mockAlert = vi.fn();
		window.alert = mockAlert;

		render(<Button appName="test-app">Click me</Button>);
		const button = screen.getByText("Click me");

		fireEvent.click(button);

		expect(mockAlert).toHaveBeenCalledWith("Hello from your test-app app!");
	});
});