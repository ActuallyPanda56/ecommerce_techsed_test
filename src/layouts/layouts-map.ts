import NothingLayout from "./nothing";
import PrincipalLayout from "./principal";

// Dynamic routes can also be added to the staticLayoutsMap as for example "/products/[slug]": PrincipalLayout. This will match the route /products/whatever
const staticLayoutsMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  "/": PrincipalLayout,
  "/products": PrincipalLayout,
  "/_error": NothingLayout,
};

interface LayoutRule {
  pattern: RegExp;
  layout: React.FC<{ children: JSX.Element }>;
}

// This is a broader approach to dynamic routes, where you can define a pattern to match the pathname
const dynamicLayoutsRules: LayoutRule[] = [
  { pattern: /^\/products\/(.+)$/, layout: PrincipalLayout }, // Matches /products/whatever and nested routes
];

export { staticLayoutsMap, dynamicLayoutsRules };
