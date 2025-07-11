export const sharedConfig = {
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		coverage: {
			reporter: ["json", "html"],
			reportsDirectory: "./coverage",
		},
	},
};