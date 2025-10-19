const eslintConfig = [
  {
    rules: {
      // Basic rules for Next.js project
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
