export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Formatting, no code change
        "refactor", // Code change that neither fixes bug nor adds feature
        "perf", // Performance improvement
        "test", // Adding/updating tests
        "build", // Build system or dependencies
        "ci", // CI configuration
        "chore", // Other changes
        "revert", // Revert a commit
      ],
    ],
    "scope-enum": [
      2,
      "always",
      [
        "core", // @bootcn-vue/core
        "buttons", // @bootcn-vue/buttons
        "forms", // @bootcn-vue/forms
        "field-password", // @bootcn-vue/field-password
        "tooltip", // @bootcn-vue/tooltip
        "cli", // @bootcn-vue/cli
        "playground", // apps/playground
        "docs", // Documentation
        "ci", // CI/CD
        "deps", // Dependencies
        "release", // Release related
        "build", // Build system
        "monorepo", // Monorepo infrastructure
      ],
    ],
    "scope-empty": [1, "never"],
    "subject-case": [2, "always", "lower-case"],
    "header-max-length": [2, "always", 100],
  },
};
