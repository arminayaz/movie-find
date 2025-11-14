import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
    {
      // Apply these rules to common code files
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], 
      
      rules: {
          // ⚠️ REQUIRED: Disable the base ESLint rule
          "no-unused-expressions": "off",

          // ✅ Enable and configure the @typescript-eslint extension rule
          "@typescript-eslint/no-unused-expressions": [
              "error",
              {
                  // Allowing short-circuit logic (e.g., condition && action())
                  "allowShortCircuit": true, 
                  
                  // Allowing ternary operators as statements (e.g., condition ? actionA() : actionB())
                  "allowTernary": true,     
                  
                  // Allowing tagged template literals (essential for styled-components, etc.)
                  "allowTaggedTemplates": true, 
                  
                  // Flag unused JSX element expressions
                  "enforceForJSX": true 
              }
          ]
      }
    }
];

export default eslintConfig;
